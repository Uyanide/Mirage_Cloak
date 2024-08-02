(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['/scripts/processors/CloakUniversal.js'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('/scripts/processors/CloakUniversal.js'));
    } else {
        root.CloakEncoder = factory(root.CloakUniversal);
    }
}(typeof self !== 'undefined' ? self : this, function (CloakUniversal) {
    class CloakEncoder extends CloakUniversal {
        constructor(defaultArguments, innerCanvasId, coverCanvasId, hiddenCanvasId, outputCanvasId, sizeLabelId) {
            super(defaultArguments);
            this._innerImage = null;
            this._coverImage = null;
            this._innerImageData = null;
            this._coverImageData = null;
            this._innerContrast = defaultArguments.contrast_inner;
            this._coverContrast = defaultArguments.contrast_cover;
            this._innerLuminance = defaultArguments.luminance_inner;
            this._coverLuminance = defaultArguments.luminance_cover;

            this._targetSize = defaultArguments.encode_size;
            this._mirageSize = defaultArguments.mirage_size;

            this._remained = defaultArguments.remained;
            this._version = defaultArguments.version;
            this._diff = defaultArguments.difference;
            this._padding = defaultArguments.padding;
            this._scale_i = defaultArguments.scale_inner;
            this._scale_c = defaultArguments.scale_cover;
            this._offset_i = defaultArguments.offset_inner;
            this._offset_c = defaultArguments.offset_cover;

            this._hiddenFile;
            this._fileExtension;
            this._byteArray = null;
            this._outputData = null;

            this._innerCanvas = document.getElementById(innerCanvasId);
            this._coverCanvas = document.getElementById(coverCanvasId);
            this._hiddenCanvas = document.getElementById(hiddenCanvasId);
            this._outputCanvas = document.getElementById(outputCanvasId);
            this._sizeLabel = document.getElementById(sizeLabelId);

            this._isAddMark = defaultArguments.add_mark;
            this._markImage = null;
            this._markRatio = defaultArguments.mark_ratio;
        }

        updateInnerImage(img) {
            this._innerImage = img;

            if (this._mirageSize !== 0) {
                if (this._innerImage.width > this._innerImage.height) {
                    this._width = this._mirageSize;
                    this._height = Math.ceil(this._innerImage.height * this._mirageSize / this._innerImage.width);
                } else {
                    this._height = this._mirageSize;
                    this._width = Math.ceil(this._innerImage.width * this._mirageSize / this._innerImage.height);
                }
            } else {
                this._width = this._innerImage.width;
                this._height = this._innerImage.height;
            }

            const currLength = this._width * this._height;
            const tarLength = this.calTargetLength();
            if (tarLength > currLength) {
                const ratio = Math.sqrt(tarLength / currLength);
                this._width = Math.ceil(img.width * ratio);
                this._height = Math.ceil(img.height * ratio);
            }
            this._innerCanvas.width = this._width;
            this._innerCanvas.height = this._height;
            const ctx = this._innerCanvas.getContext('2d');
            ctx.drawImage(img, 0, 0, this._width, this._height);
            this._innerImageData = ctx.getImageData(0, 0, this._width, this._height);
            this._sizeLabel.innerHTML = `输出图像预计尺寸: ${this._width}x${this._height}`;

            this.convertGray(this._innerImageData);
            this.adjustImageData(this._innerCanvas, this._innerImageData, this._innerContrast, this._innerLuminance);
            if (this._isAddMark) {
                this.addMark(this._innerCanvas, this._markImage);
            }
            if (this._coverImageData) {
                this.updateCoverImage(this._coverImage);
            }
        }

        updateCoverImage(img) {
            this._coverImage = img;
            if (this._innerImage) {
                const currRatio = img.width / img.height;
                const tarRatio = this._width / this._height;
                let startx, starty, newWidth, newHeight;
                if (currRatio < tarRatio) {
                    startx = 0;
                    starty = Math.ceil((this._height - this._width / currRatio) / 2);
                    newWidth = this._width;
                    newHeight = Math.ceil(this._width / currRatio);
                } else {
                    startx = Math.ceil((this._width - this._height * currRatio) / 2);
                    starty = 0;
                    newWidth = Math.ceil(this._height * currRatio);
                    newHeight = this._height;
                }
                this._coverCanvas.width = this._width;
                this._coverCanvas.height = this._height;
                const ctx = this._coverCanvas.getContext('2d');
                ctx.drawImage(img, startx, starty, newWidth, newHeight);
                this._coverImageData = ctx.getImageData(0, 0, this._width, this._height);
            } else {
                this._coverCanvas.width = img.width;
                this._coverCanvas.height = img.height;
                const ctx = this._coverCanvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                this._coverImageData = ctx.getImageData(0, 0, img.width, img.height);
            }
            this.convertGray(this._coverImageData);
            this.adjustImageData(this._coverCanvas, this._coverImageData, this._coverContrast, this._coverLuminance);
            if (this._isAddMark) {
                this.addMark(this._coverCanvas, this._markImage);
            }
        }

        updateHiddenFile(file) {
            this._hiddenFile = file;

            const fileName = file.name;
            const dotIndex = fileName.lastIndexOf('.');
            if (dotIndex !== -1 && dotIndex < fileName.length - 1) {
                this._fileExtension = fileName.substring(dotIndex + 1).toLowerCase();
                if (this._fileExtension.length > 10) {
                    alert('文件拓展名过长，已截断为: ' + this._fileExtension.substring(0, 10));
                    this._fileExtension = this._fileExtension.substring(0, 10);
                }
            } else {
                this._fileExtension = '';
            }

            if (file.type.startsWith('image/') && !file.type.startsWith('image/gif')) {
                const img = new Image();
                img.src = URL.createObjectURL(file);
                img.onload = () => {
                    this.clearCanvas(this._hiddenCanvas);
                    this._hiddenCanvas.width = img.width;
                    this._hiddenCanvas.height = img.height;
                    const ctx = this._hiddenCanvas.getContext('2d');
                    ctx.drawImage(img, 0, 0);
                    URL.revokeObjectURL(img.src);
                };
            } else if (file.type) {
                this.showTextOnCanvas(this._hiddenCanvas, '暂不支持预览此文件', '文件类型: ' + file.type);
            } else {
                this.showTextOnCanvas(this._hiddenCanvas, '暂不支持预览此文件');
            }

            const reader = new FileReader();
            reader.onload = (event) => {
                const arrayBuffer = event.target.result;
                this._byteArray = new Uint8Array(arrayBuffer);
                this._targetSize = this._byteArray.length;
                console.log('Target size:', this._targetSize);
                if (this._innerImage) {
                    this.updateInnerImage(this._innerImage);
                }
            }
            reader.readAsArrayBuffer(file);
        }

        process = () => {
            if (!this._innerImageData || !this._coverImageData || !this._byteArray) {
                throw new Error('Please select files first');
            }
            const pixelRange = this._width * this._height;
            this._outputData = new Uint8ClampedArray(pixelRange * 4);

            const innerImageDataAdjust = this._innerCanvas.getContext('2d').getImageData(0, 0, this._width, this._height);
            const coverImageDataAdjust = this._coverCanvas.getContext('2d').getImageData(0, 0, this._width, this._height);
            const innerData = innerImageDataAdjust.data;
            const coverData = coverImageDataAdjust.data;

            for (let i = 0; i < pixelRange; i++) {
                if (this.isInner(i)) {
                    const gray = this.scale(innerData[i * 4], this._scale_i, this._offset_i);
                    const { r, g, b } = this.getBits(i);
                    this._outputData[i * 4] = r ? 255 - this._diff : 255;
                    this._outputData[i * 4 + 1] = g ? 255 - this._diff : 255;
                    this._outputData[i * 4 + 2] = b ? 255 - this._diff : 255;
                    this._outputData[i * 4 + 3] = gray;
                } else {
                    const gray = this.scale(coverData[i * 4], this._scale_c, this._offset_c);
                    const { r, g, b } = this.getBits(i);
                    this._outputData[i * 4] = r ? this._diff : 0;
                    this._outputData[i * 4 + 1] = g ? this._diff : 0;
                    this._outputData[i * 4 + 2] = b ? this._diff : 0;
                    this._outputData[i * 4 + 3] = 255 - gray;
                }
            }
            this._outputCanvas.width = this._width;
            this._outputCanvas.height = this._height;
            const imgData = new ImageData(this._outputData, this._width, this._height);
            this._outputCanvas.getContext('2d').putImageData(imgData, 0, 0);
        }

        scale = (value, scale, offset) => {
            return Math.floor(value * scale + offset);
        }

        isInner = (pixelIndex) => {
            return (pixelIndex % this._width + Math.floor(pixelIndex / this._width)) % 2 === 0;
        }

        getBits = (pixelIndex) => {
            const pixelIndexMod3 = pixelIndex % 3;
            const byteIndex = Math.floor(pixelIndex / 3);

            if (byteIndex === 0) { // version
                return this.getBitsFromByte(this._version, pixelIndexMod3);
            } else if (byteIndex === 1) { // difference
                return this.getBitsFromByte(Math.floor(this._diff / 2), pixelIndexMod3);
            } else if (byteIndex <= 5) { // length
                return this.getBitsFromByte(
                    (this._targetSize >> ((byteIndex - 2) << 3)) & 0xff,
                    pixelIndexMod3);
            } else if (byteIndex < this._remained) { // file extension name
                return byteIndex - 6 < this._fileExtension.length ?
                    this.getBitsFromByte(this._fileExtension.charCodeAt(byteIndex - 6), pixelIndexMod3) :
                    this.getBitsFromByte(0, pixelIndexMod3);
            } else if (byteIndex < this._targetSize + this._remained) { // data
                return this.getBitsFromByte(this._byteArray[byteIndex - this._remained], pixelIndexMod3);
            } else { // random padding
                return this.getRandomBits();
            }
        }

        getBitsFromByte = (origByte, pixelIndex) => {
            const byte = origByte >> (pixelIndex * 3);
            const r = byte & 1;
            const g = (byte >> 1) & 1;
            if (pixelIndex != 2) {
                return {
                    r: r,
                    g: g,
                    b: (byte >> 2) & 1
                };
            } else {
                return {
                    r: r,
                    g: g,
                    b: this.calParityBit(origByte)
                };
            }
        }

        getRandomBits = () => {
            return {
                r: Math.random() > 0.5 ? 1 : 0,
                g: Math.random() > 0.5 ? 1 : 0,
                b: Math.random() > 0.5 ? 1 : 0
            };
        }

        calParityBit = (byte) => {
            let parity = 0;
            for (let i = 0; i < 8; i++) {
                parity ^= (byte >> i) & 1;
            }
            return parity;
        }

        calTargetLength = () => {
            return (this._targetSize + this._remained + this._padding) * 3;
        }

        convertGray = (imgData) => {
            const data = imgData.data;
            for (let i = 0; i < data.length; i += 4) {
                const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
                data[i] = gray;
                data[i + 1] = gray;
                data[i + 2] = gray;
            }
        }

        adjustInnerContrast = (contrast) => {
            this._innerContrast = contrast;
            if (this._innerImageData) {
                this.adjustImageData(this._innerCanvas, this._innerImageData, contrast, this._innerLuminance);
                if (this._isAddMark) {
                    this.addMark(this._innerCanvas, this._markImage);
                }
            }
        }

        adjustCoverContrast = (contrast) => {
            this._coverContrast = contrast;
            if (this._coverImageData) {
                this.adjustImageData(this._coverCanvas, this._coverImageData, contrast, this._coverLuminance);
                if (this._isAddMark) {
                    this.addMark(this._coverCanvas, this._markImage);
                }
            }
        }

        adjustInnerLuminance = (luminance) => {
            this._innerLuminance = luminance;
            if (this._innerImageData) {
                this.adjustImageData(this._innerCanvas, this._innerImageData, this._innerContrast, luminance);
                if (this._isAddMark) {
                    this.addMark(this._innerCanvas, this._markImage);
                }
            }
        }

        adjustCoverLuminance = (luminance) => {
            this._coverLuminance = luminance;
            if (this._coverImageData) {
                this.adjustImageData(this._coverCanvas, this._coverImageData, this._coverContrast, luminance);
                if (this._isAddMark) {
                    this.addMark(this._coverCanvas, this._markImage);
                }
            }
        }

        saveOutputImage = () => {
            if (!this._outputData) {
                throw new Error('Please process image first');
            }
            const timestamp = new Date().getTime();
            const link = document.createElement('a');
            link.href = this._outputCanvas.toDataURL('image/png');
            link.download = `encoded_${timestamp}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        updateMarkImage = (markImage) => {
            this._markImage = markImage;
        }

        setIsAddMark = (isAddMark) => {
            this._isAddMark = isAddMark;
            if (!this._markImage) {
                return;
            }
            if (isAddMark) {
                if (this._innerImageData) {
                    this.addMark(this._innerCanvas, this._markImage);
                }
                if (this._coverImageData) {
                    this.addMark(this._coverCanvas, this._markImage);
                }
            } else {
                if (this._innerImageData) {
                    this.adjustImageData(this._innerCanvas, this._innerImageData, this._innerContrast, this._innerLuminance);
                }
                if (this._coverImageData) {
                    this.adjustImageData(this._coverCanvas, this._coverImageData, this._coverContrast, this._coverLuminance);
                }
            }
        }

        addMark(canvas, markImage) {
            if (!markImage) {
                return;
            }
            let width = canvas.width * this._markRatio;
            let height = canvas.height * this._markRatio;
            const currRatio = width / height;
            const markRatio = markImage.width / markImage.height;
            if (currRatio > markRatio) {
                width = height * markRatio;
            } else {
                height = width / markRatio;
            }
            const ctx = canvas.getContext('2d');
            ctx.drawImage(markImage, 0, 0, width, height);
        }

        setMirageSize = (size) => {
            this.mirage_size = size;
            if (this._innerImage) {
                this.updateInnerImage(this._innerImage);
            }
        }
    }

    return CloakEncoder;
}));

errorHandling.scriptsLoaded.CloakEncoder = true;
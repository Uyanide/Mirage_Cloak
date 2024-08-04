(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([
            '/scripts/processors/CloakUniversal.js',
            '/scripts/libs/pngLib.js',
            '/scripts/libs/jpegEncoder.js'
        ], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require(
            '/scripts/processors/CloakUniversal.js',
            '/scripts/libs/pngLib.js',
            '/scripts/libs/jpegEncoder.js'
        ));
    } else {
        root.CloakEncoder = factory(root.CloakUniversal, root.pngLib, root.JPEGEncoder);
    }
}(typeof self !== 'undefined' ? self : this, function (CloakUniversal, pngLib, JPEGEncoder) {
    class CloakEncoder extends CloakUniversal {
        constructor(defaultArguments, innerCanvasId, coverCanvasId, hiddenCanvasId, outputCanvasId, sizeLabelId, hiddenSizeLabelId) {
            super(defaultArguments);
            this._innerImage = null;
            this._coverImage = null;
            this._innerImageData = null;
            this._coverImageData = null;
            this._innerContrast = defaultArguments.contrast_inner;
            this._coverContrast = defaultArguments.contrast_cover;
            this._innerLuminance = defaultArguments.luminance_inner;
            this._coverLuminance = defaultArguments.luminance_cover;

            this._mirageSize = defaultArguments.mirage_size;

            this._isCompress = defaultArguments.encode_compress;
            this._compressQuality = defaultArguments.encode_compress_quality;

            this._version = defaultArguments.version;
            switch (this._version) {
                case 1:
                    this._diff = defaultArguments.version_1.difference;
                    break;
                case 2:
                    this._diff = defaultArguments.version_2.difference;
                    break;
                default:
                    throw new Error('默认参数错误: 未知的编码方式');
            }

            this._hiddenFile = null;
            this._fileExtension = '';
            this._fileExtensionCompressed = '';
            this._byteArray = null;
            this._byteArrayCompressed = null;
            this._outputData = null;

            this._innerCanvas = document.getElementById(innerCanvasId);
            this._coverCanvas = document.getElementById(coverCanvasId);
            this._hiddenCanvas = document.getElementById(hiddenCanvasId);
            this._outputCanvas = document.getElementById(outputCanvasId);
            this._sizeLabel = document.getElementById(sizeLabelId);
            this._hiddenSizeLabel = document.getElementById(hiddenSizeLabelId);

            this._isAddMark = defaultArguments.add_mark;
            this._markImage = null;
            this._markRatio = defaultArguments.mark_ratio;

            this._encoders = [
                new Encoder_v1(defaultArguments),
                new Encoder_v2(defaultArguments)
            ];
        }

        updateInnerImage = async (img) => {
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

            if (this._byteArray) {
                const length = await this._adjustSize();
                console.log('Size to be encoded: ' + length);
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

        _adjustSize = async () => {
            return new Promise(async (resolve, reject) => {
                let currLength = this._width * this._height;
                let tarLength = this._encoders[this._version - 1].getRequiredLength(this._byteArray);

                if (tarLength > currLength) { // if the hidden file is too large
                    let ratio = tarLength / currLength;
                    if (this._hiddenFile.type.startsWith('image') && !this._hiddenFile.type.startsWith('image/gif')) { // if the hidden file is a static image
                        await this._drawHiddenImageOnCanvas();
                        if (this._isCompress) {
                            let hiddenImageData = this._hiddenCanvas.getContext('2d').getImageData(0, 0, this._hiddenCanvas.width, this._hiddenCanvas.height);
                            if (hiddenImageData) { // if get image data successfully, try to compress the hidden image by converting it to jpeg
                                const jpegEncoder = new JPEGEncoder(this._compressQuality);
                                let jpegData = jpegEncoder.encode(hiddenImageData);
                                tarLength = this._encoders[this._version - 1].getRequiredLength(jpegData);
                                ratio = tarLength / currLength;
                                if (ratio > 1) { // if the hidden image is still too large after compression, resize it
                                    ratio = Math.sqrt(ratio);
                                    this._hiddenCanvas.width = Math.ceil(this._hiddenCanvas.width * ratio);
                                    this._hiddenCanvas.height = Math.ceil(this._hiddenCanvas.height * ratio);

                                    await this._drawHiddenImageOnCanvas(1 / ratio);
                                    const ctx = this._hiddenCanvas.getContext('2d');
                                    hiddenImageData = ctx.getImageData(0, 0, this._hiddenCanvas.width, this._hiddenCanvas.height);
                                    jpegData = jpegEncoder.encode(hiddenImageData);

                                    tarLength = this._encoders[this._version - 1].getRequiredLength(jpegData); // update target length
                                    ratio = tarLength / currLength; // update ratio
                                    if (ratio > 1) { // if the hidden image is still too large after resizing, scale the size of the inner image
                                        this._scaleSize(ratio);
                                    }
                                }
                                this._hiddenSizeLabel.innerHTML = `隐藏图像尺寸: ${this._hiddenCanvas.width}x${this._hiddenCanvas.height}`;
                                this._byteArrayCompressed = jpegData;
                                this._fileExtensionCompressed = 'jpg'; // change file extension to jpg
                                resolve(this._byteArrayCompressed.length);
                                return;
                            }
                        }
                        this._hiddenSizeLabel.innerHTML = `隐藏图像尺寸: ${this._hiddenCanvas.width}x${this._hiddenCanvas.height}`;
                    } else { // if the hidden file is not an image, not compressible
                        this._hiddenSizeLabel.innerHTML = '';
                        this._byteArrayCompressed = null;
                        this._fileExtensionCompressed = '';
                    }
                    this._scaleSize(ratio);
                    resolve(this._byteArray.length);
                    return;
                } else {
                    this._byteArrayCompressed = null;
                    this._fileExtensionCompressed = '';
                    resolve(this._byteArray.length);
                    return;
                }
            });
        }

        _scaleSize = (ratio) => {
            ratio = Math.sqrt(ratio);
            this._width = Math.ceil(this._width * ratio);
            this._height = Math.ceil(this._height * ratio);
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

        updateHiddenFile = async (file) => {
            this._hiddenFile = file;
            this._byteArrayCompressed = null;

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
                await this._drawHiddenImageOnCanvas();
                this._hiddenSizeLabel.innerHTML = `隐藏图像尺寸: ${this._hiddenCanvas.width}x${this._hiddenCanvas.height}`;
                this._getHiddenByteArray();
            } else {
                this._hiddenSizeLabel.innerHTML = '';
                this.showTextOnCanvas(this._hiddenCanvas, '暂不支持预览此文件', file.type ? '文件类型: ' + file.type : '');
                this._getHiddenByteArray();
            }
        }

        _getHiddenByteArray = () => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const arrayBuffer = event.target.result;
                this._byteArray = new Uint8Array(arrayBuffer);
                if (this._innerImage) {
                    this.updateInnerImage(this._innerImage);
                }
            }
            reader.readAsArrayBuffer(this._hiddenFile);
        }

        _drawHiddenImageOnCanvas = async (scaleRatio = 1) => {
            const img = new Image();
            await new Promise((resolve, reject) => {
                img.onload = () => {
                    this.clearCanvas(this._hiddenCanvas);
                    this._hiddenCanvas.width = img.width * scaleRatio;
                    this._hiddenCanvas.height = img.height * scaleRatio;
                    const ctx = this._hiddenCanvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, this._hiddenCanvas.width, this._hiddenCanvas.height);
                    URL.revokeObjectURL(img.src);
                    resolve();
                };
                img.onerror = reject;
                img.src = URL.createObjectURL(this._hiddenFile);
            });
        }

        process = () => {
            if (!this._innerImageData || !this._coverImageData || !this._byteArray) {
                throw new Error('清先选择图像和文件');
            }

            this.showTextOnCanvas(this._outputCanvas, '正在处理，请稍候...');

            const innerImageDataAdjust = this._innerCanvas.getContext('2d').getImageData(0, 0, this._width, this._height);
            const coverImageDataAdjust = this._coverCanvas.getContext('2d').getImageData(0, 0, this._width, this._height);

            console.log('Encoding...');
            console.log('    Version: ' + this._version);
            console.log('    Output size: ' + this._width + 'x' + this._height);
            console.log('    Size to be encoded: ' + ((this._isCompress && this._byteArrayCompressed) ? this._byteArrayCompressed.length : this._byteArray.length));
            console.log('    File extension: ' + ((this._isCompress && this._fileExtensionCompressed) ? this._fileExtensionCompressed : this._fileExtension));
            console.log('    Difference: ' + this._diff);

            this._outputData = this._encoders[this._version - 1].encode(
                innerImageDataAdjust,
                coverImageDataAdjust,
                (this._isCompress && this._byteArrayCompressed) ? this._byteArrayCompressed : this._byteArray,
                (this._isCompress && this._fileExtensionCompressed) ? this._fileExtensionCompressed : this._fileExtension,
                this._diff
            );

            this._outputCanvas.width = this._width;
            this._outputCanvas.height = this._height;
            const imgData = new ImageData(this._outputData, this._width, this._height);
            this._outputCanvas.getContext('2d').putImageData(imgData, 0, 0);
            this._isOutputCanvasCleared = false;

            console.log('Encoding finished');
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

            const pngBlob = pngLib.getBlobFromImageData(
                new ImageData(this._outputData, this._width, this._height),
            );
            link.href = URL.createObjectURL(pngBlob);
            link.download = `encoded_${timestamp}.png`;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            URL.revokeObjectURL(link.href);
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
            this._mirageSize = size;
            if (this._innerImage) {
                this.updateInnerImage(this._innerImage); // update inner image to adjust size
            }
        }

        setDiff = (diff) => {
            this._diff = diff;
        }

        setVersion = (version) => {
            this._version = version;
            if (this._byteArray && this._innerImage) {
                this.updateInnerImage(this._innerImage); // update inner image to adjust size
            }
        }

        setIsCompress = async (isCompress) => {
            this._isCompress = isCompress;
            if (this._byteArray && this._innerImage) {
                this.updateInnerImage(this._innerImage); // update inner image to adjust size
            }
        }

        clearOutputCanvas = () => {
            if (!this._isOutputCanvasCleared) {
                this.clearCanvas(this._outputCanvas);
                this._isOutputCanvasCleared = true;
                this._outputData = null;
            }
        }
    }

    class Encoder_v1 {
        constructor(defaultArguments) {
            this._version = 1;
            this._globalDefaultDiff = defaultArguments.default_difference;
            this._defaultDiff = defaultArguments.version_1.default_difference;

            this._remained = defaultArguments.version_1.remained;
            this._padding = defaultArguments.version_1.padding;

            this._scale_i = defaultArguments.version_1.scale_inner;
            this._offset_i = defaultArguments.version_1.offset_inner;
            this._scale_c = defaultArguments.version_1.scale_cover;
            this._offset_c = defaultArguments.version_1.offset_cover;
        }

        encode(innerImageData, coverImageData, hiddenFile, fileExtensionName, customDiff, writeVersion = 1) {
            this._innerData = innerImageData.data;
            this._coverData = coverImageData.data;
            this._width = innerImageData.width;
            this._height = innerImageData.height;
            this._pixelRange = writeVersion === 1 ? this._innerData.length >> 2 : 3;
            this._version = writeVersion;
            let outputData = new Uint8ClampedArray(this._innerData.length);
            this._byteArray = hiddenFile;
            this._targetSize = this._byteArray.length;
            this._fileExtension = fileExtensionName;
            this._diff = customDiff || this._defaultDiff;

            for (let i = 0; i < this._pixelRange; i++) {
                const diff = (i < 3) ? this._globalDefaultDiff : // encoding method for "version" are globally fixed
                    ((i < 6) ? this._defaultDiff : // encoding method for "threshold" are for each version fixed
                        this._diff); // otherwise use customized differece to encode
                if (this._isInner(i)) {
                    const gray = this._scale(this._innerData[i * 4], this._scale_i, this._offset_i);
                    const { r, g, b } = this._getBits(i);
                    outputData[i * 4] = r ? 255 - diff : 255;
                    outputData[i * 4 + 1] = g ? 255 - diff : 255;
                    outputData[i * 4 + 2] = b ? 255 - diff : 255;
                    outputData[i * 4 + 3] = gray;
                } else {
                    const gray = this._scale(this._coverData[i * 4], this._scale_c, this._offset_c);
                    const { r, g, b } = this._getBits(i);
                    outputData[i * 4] = r ? diff : 0;
                    outputData[i * 4 + 1] = g ? diff : 0;
                    outputData[i * 4 + 2] = b ? diff : 0;
                    outputData[i * 4 + 3] = 255 - gray;
                }
            }

            return outputData;
        }

        getRequiredLength(hiddenFile) {
            return (hiddenFile.length + this._remained + this._padding) * 3;
        }

        _getBits = (pixelIndex) => {
            const pixelIndexMod3 = pixelIndex % 3;
            const byteIndex = Math.floor(pixelIndex / 3);

            if (byteIndex === 0) { // version
                return this._getBitsFromByte(this._version, pixelIndexMod3);
            } else if (byteIndex === 1) { // threshold
                return this._getBitsFromByte(Math.floor(this._diff / 2), pixelIndexMod3);
            } else if (byteIndex <= 5) { // length
                return this._getBitsFromByte(
                    (this._targetSize >> ((byteIndex - 2) << 3)) & 0xff,
                    pixelIndexMod3);
            } else if (byteIndex < this._remained) { // file extension name
                return byteIndex - 6 < this._fileExtension.length ?
                    this._getBitsFromByte(this._fileExtension.charCodeAt(byteIndex - 6), pixelIndexMod3) :
                    this._getBitsFromByte(0, pixelIndexMod3);
            } else if (byteIndex < this._targetSize + this._remained) { // data
                return this._getBitsFromByte(this._byteArray[byteIndex - this._remained], pixelIndexMod3);
            } else { // random padding
                return this._getRandomBits();
            }
        }

        _scale = (value, scale, offset) => {
            return Math.floor(value * scale + offset);
        }

        _isInner = (pixelIndex) => {
            return (pixelIndex % this._width + Math.floor(pixelIndex / this._width)) % 2 === 0;
        }

        _getBitsFromByte = (origByte, pixelIndex) => {
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
                    b: this._calParityBit(origByte)
                };
            }
        }

        _getRandomBits = () => {
            return {
                r: Math.random() > 0.5 ? 1 : 0,
                g: Math.random() > 0.5 ? 1 : 0,
                b: Math.random() > 0.5 ? 1 : 0
            };
        }

        _calParityBit = (byte) => {
            let parity = 0;
            for (let i = 0; i < 8; i++) {
                parity ^= (byte >> i) & 1;
            }
            return parity;
        }
    }

    class Encoder_v2 extends Encoder_v1 {
        constructor(defaultArguments) {
            super(defaultArguments);
            this._version = 2;
            this._defaultDiff = defaultArguments.version_2.default_difference; // for diff encoding

            this._remained = defaultArguments.version_2.remained;
            this._padding = defaultArguments.version_2.padding;

            this._scale_i = defaultArguments.version_2.scale_inner;
            this._offset_i = defaultArguments.version_2.offset_inner;
            this._scale_c = defaultArguments.version_2.scale_cover;
            this._offset_c = defaultArguments.version_2.offset_cover;
        }

        getRequiredLength(hiddenFile) {
            return (hiddenFile.length >> 1 + this._remained + this._padding) * 3;
        }

        encode(innerImageData, coverImageData, hiddenFile, fileExtensionName, customDiff) {
            let outputData = super.encode(innerImageData, coverImageData, hiddenFile, fileExtensionName, undefined, this._version); // use version 1 to encode version infomation
            this._diff = customDiff;
            this._pixelRange = innerImageData.data.length >> 2;
            if (this._targetSize & 1) {
                let newByteArray = new Uint8Array(this._targetSize + 1);
                newByteArray.set(this._byteArray);
                newByteArray[this._targetSize] = 0;
                this._byteArray = newByteArray;
            }
            for (let i = 3; i < this._pixelRange; i++) {
                const diff = Math.floor(((i < 6) ? this._defaultDiff : this._diff) / 3); // use defaultDiff to encode threshold
                if (this._isInner(i)) {
                    const gray = this._scale(this._innerData[i * 4], this._scale_i, this._offset_i);
                    const { r, g, b } = this._getBitsPair(i);
                    outputData[i * 4] = 255 - diff * r;
                    outputData[i * 4 + 1] = 255 - diff * g;
                    outputData[i * 4 + 2] = 255 - diff * b;
                    outputData[i * 4 + 3] = gray;
                } else {
                    const gray = this._scale(this._coverData[i * 4], this._scale_c, this._offset_c);
                    const { r, g, b } = this._getBitsPair(i);
                    outputData[i * 4] = diff * r;
                    outputData[i * 4 + 1] = diff * g;
                    outputData[i * 4 + 2] = diff * b;
                    outputData[i * 4 + 3] = 255 - gray;
                }
            }
            return outputData;
        }

        _getBitsPair = (pixelIndex) => {
            const pixelIndexMod3 = pixelIndex % 3;
            const bytePairIndex = Math.floor(pixelIndex / 3);

            if (bytePairIndex < 2) { // threshold
                return this._getBitsFromBytePair(Math.floor(this._diff / 6), pixelIndexMod3);
            } else if (bytePairIndex < 4) { // length
                return this._getBitsFromBytePair(
                    (this._targetSize >> ((bytePairIndex - 2) << 4)) & 0xffff,
                    pixelIndexMod3);
            } else if (bytePairIndex < this._remained) {
                return bytePairIndex - 4 < this._fileExtension.length ?
                    this._getBitsFromBytePair(this._fileExtension.charCodeAt(bytePairIndex - 4), pixelIndexMod3) :
                    this._getBitsFromByte(0, pixelIndexMod3);
            } else if (bytePairIndex < Math.ceil(this._targetSize / 2) + this._remained) { // data
                return this._getBitsFromBytePair(
                    this._byteArray[(bytePairIndex - this._remained) << 1] |
                    (this._byteArray[((bytePairIndex - this._remained) << 1) + 1] << 8),
                    pixelIndexMod3);
            } else { // random padding
                return this._getRandomBits();
            }
        }

        _getBitsFromBytePair = (origBytePair, pixelIndex) => {
            const byte = origBytePair >> (pixelIndex * 6);
            const r = byte & 3;
            const g = (byte >> 2) & 3;
            if (pixelIndex != 2) {
                return {
                    r: r,
                    g: g,
                    b: (byte >> 4) & 3
                };
            } else {
                return {
                    r: r,
                    g: g,
                    b: this._calParityBitPair(origBytePair)
                };
            }
        }

        _calParityBitPair = (bytePair) => {
            let parity = 0;
            for (let i = 0; i < 8; i++) {
                parity ^= (bytePair >> i) & 1;
            }
            for (let i = 8; i < 16; i++) {
                parity ^= ((bytePair >> i) & 1) << 1;
            }
            return parity;
        }

        _getRandomBits = () => {
            return {
                r: Math.floor(Math.random() * 4),
                g: Math.floor(Math.random() * 4),
                b: Math.floor(Math.random() * 4)
            };
        }
    }

    return CloakEncoder;
}));

errorHandling.scriptsLoaded.CloakEncoder = true;
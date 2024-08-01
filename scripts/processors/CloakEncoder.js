import CloakUniversal from "./CloakUniversal.js";

class CloakEncoder extends CloakUniversal {
    constructor(defaultArguments, innerCanvasId, coverCanvasId, hiddenCanvasId, outputCanvasId, sizeLabelId) {
        super(defaultArguments);
        this.innerImage = null;
        this.coverImage = null;
        this.innerImageData = null;
        this.coverImageData = null;
        this.innerContrast = defaultArguments.contrast_inner;
        this.coverContrast = defaultArguments.contrast_cover;
        this.innerImageDataContrast = null;
        this.coverImageDataContrast = null;

        this.targetSize = defaultArguments.encode_size;

        this.remained = this._remained;
        this.version = this._version;
        this.diff = this._diff;
        this.padding = this._padding;
        this.scale_i = this._scale_i;
        this.scale_c = this._scale_c;
        this.offset_i = this._offset_i;
        this.offset_c = this._offset_c;

        this.hiddenFile;
        this.fileExtension;
        this.byteArray = null;
        this.outputData = null;

        this.innerCanvas = document.getElementById(innerCanvasId);
        this.coverCanvas = document.getElementById(coverCanvasId);
        this.hiddenCanvas = document.getElementById(hiddenCanvasId);
        this.outputCanvas = document.getElementById(outputCanvasId);
        this.sizeLabel = document.getElementById(sizeLabelId);
    }

    updateInnerImage(img) {
        this.innerImage = img;

        const currLength = this.innerImage.src.length;
        const tarLength = this.calTargetLength();
        if (tarLength > currLength) {
            const ratio = Math.sqrt(tarLength / currLength);
            this.width = Math.floor(img.width * ratio);
            this.height = Math.floor(img.height * ratio);
            this.innerCanvas.width = this.width;
            this.innerCanvas.height = this.height;
            this.innerCanvas.getContext('2d').drawImage(img, 0, 0, this.width, this.height);
        } else {
            this.innerCanvas.width = img.width;
            this.innerCanvas.height = img.height;
            this.innerCanvas.getContext('2d').drawImage(img, 0, 0);
            this.width = img.width;
            this.height = img.height;
        }
        this.innerImageData = this.innerCanvas.getContext('2d').getImageData(0, 0, this.width, this.height);
        this.sizeLabel.innerHTML = `输出图像预计尺寸: ${this.width}x${this.height}`;

        this.convertGray(this.innerImageData);
        if (this.innerContrast !== 50) {
            this.innerImageDataContrast = this.cloneImageData(this.innerImageData);
            this.adjustContrastImgData(this.innerImageDataContrast, this.innerContrast);
            this.innerCanvas.getContext('2d').putImageData(this.innerImageDataContrast, 0, 0);
        } else {
            this.innerCanvas.getContext('2d').putImageData(this.innerImageData, 0, 0);
        }

        if (this.coverImageData) {
            this.updateCoverImage(this.coverImage);
        }
    }

    updateCoverImage(img) {
        this.coverImage = img;
        if (this.innerImage) {
            const currRatio = img.width / img.height;
            const tarRatio = this.width / this.height;
            let startx, starty, newWidth, newHeight;
            if (currRatio < tarRatio) {
                startx = 0;
                starty = Math.floor((this.height - this.width / currRatio) / 2);
                newWidth = this.width;
                newHeight = Math.floor(this.width / currRatio);
            } else {
                startx = Math.floor((this.width - this.height * currRatio) / 2);
                starty = 0;
                newWidth = Math.floor(this.height * currRatio);
                newHeight = this.height;
            }
            this.coverCanvas.width = this.width;
            this.coverCanvas.height = this.height;
            const ctx = this.coverCanvas.getContext('2d');
            ctx.drawImage(img, startx, starty, newWidth, newHeight);
            this.coverImageData = ctx.getImageData(0, 0, this.width, this.height);
        } else {
            this.coverCanvas.width = img.width;
            this.coverCanvas.height = img.height;
            const ctx = this.coverCanvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            this.coverImageData = ctx.getImageData(0, 0, img.width, img.height);
        }
        this.convertGray(this.coverImageData);
        if (this.coverContrast !== 50) {
            this.coverImageDataContrast = this.cloneImageData(this.coverImageData);
            this.adjustContrastImgData(this.coverImageDataContrast, this.coverContrast);
            this.coverCanvas.getContext('2d').putImageData(this.coverImageDataContrast, 0, 0);
        } else {
            this.coverCanvas.getContext('2d').putImageData(this.coverImageData, 0, 0);
        }
    }

    updateHiddenFile(file) {
        this.hiddenFile = file;

        const fileName = file.name;
        const dotIndex = fileName.lastIndexOf('.');
        if (dotIndex !== -1 && dotIndex < fileName.length - 1) {
            this.fileExtension = fileName.substring(dotIndex + 1).toLowerCase();
            if (this.fileExtension.length > 10) {
                alert('文件拓展名过长，已截断为: ' + this.fileExtension.substring(0, 10));
                this.fileExtension = this.fileExtension.substring(0, 10);
            }
        } else {
            this.fileExtension = '';
        }

        if (file.type.startsWith('image/') && !file.type.startsWith('image/gif')) {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                this.hiddenCanvas.width = img.width;
                this.hiddenCanvas.height = img.height;
                const ctx = this.hiddenCanvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
            };
        } else {
            this.showTextOnCanvas(this.hiddenCanvas, '暂不支持预览此文件', '文件拓展名: ' + this.fileExtension);
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const arrayBuffer = event.target.result;
            this.byteArray = new Uint8Array(arrayBuffer);
            this.targetSize = this.byteArray.length;
            if (this.innerImage) {
                this.updateInnerImage(this.innerImage);
            }
        }
        reader.readAsArrayBuffer(file);
    }

    process = () => {
        if (!this.innerImageData || !this.coverImageData || !this.byteArray) {
            throw new Error('Please select files first');
        }
        const pixelRange = this.width * this.height;
        this.outputData = new Uint8ClampedArray(pixelRange * 4);

        const innerData = this.innerContrast === 50 ? this.innerImageData.data : this.innerImageDataContrast.data;
        const coverData = this.coverContrast === 50 ? this.coverImageData.data : this.coverImageDataContrast.data;

        for (let i = 0; i < pixelRange; i++) {
            if (this.isInner(i)) {
                const gray = this.scale(innerData[i * 4], this.scale_i, this.offset_i);
                const { r, g, b } = this.getBits(i);
                this.outputData[i * 4] = r ? 255 - this.diff : 255;
                this.outputData[i * 4 + 1] = g ? 255 - this.diff : 255;
                this.outputData[i * 4 + 2] = b ? 255 - this.diff : 255;
                this.outputData[i * 4 + 3] = gray;
            } else {
                const gray = this.scale(coverData[i * 4], this.scale_c, this.offset_c);
                const { r, g, b } = this.getBits(i);
                this.outputData[i * 4] = r ? this.diff : 0;
                this.outputData[i * 4 + 1] = g ? this.diff : 0;
                this.outputData[i * 4 + 2] = b ? this.diff : 0;
                this.outputData[i * 4 + 3] = 255 - gray;
            }
        }
        this.outputCanvas.width = this.width;
        this.outputCanvas.height = this.height;
        const imgData = new ImageData(this.outputData, this.width, this.height);
        console.log(imgData);
        this.outputCanvas.getContext('2d').putImageData(imgData, 0, 0);
    }

    scale = (value, scale, offset) => {
        return Math.floor(value * scale + offset);
    }

    isInner = (pixelIndex) => {
        return (pixelIndex % this.width + Math.floor(pixelIndex / this.width)) % 2 === 0;
    }

    getBits = (pixelIndex) => {
        const pixelIndexMod3 = pixelIndex % 3;
        const byteIndex = Math.floor(pixelIndex / 3);

        if (byteIndex === 0) { // version
            return this.getBitsFromByte(this.version, pixelIndexMod3);
        } else if (byteIndex === 1) { // difference
            return this.getBitsFromByte(Math.floor(this.diff / 2), pixelIndexMod3);
        } else if (byteIndex <= 5) { // length
            return this.getBitsFromByte(
                (this.targetSize >> ((byteIndex - 2) << 3)) & 0xff,
                pixelIndexMod3);
        } else if (byteIndex < this.remained) { // file extension name
            return byteIndex - 6 < this.fileExtension.length ?
                this.getBitsFromByte(this.fileExtension.charCodeAt(byteIndex - 6), pixelIndexMod3) :
                this.getBitsFromByte(0, pixelIndexMod3);
        } else if (byteIndex < this.targetSize + this.remained) { // data
            return this.getBitsFromByte(this.byteArray[byteIndex - this.remained], pixelIndexMod3);
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
        return (this.targetSize + this.remained + this.padding) * 3;
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
        this.innerContrast = contrast;
        if (contrast !== 50 && this.innerImageData) {
            this.innerImageDataContrast = this.cloneImageData(this.innerImageData);
            this.adjustContrastImgData(this.innerImageDataContrast, contrast);
            this.innerCanvas.getContext('2d').putImageData(this.innerImageDataContrast, 0, 0);
        }
    }

    adjustCoverContrast = (contrast) => {
        this.coverContrast = contrast;
        if (contrast !== 50 && this.coverImageData) {
            this.coverImageDataContrast = this.cloneImageData(this.coverImageData);
            this.adjustContrastImgData(this.coverImageDataContrast, contrast);
            this.coverCanvas.getContext('2d').putImageData(this.coverImageDataContrast, 0, 0);
        }
    }

    saveOutputImage = () => {
        if (!this.outputData) {
            throw new Error('Please process image first');
        }
        const timestamp = new Date().getTime();
        const link = document.createElement('a');
        link.href = this.outputCanvas.toDataURL('image/png');
        link.download = `encoded_${timestamp}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

export default CloakEncoder;

errorHandling.scriptsLoaded.CloakEncoder = true;
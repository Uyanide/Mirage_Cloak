(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['/scripts/processors/CloakUniversal.js'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('/scripts/processors/CloakUniversal.js'));
    } else {
        root.CloakDecoder = factory(root.CloakUniversal);
    }
}(typeof self !== 'undefined' ? self : this, function (CloakUniversal) {
    class CloakDecoder extends CloakUniversal {
        constructor(defaultArguments, inputCanvasId, outputCanvasId) {
            super(defaultArguments);
            this._srcImage = null;
            this._srcImageData = null;
            this._inputCanvas = document.getElementById(inputCanvasId);
            this._outputCanvas = document.getElementById(outputCanvasId);

            this._version = defaultArguments.version;

            this._decoder_v1 = new decoder_v1(defaultArguments);
        }

        updateImage = (img) => {
            if (this._dataUrl) {
                URL.revokeObjectURL(this._dataUrl);
            }
            this._srcImage = img;
            this._inputCanvas.width = img.width;
            this._inputCanvas.height = img.height;
            this._inputCanvas.getContext('2d').drawImage(img, 0, 0);
            this._srcImageData = this._inputCanvas.getContext('2d').getImageData(0, 0, img.width, img.height);

            this.process();
        }

        process = () => {
            if (!this._srcImageData) {
                throw new Error('请先加载图像');
            }
            switch (this._decoder_v1.getVersion(this._srcImageData)) {
                case 1:
                    const { fileExtension, byteArray } = this._decoder_v1.decode(this._srcImageData);
                    this._fileExtension = fileExtension;
                    this._byteArray = byteArray;
                    break;
                default:
                    throw new Error('未知编码方式');
            }

            this._fileType = this.classifyFileType(this._fileExtension);
            const blob = new Blob([this._byteArray], { type: this._fileType });
            this._dataUrl = URL.createObjectURL(blob);
            this.showResult(this._outputCanvas, this._dataUrl, this._fileExtension);
        }

        saveResult = () => {
            if (!this._dataUrl) {
                throw new Error('没有文件可供保存');
            }
            this.saveResultFromUrl(this._dataUrl, this._fileExtension);
        }
    }

    class decoder_v1 {
        constructor(defaultArguments) {
            this._defaultThreshold = defaultArguments.default_threshold;
            this._remained = defaultArguments.version_1.remained;
        }

        getVersion = (srcImageData) => {
            this._pos = 0;
            this._threshold = this._defaultThreshold;
            this._dataRange = srcImageData.data.length;
            return this._getByte(srcImageData.data);
        }

        decode = (srcImageData) => {
            this._pos = 12;
            this._threshold = this._defaultThreshold;
            this._dataRange = srcImageData.data.length;
            const data = srcImageData.data;

            this._threshold = this._getByte(data);
            let hiddenLength = 0;
            for (let i = 0; i < 32; i += 8) {
                hiddenLength |= this._getByte(data) << i;
            }
            console.log('Size to be decoded: ' + hiddenLength);

            let fileExtension = '';
            let meetZero = false;
            for (let i = 0; i < this._remained - 6; i++) {
                const byte = this._getByte(data);
                if (!meetZero) {
                    if (byte === 0) {
                        meetZero = true;
                    } else {
                        fileExtension += String.fromCharCode(byte);
                    }
                }
            }

            let byteArray = new Uint8Array(hiddenLength);
            for (let i = 0; i < hiddenLength; i++) {
                byteArray[i] = this._getByte(data);
            }

            return {
                fileExtension: fileExtension,
                byteArray: byteArray
            }
        }

        _getByte = (data) => {
            let buffer = 0;
            for (let bitCount = 0; this._pos < this._dataRange; this._pos += 4) {
                let isSet = this._isSetL;
                if (data[this._pos] > 127) {
                    isSet = this._isSetH;
                }
                buffer |= isSet(data[this._pos]) << (bitCount++);
                buffer |= isSet(data[this._pos + 1]) << (bitCount++);
                if (bitCount === 8) {
                    const isOdd = isSet(data[this._pos + 2]);
                    if (!this._checkParity(buffer, isOdd)) {
                        throw new Error('数据校验失败');
                    } else {
                        this._pos += 4;
                        return buffer;
                    }
                } else {
                    buffer |= isSet(data[this._pos + 2]) << (bitCount++);
                }
            }
            throw new Error('不期望的文件结尾');
        }

        _isSetH = (value) => {
            return value < 255 - this._threshold;
        }

        _isSetL = (value) => {
            return value > this._threshold;
        }

        _checkParity = (byte, isOdd) => {
            let parity = 0;
            for (let i = 0; i < 8; i++) {
                parity ^= (byte >> i) & 1;
            }
            return parity == isOdd;
        }
    }

    return CloakDecoder;
}));

errorHandling.scriptsLoaded.CloakDecoder = true;
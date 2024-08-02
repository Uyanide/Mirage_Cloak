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

            this.__threshold = defaultArguments.threshold;
            this.__remained = defaultArguments.remained;
            this.__version = defaultArguments.version;
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

            this._threshold = this.__threshold;
            this._remained = this.__remained;
            this._version = this.__version;

            this.process();
        }

        process = () => {
            if (!this._srcImageData) {
                throw new Error('请先加载图像');
            }
            const data = this._srcImageData.data;
            console.log(data);
            this._dataLength = data.length;
            this._pos = 0;
            this.decode(this.getByte(data), data)();
            this._fileType = this.classifyFileType(this.fileExtension);
            const blob = new Blob([this.byteArray], { type: this._fileType });
            this._dataUrl = URL.createObjectURL(blob);
            this.showResult(this._outputCanvas, this._dataUrl, this.fileExtension);
        }

        decode = (version, data) => {
            this._version = version;
            switch (version) {
                case 1:
                    this._remained = 16;
                    return () => {
                        this._threshold = this.getByte(data);
                        this.hiddenLength = 0;
                        for (let i = 0; i < 32; i += 8) {
                            this.hiddenLength |= this.getByte(data) << i;
                        }
                        this.fileExtension = '';
                        let meetZero = false;
                        for (let i = 0; i < this._remained - 6; i++) {
                            const byte = this.getByte(data);
                            if (!meetZero) {
                                if (byte === 0) {
                                    meetZero = true;
                                } else {
                                    this.fileExtension += String.fromCharCode(byte);
                                }
                            }
                        }
                        this.byteArray = new Uint8Array(this.hiddenLength);
                        for (let i = 0; i < this.hiddenLength; i++) {
                            this.byteArray[i] = this.getByte(data);
                        }
                    }
                default:
                    throw new Error('未知编码方式');
            }
        }

        getByte = (data) => {
            let buffer = 0;
            for (let bitCount = 0; this._pos < this._dataLength; this._pos += 4) {
                let isSet = this.isSetL;
                if (data[this._pos] > 127) {
                    isSet = this.isSetH;
                }
                buffer |= isSet(data[this._pos]) << (bitCount++);
                buffer |= isSet(data[this._pos + 1]) << (bitCount++);
                if (bitCount === 8) {
                    const isOdd = isSet(data[this._pos + 2]);
                    if (!this.checkParity(buffer, isOdd)) {
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

        isSetH = (value) => {
            return value < 255 - this._threshold;
        }

        isSetL = (value) => {
            return value > this._threshold;
        }

        checkParity = (byte, isOdd) => {
            let parity = 0;
            for (let i = 0; i < 8; i++) {
                parity ^= (byte >> i) & 1;
            }
            return parity == isOdd;
        }

        saveResult = () => {
            if (!this._dataUrl) {
                throw new Error('没有文件可供保存');
            }
            this.saveResultFromUrl(this._dataUrl, this.fileExtension);
        }
    }

    return CloakDecoder;
}));

errorHandling.scriptsLoaded.CloakDecoder = true;
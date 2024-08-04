(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([
            '/scripts/processors/CloakUniversal.js',
            '/scripts/libs/pngLib.js'
        ], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require(
            '/scripts/processors/CloakUniversal.js',
            '/scripts/libs/pngLib.js'
        ));
    } else {
        root.CloakDecoder = factory(root.CloakUniversal, root.pngLib);
    }
}(typeof self !== 'undefined' ? self : this, function (CloakUniversal, pngLib) {
    class CloakDecoder extends CloakUniversal {
        constructor(defaultArguments, inputCanvasId, outputCanvasId) {
            super(defaultArguments);
            this._srcImageFile = null;
            this._srcImageData = null;
            this._inputCanvas = document.getElementById(inputCanvasId);
            this._outputCanvas = document.getElementById(outputCanvasId);

            this._version = defaultArguments.version;

            this._decoders = [
                new Decoder_v1(defaultArguments),
                new Decoder_v2(defaultArguments)
            ];
        }

        updateImage = async (imageFile) => {
            return new Promise((resolve, reject) => {
                if (this._dataUrl) {
                    URL.revokeObjectURL(this._dataUrl);
                }
                const image = new Image();
                image.onload = async () => {
                    try {
                        this._inputCanvas.width = image.width;
                        this._inputCanvas.height = image.height;
                        this._inputCanvas.getContext('2d').drawImage(image, 0, 0);
                        URL.revokeObjectURL(image.src);

                        this._srcImageFile = imageFile;
                        this._srcImageData = await pngLib.getImageDataFromImageFile(imageFile);

                        this.process();
                        resolve();
                    } catch (error) {
                        alert('图像非PNG格式！数据可能损坏。' + error);
                        try {
                            this._srcImageData = this._inputCanvas.getContext('2d').getImageData(0, 0, this._inputCanvas.width, this._inputCanvas.height);
                            this.process();
                            resolve();
                        } catch (innerError) {
                            reject(innerError);
                        }
                    }
                };
                image.onerror = (error) => {
                    reject(error);
                };
                image.src = URL.createObjectURL(imageFile);
            });
        }

        process = () => {
            if (!this._srcImageData) {
                throw new Error('请先加载图像');
            }

            console.log('Decoding...');

            this.clearCanvas(this._outputCanvas);
            this._fileExtension = null;
            this._byteArray = null;
            this._fileType = null;
            this._dataUrl = null;

            const version = this._decoders[0].getVersion(this._srcImageData) - 1;
            console.log('   Version: ' + (version + 1));
            if (version >= this._decoders.length) {
                throw new Error('未知的编码方式');
            }
            const { fileExtension, byteArray } = this._decoders[version].decode(this._srcImageData);
            this._fileExtension = fileExtension;
            this._byteArray = byteArray;

            this._fileType = this.classifyFileType(this._fileExtension);
            const blob = new Blob([this._byteArray], { type: this._fileType });
            this._dataUrl = URL.createObjectURL(blob);
            this.showResult(this._outputCanvas, this._dataUrl, this._fileExtension);

            console.log('Decoding finished');
        }

        saveResult = () => {
            if (!this._dataUrl) {
                throw new Error('没有文件可供保存');
            }
            this.saveResultFromUrl(this._dataUrl, this._fileExtension);
        }
    }

    class Decoder_v1 {
        constructor(defaultArguments) {
            this._globalDefaultThreshold = defaultArguments.default_threshold;
            this._defaultThreshold = defaultArguments.version_1.default_threshold;
            this._remained = defaultArguments.version_1.remained;
        }

        getVersion = (srcImageData) => {
            this._pos = 0;
            this._threshold = this._globalDefaultThreshold;
            this._dataRange = srcImageData.data.length;
            return this._getByte(srcImageData.data);
        }

        decode = (srcImageData) => {
            this._pos = 12;
            this._threshold = this._defaultThreshold;
            this._dataRange = srcImageData.data.length;
            const data = srcImageData.data;

            this._threshold = this._getByte(data);
            console.log('   Threshold: ' + this._threshold);

            let hiddenLength = 0;
            for (let i = 0; i < 32; i += 8) {
                hiddenLength |= this._getByte(data) << i;
            }
            console.log('   Size to be decoded: ' + hiddenLength);

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
            console.log('   File extension: ' + fileExtension);

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
                        console.log('Error Info:')
                        console.log('   Data: ' + buffer.toString(16));
                        console.log('   Parity: ' + isOdd);
                        console.log('   Pixel Index: ' + this._pos / 4);
                        console.log('   Previous RGB:');
                        for (let i = 2; i >= 0; i--) {
                            console.log(data[this._pos - 4 * i]);
                            console.log(data[this._pos - 4 * i + 1]);
                            console.log(data[this._pos - 4 * i + 2]);
                        }
                        throw new Error('数据校验失败，请查看控制台输出。');
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

    class Decoder_v2 {
        constructor(defaultArguments) {
            this._defaultThreshold = defaultArguments.version_2.default_threshold;
            this._remained = defaultArguments.version_2.remained;
        }

        decode = (srcImageData) => {
            this._pos = 12;
            this._threshold = this._defaultThreshold;
            this._dataRange = srcImageData.data.length;
            const data = srcImageData.data;

            this._threshold = this._getBytePair(data);
            console.log('   Threshold: ' + this._threshold);

            let hiddenLength = 0;
            for (let i = 0; i < 32; i += 16) {
                hiddenLength |= this._getBytePair(data) << i;
            }
            console.log('   Size to be decoded: ' + hiddenLength);

            let fileExtension = '';
            let meetZero = false;
            for (let i = 0; i < this._remained - 4; i++) {
                const byte = this._getBytePair(data);
                if (!meetZero) {
                    if (byte === 0) {
                        meetZero = true;
                    } else {
                        fileExtension += String.fromCharCode(byte);
                    }
                }
            }

            console.log('   File extension: ' + fileExtension);

            let byteArray = new Uint8Array(hiddenLength);
            for (let i = 0; i < hiddenLength - 2; i += 2) {
                const bytePair = this._getBytePair(data);
                byteArray[i] = bytePair & 0xff;
                byteArray[i + 1] = bytePair >> 8;
            }
            if (hiddenLength & 1) {
                byteArray[hiddenLength - 1] = this._getBytePair(data);
            } else {
                const lastBytePair = this._getBytePair(data);
                byteArray[hiddenLength - 2] = lastBytePair & 0xff;
                byteArray[hiddenLength - 1] = lastBytePair >> 8;
            }

            return {
                fileExtension: fileExtension,
                byteArray: byteArray
            };
        }

        _getBytePair = (data) => {
            let buffer = 0;
            for (let bitCount = 0; this._pos < this._dataRange; this._pos += 4) {
                let getBitsPair = this._getBitsPairL;
                if (data[this._pos] > 127) {
                    getBitsPair = this._getBitsPairH;
                }
                buffer |= getBitsPair(data[this._pos]) << ((bitCount++) << 1);
                buffer |= getBitsPair(data[this._pos + 1]) << ((bitCount++) << 1);
                if (bitCount === 8) {
                    const isOddPair = getBitsPair(data[this._pos + 2]);
                    if (!this._checkParityPair(buffer, isOddPair)) {
                        console.log('Error Info:')
                        console.log('   Data: ' + buffer.toString(16));
                        console.log('   Parity: ' + isOddPair);
                        console.log('   Pixel Index: ' + this._pos / 4);
                        console.log('   Previous RGB:');
                        for (let i = 2; i >= 0; i--) {
                            console.log(data[this._pos - 4 * i]);
                            console.log(data[this._pos - 4 * i + 1]);
                            console.log(data[this._pos - 4 * i + 2]);
                        }
                        throw new Error('数据校验失败，请查看控制台输出。');
                    } else {
                        this._pos += 4;
                        return buffer;
                    }
                } else {
                    buffer |= getBitsPair(data[this._pos + 2]) << ((bitCount++) << 1);
                }
            }
            throw new Error('不期望的文件结尾');
        }

        _getBitsPairH = (value) => {
            return Math.max(Math.min(Math.floor((255 - value + this._threshold) / (this._threshold << 1)), 3), 0);
        }

        _getBitsPairL = (value) => {
            return Math.max(Math.min(Math.floor((value + this._threshold) / (this._threshold << 1)), 3), 0);
        }

        _checkParityPair = (bytePair, isOddPair) => {
            let parity = 0;
            for (let i = 0; i < 8; i++) {
                parity ^= (bytePair >> i) & 1;
            }
            for (let i = 8; i < 16; i++) {
                parity ^= ((bytePair >> i) & 1) << 1;
            }
            return parity == isOddPair;
        }
    }

    return CloakDecoder;
}));

errorHandling.scriptsLoaded.CloakDecoder = true;
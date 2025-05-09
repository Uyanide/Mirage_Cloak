import { CloakUniversal } from './CloakUniversal.js';
import { decode as pngDecode } from 'fast-png';

export class CloakDecoder extends CloakUniversal {
    constructor(defaultArguments, inputCanvasId, outputMetaCanvasId) {
        super(defaultArguments);
        this._srcImageFile = null;
        this._srcImageData = null;
        this._inputCanvas = document.getElementById(inputCanvasId);
        this._outputMetaCanvas = document.getElementById(outputMetaCanvasId);

        this._version = defaultArguments.version;

        this._decoders = [
            new Decoder_v0(defaultArguments),
            new Decoder_v1(defaultArguments),
            new Decoder_v2(defaultArguments),
            new Decoder_v3(defaultArguments),
            new Decoder_v4(defaultArguments),
            new Decoder_v5(defaultArguments),
        ];
    }

    updateImage = async (imageFile, srcImage = null, url = null, fileExt = null, length = null) => {
        this._fileExtension = null;
        this._byteArray = null;
        this._fileType = null;
        this._dataUrl = null;

        CloakUniversal.showTextOnMetaCanvas(this._outputMetaCanvas, '正在处理...');
        try {
            // handle with inputCanvas
            if (srcImage) {
                this._inputCanvas.width = srcImage.width;
                this._inputCanvas.height = srcImage.height;
                this._inputCanvas.getContext('2d').drawImage(srcImage, 0, 0);
            } else if (url !== 'failed') {
                // srcImage can also be null sometimes if url is 'failed'
                await new Promise((resolve, reject) => {
                    const image = new Image();
                    image.onload = () => {
                        this._inputCanvas.width = image.width;
                        this._inputCanvas.height = image.height;
                        this._inputCanvas.getContext('2d').drawImage(image, 0, 0);
                        URL.revokeObjectURL(image.src);
                        resolve();
                    };
                    image.onerror = (error) => {
                        reject(error);
                    };
                    image.src = URL.createObjectURL(imageFile);
                });
            } else {
                CloakUniversal.clearCanvas(this._inputCanvas);
            }
            // handle with outputMetaCanvas
            if (url === 'failed') {
                CloakUniversal.showTextOnMetaCanvas(this._outputMetaCanvas, '无法解码');
                return;
            } else if (url) {
                this._dataUrl = url;
                this._fileExtension = fileExt;
                await CloakUniversal.showMetaCanvas(this._outputMetaCanvas, url, fileExt, length);
                return;
            }
            this._srcImageFile = imageFile;
            this._srcImageData = await this._getImageDataFromImageFile(imageFile);
            this.process();
        } catch (error) {
            error.message = '第一次处理失败！' + error.message;
            try {
                this._srcImageData = this._inputCanvas
                    .getContext('2d')
                    .getImageData(0, 0, this._inputCanvas.width, this._inputCanvas.height);
                this.process();
            } catch (innerError) {
                CloakUniversal.clearMetaCanvas(this._outputMetaCanvas);
                const combinedError = new Error(error.message + ' 第二次处理失败！' + innerError.message);
                combinedError.stack = error.stack + '\n' + innerError.stack;
                throw combinedError;
            }
        }
    };

    _getImageDataFromImageFile = async (imageFile) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async (event) => {
                try {
                    const arrayBuffer = event.target.result;
                    const png = pngDecode(new Uint8Array(arrayBuffer));
                    resolve(new ImageData(new Uint8ClampedArray(png.data), png.width, png.height));
                } catch (error) {
                    reject(error);
                }
            };
            reader.onerror = (error) => {
                reject(error);
            };
            reader.readAsArrayBuffer(imageFile);
        });
    };

    process = () => {
        if (!this._srcImageData) {
            throw new Error('请先加载图像！');
        }

        console.log('Decoding...');

        const version = this._decoders[1].getVersion(this._srcImageData);
        console.log('   Version: ' + version);
        if (version >= this._decoders.length) {
            throw new Error('未知的编码方式！');
        }
        if (version === 4 || version === 5) {
            CloakUniversal.showTextOnMetaCanvas(this._outputMetaCanvas, '无需解码');
            this._dataUrl = 'dontcare';
            return;
        }
        const { fileExtension, byteArray } = this._decoders[version].decode(this._srcImageData);
        this._fileExtension = fileExtension;
        this._byteArray = byteArray;

        this._fileType = CloakUniversal.classifyFileType(this._fileExtension);
        const blob = new Blob([this._byteArray], { type: this._fileType });
        this._dataUrl = URL.createObjectURL(blob);
        CloakUniversal.showMetaCanvas(this._outputMetaCanvas, this._dataUrl, this._fileExtension, this._byteArray.length);
        console.log('Decoding finished');
    };

    saveResult = () => {
        if (this._dataUrl === 'dontcare') {
            return;
        }
        if (!this._dataUrl) {
            throw new Error('没有文件可供保存！');
        }
        CloakUniversal.saveResultFromUrl(this._dataUrl, this._fileExtension);
    };

    getResult = () => {
        if (this._dataUrl === 'dontcare') {
            return 'dontcare';
        }
        if (!this._dataUrl) {
            return null;
        } else {
            return {
                url: this._dataUrl,
                fileExt: this._fileExtension,
                length: this._byteArray.length,
            };
        }
    };
}

class Decoder_v1 {
    constructor(defaultArguments) {
        this._globalDefaultThreshold = defaultArguments.default_threshold;
        this._defaultThreshold = defaultArguments.version_1.default_threshold;
        this._remained = defaultArguments.version_1.remained;
    }

    getVersion = (srcImageData) => {
        const data = srcImageData.data;
        // Gray Mirage: 114, 114, 114, 255
        if (data[0] === 114 && data[1] === 114 && data[2] === 114 && data[3] === 255) {
            return 4;
        }
        // Colored Mirage: 51, 51, 51, 255
        if (data[0] === 51 && data[1] === 51 && data[2] === 51 && data[3] === 255) {
            return 5;
        }
        // Pure LSB: 0B-xx11-1000, 0B-xx10-0011, 0B-xx00-0xxx
        if ((data[0] & 0x3f) === 0x38 && (data[1] & 0x3f) === 0x23 && (data[2] & 0x3f) >= 1 && (data[2] & 0x3f) <= 7) {
            return 3;
        }
        // Typical LSB: 0B-xxxx-x000, 0B-xxxx-x011, 0B-xxxx-xxxx
        // My encoding algorithm doesn't allow compress-rate to be 7, but it still should be possible to decode it
        if ((data[0] & 7) === 0 && (data[1] & 7) === 3 && (data[2] & 7) >= 1 /*&& (data[2] & 7) <= 7*/) {
            return 0;
        }
        this._pos = 0;
        this._threshold = this._globalDefaultThreshold;
        this._dataRange = srcImageData.data.length;
        return this._getByte(srcImageData.data);
    };

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
            byteArray: byteArray,
        };
    };

    _getByte = (data) => {
        let buffer = 0;
        for (let bitCount = 0; this._pos < this._dataRange; this._pos += 4) {
            let isSet = this._isSetL;
            if (data[this._pos] > 127) {
                isSet = this._isSetH;
            }
            buffer |= isSet(data[this._pos]) << bitCount++;
            buffer |= isSet(data[this._pos + 1]) << bitCount++;
            if (bitCount === 8) {
                const isOdd = isSet(data[this._pos + 2]);
                if (!this._checkParity(buffer, isOdd)) {
                    console.log('Error Info:');
                    console.log('   Data: ' + buffer.toString(16));
                    console.log('   Parity: ' + isOdd);
                    console.log('   Pixel Index: ' + this._pos / 4);
                    console.log('   Previous RGB:');
                    for (let i = 2; i >= 0; i--) {
                        console.log(data[this._pos - 4 * i]);
                        console.log(data[this._pos - 4 * i + 1]);
                        console.log(data[this._pos - 4 * i + 2]);
                    }
                    throw new Error('数据校验失败！详细信息可查看控制台输出。');
                } else {
                    this._pos += 4;
                    return buffer;
                }
            } else {
                buffer |= isSet(data[this._pos + 2]) << bitCount++;
            }
        }
        throw new Error('不期望的文件结尾！');
    };

    _isSetH = (value) => {
        return value < 255 - this._threshold;
    };

    _isSetL = (value) => {
        return value > this._threshold;
    };

    _checkParity = (byte, isOdd) => {
        let parity = 0;
        for (let i = 0; i < 8; i++) {
            parity ^= (byte >> i) & 1;
        }
        return parity == isOdd;
    };
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
            byteArray: byteArray,
        };
    };

    _getBytePair = (data) => {
        let buffer = 0;
        for (let bitCount = 0; this._pos < this._dataRange; this._pos += 4) {
            let getBitsPair = this._getBitsPairL;
            if (data[this._pos] > 127) {
                getBitsPair = this._getBitsPairH;
            }
            buffer |= getBitsPair(data[this._pos]) << (bitCount++ << 1);
            buffer |= getBitsPair(data[this._pos + 1]) << (bitCount++ << 1);
            if (bitCount === 8) {
                const isOddPair = getBitsPair(data[this._pos + 2]);
                if (!this._checkParityPair(buffer, isOddPair)) {
                    console.log('Error Info:');
                    console.log('   Data: ' + buffer.toString(16));
                    console.log('   Parity: ' + isOddPair);
                    console.log('   Pixel Index: ' + this._pos / 4);
                    console.log('   Previous RGB:');
                    for (let i = 2; i >= 0; i--) {
                        console.log(data[this._pos - 4 * i]);
                        console.log(data[this._pos - 4 * i + 1]);
                        console.log(data[this._pos - 4 * i + 2]);
                    }
                    throw new Error('数据校验失败！详情可查看控制台输出。');
                } else {
                    this._pos += 4;
                    return buffer;
                }
            } else {
                buffer |= getBitsPair(data[this._pos + 2]) << (bitCount++ << 1);
            }
        }
        throw new Error('不期望的文件结尾！');
    };

    _getBitsPairH = (value) => {
        return Math.max(Math.min(Math.floor((255 - value + this._threshold) / (this._threshold << 1)), 3), 0);
    };

    _getBitsPairL = (value) => {
        return Math.max(Math.min(Math.floor((value + this._threshold) / (this._threshold << 1)), 3), 0);
    };

    _checkParityPair = (bytePair, isOddPair) => {
        let parity = 0;
        for (let i = 0; i < 8; i++) {
            parity ^= (bytePair >> i) & 1;
        }
        for (let i = 8; i < 16; i++) {
            parity ^= ((bytePair >> i) & 1) << 1;
        }
        return parity == isOddPair;
    };
}

class Decoder_v0 {
    // LSB
    constructor(defaultArguments) {}

    decode = (srcImageData) => {
        this._data = srcImageData.data;
        this._compress = this._data[2] & 7;
        if (!this._compress) {
            throw new Error('错误的标识符！');
        }
        console.log('   Compression: ' + this._compress);

        (this._dataPos = 4), (this._buffer = 0), (this._bufferSize = 0);
        let byte;
        let dataLength = 0;
        while ((byte = this._getByte()) !== 1) {
            dataLength = dataLength * 10 + byte - 48;
        }
        console.log('   Size to be decoded: ' + dataLength);

        let fileExtension = '';
        while ((byte = this._getByte()) !== 1) {
            fileExtension += String.fromCharCode(byte);
        }
        if (fileExtension.indexOf('.') !== -1) {
            fileExtension = fileExtension.substring(fileExtension.indexOf('.') + 1);
        }
        console.log('   File extension: ' + fileExtension);

        while ((byte = this._getByte()) !== 0) {} // We dont need the file type here

        let byteArray = new Uint8Array(dataLength);
        for (let i = 0; i < dataLength; i++) {
            byteArray[i] = this._getByte();
        }

        return {
            fileExtension: fileExtension,
            byteArray: byteArray,
        };
    };

    _getByte = () => {
        while (this._bufferSize < 8) {
            this._buffer = (this._buffer << this._compress) | (this._data[this._dataPos] & ((1 << this._compress) - 1));
            this._bufferSize += this._compress;
            this._dataPos++;
            if (this._dataPos >= this._data.length) {
                throw new Error('不期望的文件结尾！');
            } else if ((this._dataPos & 3) === 3) {
                // Skip alpha channel
                this._dataPos++;
            }
        }
        this._bufferSize -= 8;
        const buffer = this._buffer & (0xff << this._bufferSize);
        this._buffer &= (1 << this._bufferSize) - 1;
        return buffer >> this._bufferSize;
    };
}

class Decoder_v3 extends Decoder_v0 {
    // Pure LSB without Mirage, can be decoded by the exactly same method as Decoder_v0
    constructor(defaultArguments) {
        super(defaultArguments);
    }
}

class Decoder_v4 {
    /* Just normal Mirage, no need to decode */
}

class Decoder_v5 {
    /* Colored Mirage, also no need to decode */
}

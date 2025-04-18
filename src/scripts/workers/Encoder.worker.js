let encoders = [];
import { CloakUniversal } from '../processors/CloakUniversal.js';

self.onmessage = async (event) => {
    try {
        switch (event.data.mission) {
            case 'init':
                encoders.push(new Encoder_v0(event.data.defaultArguments));
                encoders.push(new Encoder_v1(event.data.defaultArguments));
                encoders.push(new Encoder_v2(event.data.defaultArguments));
                encoders.push(new Encoder_v3(event.data.defaultArguments));
                encoders.push(new Encoder_v4(event.data.defaultArguments));
                encoders.push(new Encoder_v5(event.data.defaultArguments));
                break;
            case 'length':
                postMessage({
                    success: true,
                    result: encoders[event.data.version].getRequiredLength(event.data.hiddenFile, event.data.diff),
                });
                break;
            case 'encode':
                postMessage({
                    success: true,
                    result: encoders[event.data.version].encode(
                        event.data.innerImageData,
                        event.data.coverImageData,
                        event.data.hiddenFile,
                        event.data.fileExt,
                        event.data.diff
                    ),
                });
                break;
            default:
                break;
        }
    } catch (error) {
        postMessage({ success: false, error: error });
    }
};

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

        if (writeVersion === 1 && this._pixelRange < this.getRequiredLength(hiddenFile)) {
            throw new Error('可用像素过少，编码空间不足！');
        }

        this._version = writeVersion;
        let outputData = new Uint8ClampedArray(this._innerData.length);
        this._byteArray = hiddenFile;
        this._targetSize = this._byteArray.length;
        this._fileExtension = fileExtensionName;
        this._diff = customDiff || this._defaultDiff;

        for (let i = 0; i < this._pixelRange; i++) {
            const diff =
                i < 3
                    ? this._globalDefaultDiff // encoding method for "version" are globally fixed
                    : i < 6
                    ? this._defaultDiff // encoding method for "threshold" are for each version fixed
                    : this._diff; // otherwise use customized differece to encode
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

        if (byteIndex === 0) {
            // version
            return this._getBitsFromByte(this._version, pixelIndexMod3);
        } else if (byteIndex === 1) {
            // threshold
            return this._getBitsFromByte(Math.floor(this._diff / 2), pixelIndexMod3);
        } else if (byteIndex <= 5) {
            // length
            return this._getBitsFromByte((this._targetSize >> ((byteIndex - 2) << 3)) & 0xff, pixelIndexMod3);
        } else if (byteIndex < this._remained) {
            // file extension name
            return byteIndex - 6 < this._fileExtension.length
                ? this._getBitsFromByte(this._fileExtension.charCodeAt(byteIndex - 6), pixelIndexMod3)
                : this._getBitsFromByte(0, pixelIndexMod3);
        } else if (byteIndex < this._targetSize + this._remained) {
            // data
            return this._getBitsFromByte(this._byteArray[byteIndex - this._remained], pixelIndexMod3);
        } else {
            // random padding
            return this._getRandomBits();
        }
    };

    _scale = (value, scale, offset) => {
        return Math.floor(value * scale + offset);
    };

    _isInner = (pixelIndex) => {
        return ((pixelIndex % this._width) + Math.floor(pixelIndex / this._width)) % 2 === 0;
    };

    _getBitsFromByte = (origByte, pixelIndex) => {
        const byte = origByte >> (pixelIndex * 3);
        const r = byte & 1;
        const g = (byte >> 1) & 1;
        if (pixelIndex != 2) {
            return {
                r: r,
                g: g,
                b: (byte >> 2) & 1,
            };
        } else {
            return {
                r: r,
                g: g,
                b: this._calParityBit(origByte),
            };
        }
    };

    _getRandomBits = () => {
        return {
            r: Math.random() > 0.5 ? 1 : 0,
            g: Math.random() > 0.5 ? 1 : 0,
            b: Math.random() > 0.5 ? 1 : 0,
        };
    };

    _calParityBit = (byte) => {
        let parity = 0;
        for (let i = 0; i < 8; i++) {
            parity ^= (byte >> i) & 1;
        }
        return parity;
    };
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
        return (hiddenFile.length >> (1 + this._remained + this._padding)) * 3;
    }

    encode(innerImageData, coverImageData, hiddenFile, fileExtensionName, customDiff) {
        let outputData = super.encode(innerImageData, coverImageData, hiddenFile, fileExtensionName, undefined, this._version); // use version 1 to encode version infomation
        this._diff = customDiff;
        this._pixelRange = innerImageData.data.length >> 2;

        if (this._pixelRange < this.getRequiredLength(hiddenFile)) {
            throw new Error('可用像素过少，编码空间不足！');
        }

        if (this._targetSize & 1) {
            let newByteArray = new Uint8Array(this._targetSize + 1);
            newByteArray.set(this._byteArray);
            newByteArray[this._targetSize] = 0;
            this._byteArray = newByteArray;
        }
        for (let i = 3; i < this._pixelRange; i++) {
            const diff = Math.floor((i < 6 ? this._defaultDiff : this._diff) / 3); // use defaultDiff to encode threshold
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

        if (bytePairIndex < 2) {
            // threshold
            return this._getBitsFromBytePair(Math.floor(this._diff / 6), pixelIndexMod3);
        } else if (bytePairIndex < 4) {
            // length
            return this._getBitsFromBytePair((this._targetSize >> ((bytePairIndex - 2) << 4)) & 0xffff, pixelIndexMod3);
        } else if (bytePairIndex < this._remained) {
            return bytePairIndex - 4 < this._fileExtension.length
                ? this._getBitsFromBytePair(this._fileExtension.charCodeAt(bytePairIndex - 4), pixelIndexMod3)
                : this._getBitsFromByte(0, pixelIndexMod3);
        } else if (bytePairIndex < Math.ceil(this._targetSize / 2) + this._remained) {
            // data
            return this._getBitsFromBytePair(
                this._byteArray[(bytePairIndex - this._remained) << 1] |
                    (this._byteArray[((bytePairIndex - this._remained) << 1) + 1] << 8),
                pixelIndexMod3
            );
        } else {
            // random padding
            return this._getRandomBits();
        }
    };

    _getBitsFromBytePair = (origBytePair, pixelIndex) => {
        const byte = origBytePair >> (pixelIndex * 6);
        const r = byte & 3;
        const g = (byte >> 2) & 3;
        if (pixelIndex != 2) {
            return {
                r: r,
                g: g,
                b: (byte >> 4) & 3,
            };
        } else {
            return {
                r: r,
                g: g,
                b: this._calParityBitPair(origBytePair),
            };
        }
    };

    _calParityBitPair = (bytePair) => {
        let parity = 0;
        for (let i = 0; i < 8; i++) {
            parity ^= (bytePair >> i) & 1;
        }
        for (let i = 8; i < 16; i++) {
            parity ^= ((bytePair >> i) & 1) << 1;
        }
        return parity;
    };

    _getRandomBits = () => {
        return {
            r: Math.floor(Math.random() * 4),
            g: Math.floor(Math.random() * 4),
            b: Math.floor(Math.random() * 4),
        };
    };
}

class Encoder_v0 {
    // typical LSB Steganography, also works with mirage images :)
    constructor(defaultArguments) {
        this._defaultDiff = defaultArguments.version_0.default_difference;
        this._padding = defaultArguments.version_0.padding;

        this._scale_i = defaultArguments.version_0.scale_inner;
        this._offset_i = defaultArguments.version_0.offset_inner;
        this._scale_c = defaultArguments.version_0.scale_cover;
        this._offset_c = defaultArguments.version_0.offset_cover;
    }

    encode = (innerImageData, coverImageData, hiddenFile, fileExtensionName, customDiff) => {
        const innerData = innerImageData.data;
        const coverData = coverImageData.data;
        const width = innerImageData.width;
        const pixelRange = innerData.length >> 2;
        this._targetSize = hiddenFile.length;
        this._compress = this._calCompress(customDiff || this._defaultDiff);
        let outputData = new Uint8ClampedArray(innerData.length);

        outputData[0] = 0xf8;
        outputData[1] = 0xfb;
        outputData[2] = 0xf8 | this._compress;
        outputData[3] = this._scaleInner(innerData[0]);

        this._byteArray = [];
        this._byteArray.push(
            ...this._targetSize
                .toString()
                .split('')
                .map((c) => c.charCodeAt(0))
        );
        this._byteArray.push(1);
        this._byteArray.push(...('mtc.' + fileExtensionName).split('').map((c) => c.charCodeAt(0)));
        this._byteArray.push(1);
        this._byteArray.push(
            ...CloakUniversal.classifyFileType(fileExtensionName)
                .split('')
                .map((c) => c.charCodeAt(0))
        );
        this._byteArray.push(0);
        this._fileArray = hiddenFile;
        if (this._byteArray.length > this._padding) {
            throw new Error('头部信息过长！可尝试更改文件拓展名。');
        }

        (this._bytePos = 0), (this._buffer = 0), (this._bufferSize = 0);
        const baseInner = 255 & ~((1 << this._compress) - 1);
        for (let pixelIndex = 1; pixelIndex < pixelRange; pixelIndex++) {
            const isInner = ((pixelIndex % width) + Math.floor(pixelIndex / width)) % 2 === 0;
            outputData[4 * pixelIndex] = isInner ? baseInner | this._popBits() : this._popBits();
            outputData[4 * pixelIndex + 1] = isInner ? baseInner | this._popBits() : this._popBits();
            outputData[4 * pixelIndex + 2] = isInner ? baseInner | this._popBits() : this._popBits();
            outputData[4 * pixelIndex + 3] = isInner
                ? this._scaleInner(innerData[4 * pixelIndex])
                : 255 - this._scaleCover(coverData[4 * pixelIndex]);
        }

        if (this._bytePos < this._byteArray.length + this._targetSize) {
            throw new Error('可用像素过少，编码空间不足！');
        }

        return outputData;
    };

    getRequiredLength = (hiddenFile, diff) => {
        const compress = this._calCompress(diff);
        return Math.ceil(((this._padding + hiddenFile.length) << 3) / compress / 3) + 1;
    };

    _calCompress = (diff) => {
        return Math.min(Math.max(Math.floor(diff / 10), 1), 7);
    };

    _pushByte = () => {
        const byte =
            this._bytePos < this._byteArray.length
                ? this._byteArray[this._bytePos]
                : this._bytePos < this._byteArray.length + this._targetSize
                ? this._fileArray[this._bytePos - this._byteArray.length]
                : Math.floor(Math.random() * 256);
        this._bytePos++;
        this._buffer = (this._buffer << 8) | byte;
        this._bufferSize += 8;
    };

    _popBits = () => {
        if (this._bufferSize < this._compress) {
            this._pushByte();
        }
        const bits =
            (this._buffer & (((1 << this._compress) - 1) << (this._bufferSize - this._compress))) >>
            (this._bufferSize - this._compress);
        this._bufferSize -= this._compress;
        this._buffer &= (1 << this._bufferSize) - 1;
        return bits;
    };

    _scaleInner = (value) => {
        return Math.floor(value * this._scale_i + this._offset_i);
    };

    _scaleCover = (value) => {
        return Math.floor(value * this._scale_c + this._offset_c);
    };
}

class Encoder_v3 extends Encoder_v0 {
    constructor(defaultArguments) {
        super(defaultArguments);
        this._defaultDiff = defaultArguments.version_3.default_difference;
        this._padding = defaultArguments.version_3.padding;
    }

    encode = (innerImageData, _, hiddenFile, fileExtensionName, customDiff) => {
        const innerData = innerImageData.data;
        const pixelRange = innerData.length >> 2;
        this._targetSize = hiddenFile.length;
        this._compress = this._calCompress(customDiff || this._defaultDiff);
        let outputData = new Uint8ClampedArray(innerData.length);

        outputData[0] = (innerData[0] & 0xc0) | 0x38;
        outputData[1] = (innerData[1] & 0xc0) | 0x23;
        outputData[2] = (innerData[1] & 0xc0) | this._compress;
        outputData[3] = 255;

        this._byteArray = [];
        this._byteArray.push(
            ...this._targetSize
                .toString()
                .split('')
                .map((c) => c.charCodeAt(0))
        );
        this._byteArray.push(1);
        this._byteArray.push(...('mtc.' + fileExtensionName).split('').map((c) => c.charCodeAt(0)));
        this._byteArray.push(1);
        this._byteArray.push(
            ...CloakUniversal.classifyFileType(fileExtensionName)
                .split('')
                .map((c) => c.charCodeAt(0))
        );
        this._byteArray.push(0);
        this._fileArray = hiddenFile;
        if (this._byteArray.length > this._padding) {
            throw new Error('头部信息过长！可尝试更改文件拓展名。');
        }

        (this._bytePos = 0), (this._buffer = 0), (this._bufferSize = 0);
        const baseInner = 255 & ~((1 << this._compress) - 1);
        for (let pixelIndex = 1; pixelIndex < pixelRange; pixelIndex++) {
            outputData[4 * pixelIndex] = (innerData[4 * pixelIndex] & baseInner) | this._popBits();
            outputData[4 * pixelIndex + 1] = (innerData[4 * pixelIndex + 1] & baseInner) | this._popBits();
            outputData[4 * pixelIndex + 2] = (innerData[4 * pixelIndex + 2] & baseInner) | this._popBits();
            outputData[4 * pixelIndex + 3] = 255;
        }

        if (this._bytePos < this._byteArray.length + this._targetSize) {
            throw new Error('可用像素过少，编码空间不足！');
        }

        return outputData;
    };
}

class Encoder_v4 {
    // grayscale mirage image
    constructor(defaultArguments) {
        this._scale_i = defaultArguments.version_4.scale_inner;
        this._scale_c = defaultArguments.version_4.scale_cover;
    }

    encode = (innerImageData, coverImageData) => {
        const innerData = innerImageData.data;
        const coverData = coverImageData.data;
        let outputData = new Uint8ClampedArray(innerData.length);

        // need some signs for decoding, case someone uses the decoder to decode this normal mirage image
        outputData[0] = 114;
        outputData[1] = 114;
        outputData[2] = 114;
        outputData[3] = 255;

        for (let i = 4; i < innerData.length; i += 4) {
            const li = this._scale_l(innerData[i], this._scale_i);
            const lc = this._scale_h(coverData[i], this._scale_c);
            outputData[i + 3] = 255 - lc + li;
            outputData[i] = (li * 255) / outputData[i + 3];
            outputData[i + 1] = outputData[i + 2] = outputData[i];
        }

        return outputData;
    };

    _scale_l = (value, scale) => {
        return Math.floor(value * scale);
    };

    _scale_h = (value, scale) => {
        return Math.floor(255 - (255 - value) * scale);
    };

    getRequiredLength = () => {
        return 1;
    };
}

class Encoder_v5 extends Encoder_v4 {
    // colored mirage image, improved from https://github.com/Ductory/ducklib/blob/main/tank.c
    constructor(defaultArguments) {
        super(defaultArguments);
        this._scale_i = defaultArguments.version_4.scale_inner;
        this._scale_c = defaultArguments.version_4.scale_cover;
        this._weight_i = defaultArguments.version_5.weight_inner;
        this._weight_c = defaultArguments.version_5.weight_cover;
    }

    encode = (innerImageData, coverImageData) => {
        const innerData = innerImageData.data;
        const coverData = coverImageData.data;
        let outputData = new Uint8ClampedArray(innerData.length);

        // need some signs for decoding, case someone uses the decoder to decode this normal mirage image
        outputData[0] = 51;
        outputData[1] = 51;
        outputData[2] = 51;
        outputData[3] = 255;

        for (let i = 4; i < innerData.length; i += 4) {
            const ir = this._scale_l(innerData[i], this._scale_i);
            const ig = this._scale_l(innerData[i + 1], this._scale_i);
            const ib = this._scale_l(innerData[i + 2], this._scale_i);
            const cr = this._scale_h(coverData[i], this._scale_c);
            const cg = this._scale_h(coverData[i + 1], this._scale_c);
            const cb = this._scale_h(coverData[i + 2], this._scale_c);

            const dr = ir - cr,
                dg = ig - cg,
                db = ib - cb;
            const a = Math.max(
                1 +
                    ((2048 | (dr + ((ir + cr) << 1))) * dr - (db + ((ir + cr) << 1) - 3068) * db + (dg << 12)) /
                        (1020 * (dr - db) + 2349060),
                0
            );
            outputData[i] = (ir / a) * this._weight_i + (255 - (255 - cr) / a) * this._weight_c;
            outputData[i + 1] = (ig / a) * this._weight_i + (255 - (255 - cg) / a) * this._weight_c;
            outputData[i + 2] = (ib / a) * this._weight_i + (255 - (255 - cb) / a) * this._weight_c;
            outputData[i + 3] = a * 255;
        }

        return outputData;
    };
}

import CloakUniversal from './CloakUniversal.js';

class CloakDecoder extends CloakUniversal {
    constructor(defaultArguments, inputCanvasId, outputCanvasId) {
        super(defaultArguments);
        this.srcImage = null;
        this.srcImageData = null;
        this.inputCanvas = document.getElementById(inputCanvasId);
        this.outputCanvas = document.getElementById(outputCanvasId);
    }

    updateImage = (img) => {
        if (this.dataUrl) {
            URL.revokeObjectURL(this.dataUrl);
        }
        this.srcImage = img;
        this.inputCanvas.width = img.width;
        this.inputCanvas.height = img.height;
        this.inputCanvas.getContext('2d').drawImage(img, 0, 0);
        this.srcImageData = this.inputCanvas.getContext('2d').getImageData(0, 0, img.width, img.height);

        this.threshold = this._threshold;
        this.remained = this._remained;
        this.version = this._version;

        this.process();
    }

    process = () => {
        if (!this.srcImageData) {
            throw new Error('请先加载图像');
        }
        const data = this.srcImageData.data;
        this.dataLength = data.length;
        this.pos = 0;
        this.decode(this.getByte(data), data)();
        this.fileType = this.classifyFileType(this.fileExtension);
        const blob = new Blob([this.byteArray], { type: this.fileType });
        this.dataUrl = URL.createObjectURL(blob);
        this.showResult(this.outputCanvas, this.dataUrl, this.fileExtension);
    }

    decode = (version, data) => {
        this.version = version;
        switch (version) {
            case 1:
                this.remained = 16;
                return () => {
                    this.threshold = this.getByte(data);
                    this.hiddenLength = 0;
                    for (let i = 0; i < 32; i += 8) {
                        this.hiddenLength |= this.getByte(data) << i;
                    }
                    this.fileExtension = '';
                    let meetZero = false;
                    for (let i = 0; i < this.remained - 6; i++) {
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
        for (let bitCount = 0; this.pos < this.dataLength; this.pos += 4) {
            let isSet = this.isSetL;
            if (data[this.pos] > 127) {
                isSet = this.isSetH;
            }
            buffer |= isSet(data[this.pos]) << (bitCount++);
            buffer |= isSet(data[this.pos + 1]) << (bitCount++);
            if (bitCount === 8) {
                const isOdd = isSet(data[this.pos + 2]);
                if (!this.checkParity(buffer, isOdd)) {
                    throw new Error('数据校验失败');
                } else {
                    this.pos += 4;
                    return buffer;
                }
            } else {
                buffer |= isSet(data[this.pos + 2]) << (bitCount++);
            }
        }
        throw new Error('不期望的文件结尾');
    }

    isSetH = (value) => {
        return value < 255 - this.threshold;
    }

    isSetL = (value) => {
        return value > this.threshold;
    }

    checkParity = (byte, isOdd) => {
        let parity = 0;
        for (let i = 0; i < 8; i++) {
            parity ^= (byte >> i) & 1;
        }
        return parity == isOdd;
    }

    saveResult = () => {
        if (!this.dataUrl) {
            throw new Error('没有文件可供保存');
        }
        this.saveResultFromUrl(this.dataUrl, this.fileExtension);
    }
}

export default CloakDecoder;

errorHandling.scriptsLoaded.CloakDecoder = true;
import { CloakUniversal } from './CloakUniversal.js';
import { JPEGEncoder } from '../libs/JPEGEncoder.js';
import PngEncoder from '../workers/PngEncoder.worker.js';
import Encoder from '../workers/Encoder.worker.js';

export class CloakEncoder extends CloakUniversal {
    constructor(defaultArguments, innerCanvasId, coverCanvasId, hiddenMetaCanvasId, outputCanvasId, sizeLabelId, hiddenSizeLabelId, saveLabelId) {
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
        this._diff = defaultArguments[`version_${this._version}`].difference;

        this._hiddenFile = null;
        this._fileExtension = '';
        this._fileExtensionCompressed = '';
        this._byteArray = null;
        this._byteArrayCompressed = null;
        this._outputData = null;

        this._innerCanvas = document.getElementById(innerCanvasId);
        this._coverCanvas = document.getElementById(coverCanvasId);
        this._hiddenMetaCanvas = document.getElementById(hiddenMetaCanvasId);
        this._hiddenCanvas = this._hiddenMetaCanvas.querySelector('canvas');
        this._outputCanvas = document.getElementById(outputCanvasId);
        this._sizeLabel = document.getElementById(sizeLabelId);
        this._hiddenSizeLabel = document.getElementById(hiddenSizeLabelId);
        this._saveLabel = document.getElementById(saveLabelId);

        this._isAddMark = defaultArguments.add_mark;
        this._markRatio = defaultArguments.mark_ratio;

        this._JpegEncoder = new JPEGEncoder(this._compressQuality);
        this._PngEncoder = new PngEncoder();

        this._PngEncoder.onmessage = (event) => {
            if (event.data.success) {
                const link = document.createElement('a');
                link.href = event.data.result.url;
                link.download = event.data.result.fileName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(link.href);
                this._saveLabel.innerText = '保存成功！' + event.data.result.fileName;
            } else {
                alert('编码失败: ' + event.data.error);
                console.log('Failed to encode:', event.data.error.stack, event.data.error.message);
                this._saveLabel.innerText = '保存失败！';
            }
        };
        this._PngEncoder.onerror = (event) => {
            alert('编码失败: ' + event.message);
            console.log('Failed to encode:', event.stack, event.message);
        };

        this._encoder = new Encoder();
        this._encoder.onmessage = (event) => {
            if (!event.data.success) {
                alert('编码器初始化失败: ' + event.data.error);
                console.log('Failed to init encoder:', event.data.error.stack, event.data.error.message);
                return;
            }
        };
        this._encoder.onerror = (event) => {
            alert('编码任务失败: ' + event.message);
            console.log('Failed to encode:', event.stack, event.message);
        };
        this._encoder.postMessage({
            mission: 'init',
            defaultArguments: defaultArguments,
        });
    }

    updateInnerImage = async (img) => {
        this._innerImage = img;

        if (this._mirageSize !== 0) {
            if (this._innerImage.width > this._innerImage.height) {
                this._width = this._mirageSize;
                this._height = Math.ceil((this._innerImage.height * this._mirageSize) / this._innerImage.width);
            } else {
                this._height = this._mirageSize;
                this._width = Math.ceil((this._innerImage.width * this._mirageSize) / this._innerImage.height);
            }
        } else {
            this._width = this._innerImage.width;
            this._height = this._innerImage.height;
        }

        if (this._byteArray) {
            const length = await this._adjustSize();
            CloakUniversal.showSize(this._hiddenMetaCanvas.querySelector('.sizeLabel'), length);
            console.log('Size to be encoded: ' + length);
        }

        this._innerCanvas.width = this._width;
        this._innerCanvas.height = this._height;
        const ctx = this._innerCanvas.getContext('2d');
        ctx.drawImage(img, 0, 0, this._width, this._height);
        this._innerImageData = ctx.getImageData(0, 0, this._width, this._height);
        this._sizeLabel.innerHTML = `输出图像预计尺寸：${this._width}x${this._height}`;

        if (this._version !== 3 && this._version !== 5) {
            this.convertGray(this._innerImageData);
        }
        CloakUniversal.adjustImageData(this._innerCanvas, this._innerImageData, this._innerContrast, this._innerLuminance);
        if (this._version !== 4 && this._version !== 5 && this._isAddMark) {
            this.addMark(this._innerCanvas);
        }
        if (this._coverImageData) {
            this.updateCoverImage(this._coverImage);
        }
    };

    _adjustSize = async () => {
        let currLength = this._width * this._height;
        let tarLength = await this._getRequiredLength(this._version, this._byteArray, this._diff);

        if (tarLength > currLength) {
            // if the hidden file is too large
            let ratio = tarLength / currLength;
            if (this._hiddenFile.type.startsWith('image') && !this._hiddenFile.type.startsWith('image/gif')) {
                // if the hidden file is a static image
                await CloakUniversal.showMetaCanvas(this._hiddenMetaCanvas, this._hiddenUrl, this._fileExtension, this._hiddenFile.size); // repaint the hidden image
                if (this._isCompress) {
                    // if compress is enabled
                    let hiddenImageData = this._hiddenCanvas.getContext('2d').getImageData(0, 0, this._hiddenCanvas.width, this._hiddenCanvas.height);
                    if (hiddenImageData) {
                        // if get image data successfully, try to compress the hidden image by converting it to jpeg
                        let jpegData = this._JpegEncoder.encode(hiddenImageData, this._compressQuality);
                        tarLength = await this._getRequiredLength(this._version, jpegData, this._diff); // get target length after compression
                        ratio = tarLength / currLength;
                        if (ratio > 1) {
                            // if the hidden image is still too large after compression, resize it
                            ratio = Math.sqrt(ratio);
                            await CloakUniversal.showMetaCanvas(this._hiddenMetaCanvas, this._hiddenUrl, this._fileExtension, this._hiddenFile.size, 1 / ratio);
                            hiddenImageData = this._hiddenCanvas.getContext('2d').getImageData(0, 0, this._hiddenCanvas.width, this._hiddenCanvas.height);
                            jpegData = this._JpegEncoder.encode(hiddenImageData, this._compressQuality);

                            tarLength = await this._getRequiredLength(this._version, jpegData, this._diff); // update target length
                            ratio = tarLength / currLength; // update ratio
                            if (ratio > 1) {
                                // if the hidden image is still too large after resizing, scale the size of the inner image
                                this._scaleSize(ratio);
                            }
                        }
                        this._hiddenSizeLabel.innerHTML = `隐藏图像尺寸：${this._hiddenCanvas.width}x${this._hiddenCanvas.height}`;
                        this._byteArrayCompressed = jpegData;
                        this._fileExtensionCompressed = 'jpg'; // change file extension to jpg
                        this._hiddenMetaCanvas.querySelector('.typeLabel').innerText = '里文件类型：image/jpeg';
                        return this._byteArrayCompressed.length;
                    }
                }
                this._hiddenSizeLabel.innerHTML = `隐藏图像尺寸：${this._hiddenCanvas.width}x${this._hiddenCanvas.height}`;
            } else {
                // if the hidden file is not an image, not compressible
                this._hiddenSizeLabel.innerHTML = '';
                this._byteArrayCompressed = null;
                this._fileExtensionCompressed = '';
            }
            this._scaleSize(ratio);
            return this._byteArray.length;
        } else {
            this._byteArrayCompressed = null;
            this._fileExtensionCompressed = '';
            return this._byteArray.length;
        }
    };

    _getRequiredLength = async (version, hiddenFile, diff) => {
        return new Promise((resolve, reject) => {
            this._encoder.onmessage = (event) => {
                if (event.data.success) {
                    resolve(event.data.result);
                } else {
                    reject(event.data.error);
                }
            };
            this._encoder.onerror = (event) => {
                reject(event);
            };
            this._encoder.postMessage({
                mission: 'length',
                version: version,
                hiddenFile: hiddenFile,
                diff: diff,
            });
        });
    };

    _scaleSize = (ratio) => {
        ratio = Math.sqrt(ratio);
        this._width = Math.ceil(this._width * ratio);
        this._height = Math.ceil(this._height * ratio);
    };

    updateCoverImage = (img) => {
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
        if (this._version !== 5) {
            this.convertGray(this._coverImageData);
        }
        CloakUniversal.adjustImageData(this._coverCanvas, this._coverImageData, this._coverContrast, this._coverLuminance);
        if (this._version !== 4 && this._version !== 5 && this._isAddMark) {
            this.addMark(this._coverCanvas);
        }
    };

    updateHiddenFile = async (file) => {
        this._hiddenFile = file;
        this._byteArrayCompressed = null;
        if (this._hiddenUrl) {
            URL.revokeObjectURL(this._hiddenUrl);
        }
        this._hiddenUrl = URL.createObjectURL(file);

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

        await CloakUniversal.showMetaCanvas(this._hiddenMetaCanvas, this._hiddenUrl, this._fileExtension, file.size);
        if (file.type.startsWith('image/') && !file.type.startsWith('image/gif')) {
            this._hiddenSizeLabel.innerHTML = `隐藏图像尺寸: ${this._hiddenCanvas.width}x${this._hiddenCanvas.height}`;
        } else {
            this._hiddenSizeLabel.innerHTML = '';
        }
        await this._getHiddenByteArray();
    };

    _getHiddenByteArray = async () => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async (event) => {
                try {
                    const arrayBuffer = event.target.result;
                    this._byteArray = new Uint8Array(arrayBuffer);
                    if (this._innerImage) {
                        await this.updateInnerImage(this._innerImage);
                    }
                    resolve();
                } catch (error) {
                    reject(error);
                }
            };
            reader.readAsArrayBuffer(this._hiddenFile);
        });
    };

    process = () => {
        if (!this._innerImageData || (this._version !== 3 && !this._coverImageData) || (this._version !== 4 && this._version !== 5 && !this._byteArray)) {
            throw new Error('请先选择图像和文件！');
        }

        const innerImageDataAdjust = this._innerCanvas.getContext('2d').getImageData(0, 0, this._width, this._height);
        const coverImageDataAdjust = this._coverCanvas.getContext('2d').getImageData(0, 0, this._width, this._height);

        console.log('Encoding...');
        console.log('    Version: ' + this._version);
        console.log('    Output size: ' + this._width + 'x' + this._height);
        if (this._byteArray) {
            console.log('    Size to be encoded: ' + (this._isCompress && this._byteArrayCompressed ? this._byteArrayCompressed.length : this._byteArray.length));
            console.log('    File extension: ' + (this._isCompress && this._fileExtensionCompressed ? this._fileExtensionCompressed : this._fileExtension));
            console.log('    Difference: ' + this._diff);
        }

        this._encoder.onmessage = (event) => {
            if (event.data.success) {
                this._outputCanvas.width = this._width;
                this._outputCanvas.height = this._height;
                const imgData = new ImageData(event.data.result, this._width, this._height);
                this._outputCanvas.getContext('2d').putImageData(imgData, 0, 0);
                this._isOutputCanvasCleared = false;
                this._outputData = event.data.result;
                console.log('Encoding finished');
                this._saveLabel.innerText = '编码成功！';
            } else {
                alert('编码失败: ' + event.data.error);
                console.log('Failed to encode:', event.data.error.stack, event.data.error.message);
                this._saveLabel.innerText = '编码失败！';
            }
        };
        this._encoder.onerror = (event) => {
            alert('编码失败: ' + event.message);
            console.log('Failed to encode:', event.stack, event.message);
            this._saveLabel.innerText = '编码失败！';
        };
        this._saveLabel.innerText = '编码中...';
        this._encoder.postMessage({
            mission: 'encode',
            version: this._version,
            innerImageData: innerImageDataAdjust,
            coverImageData: coverImageDataAdjust,
            hiddenFile: this._isCompress && this._byteArrayCompressed ? this._byteArrayCompressed : this._byteArray,
            fileExt: this._isCompress && this._fileExtensionCompressed ? this._fileExtensionCompressed : this._fileExtension,
            diff: this._diff,
        });
    };

    convertGray = (imgData) => {
        const data = imgData.data;
        for (let i = 0; i < data.length; i += 4) {
            const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
            data[i] = gray;
            data[i + 1] = gray;
            data[i + 2] = gray;
        }
    };

    adjustInnerContrast = (contrast) => {
        this._innerContrast = contrast;
        if (this._innerImageData) {
            CloakUniversal.adjustImageData(this._innerCanvas, this._innerImageData, contrast, this._innerLuminance);
            if (this._isAddMark) {
                this.addMark(this._innerCanvas);
            }
        }
    };

    adjustCoverContrast = (contrast) => {
        this._coverContrast = contrast;
        if (this._coverImageData) {
            CloakUniversal.adjustImageData(this._coverCanvas, this._coverImageData, contrast, this._coverLuminance);
            if (this._isAddMark) {
                this.addMark(this._coverCanvas);
            }
        }
    };

    adjustInnerLuminance = (luminance) => {
        this._innerLuminance = luminance;
        if (this._innerImageData) {
            CloakUniversal.adjustImageData(this._innerCanvas, this._innerImageData, this._innerContrast, luminance);
            if (this._isAddMark) {
                this.addMark(this._innerCanvas);
            }
        }
    };

    adjustCoverLuminance = (luminance) => {
        this._coverLuminance = luminance;
        if (this._coverImageData) {
            CloakUniversal.adjustImageData(this._coverCanvas, this._coverImageData, this._coverContrast, luminance);
            if (this._isAddMark) {
                this.addMark(this._coverCanvas);
            }
        }
    };

    saveOutputImage = () => {
        if (!this._outputData) {
            throw new Error('请先处理图像！');
        }
        this._saveLabel.innerText = 'PNG编码中...';
        this._PngEncoder.postMessage({
            width: this._width,
            height: this._height,
            data: this._outputData,
        });
    };

    setIsAddMark = (isAddMark) => {
        this._isAddMark = isAddMark;
        if (this._version === 4 || this._version === 5) {
            return;
        }
        if (isAddMark) {
            if (this._innerImageData) {
                this.addMark(this._innerCanvas);
            }
            if (this._coverImageData) {
                this.addMark(this._coverCanvas);
            }
        } else {
            if (this._innerImageData) {
                CloakUniversal.adjustImageData(this._innerCanvas, this._innerImageData, this._innerContrast, this._innerLuminance);
            }
            if (this._coverImageData) {
                CloakUniversal.adjustImageData(this._coverCanvas, this._coverImageData, this._coverContrast, this._coverLuminance);
            }
        }
    };

    addMark(canvas, markImage) {
        if (this._version === 4 || this._version === 5) {
            return;
        }
        if (!markImage) {
            if (applicationState.markImage) {
                markImage = applicationState.markImage;
            } else {
                return;
            }
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

    setMirageSize = async (size) => {
        this._mirageSize = size;
        if (this._innerImage) {
            await this.updateInnerImage(this._innerImage); // update inner image to adjust size
        }
    };

    setDiff = async (diff, resize = true) => {
        this._diff = diff;
        if (this._version === 4 || this._version === 5) {
            return;
        } // mirage tanks dont need diff
        if (resize === false) {
            return;
        }
        if ((this._version === 0 || this._version === 3) && this._byteArray && this._innerImage) {
            await this.updateInnerImage(this._innerImage); // only when using LSB diff can affect the required size
        }
    };

    setVersion = async (version) => {
        this._version = version;
        if (this._innerImage) {
            await this.updateInnerImage(this._innerImage); // update inner image to adjust size
        }
    };

    setIsCompress = async (isCompress) => {
        this._isCompress = isCompress;
        if (this._version !== 4 && this._version !== 5 && this._byteArray && this._innerImage) {
            await this.updateInnerImage(this._innerImage); // update inner image to adjust size
        }
    };

    clearOutputCanvas = () => {
        if (!this._isOutputCanvasCleared) {
            CloakUniversal.clearCanvas(this._outputCanvas);
            this._isOutputCanvasCleared = true;
            this._outputData = null;
            this._saveLabel.innerText = '';
        }
    };
}

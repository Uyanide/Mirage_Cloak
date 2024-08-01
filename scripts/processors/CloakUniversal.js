export default class CloakUniversal {
    constructor(defaultArguments) {
        this._threshold = defaultArguments.threshold;
        this._remained = defaultArguments.remained;
        this._version = defaultArguments.version;
        this._diff = defaultArguments.difference;
        this._padding = defaultArguments.padding;
        this._scale_i = defaultArguments.scale_inner;
        this._scale_c = defaultArguments.scale_cover;
        this._offset_i = defaultArguments.offset_inner;
        this._offset_c = defaultArguments.offset_cover;
        console.log(this._scale_i, this._scale_c, this._offset_i, this._offset_c);
    }

    classifyFileType = (extension) => {
        switch (extension) {
            case 'png':
                return 'image/png';
            case 'jpg':
            case 'jpeg':
                return 'image/jpeg';
            case 'gif':
                return 'image/gif';
            case 'bmp':
                return 'image/bmp';
            default:
                return 'application/octet-stream';
        }
    }

    showResult(canvas, dataUrl, fileExtention) {
        switch (fileExtention) {
            case 'png':
            case 'jpg':
            case 'jpeg':
            case 'bmp':
                const img = new Image();
                img.onload = () => {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    canvas.getContext('2d').drawImage(img, 0, 0);
                };
                img.src = dataUrl;
            default:
                this.showTextOnCanvas(canvas, '暂不支持预览此文件', '文件拓展名: ' + fileExtention);
        }
    }

    showTextOnCanvas(canvas, text = '暂不支持预览此文件', additionalText = '') {
        canvas.width = 300;
        canvas.height = 150;
        const ctx = canvas.getContext('2d');
        ctx.font = '15px Microsoft Yahei';
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--front-color');
        ctx.textAlign = 'center';
        if (!additionalText) {
            ctx.fillText(text, canvas.width / 2, canvas.height / 2);
        }
        else {
            ctx.fillText(text, canvas.width / 2, canvas.height / 2 - 10);
            ctx.fillText(additionalText, canvas.width / 2, canvas.height / 2 + 10)
        }
    }

    cloneImageData(imageData) {
        return new ImageData(new Uint8ClampedArray(imageData.data), imageData.width, imageData.height);
    }

    truncate(value) {
        return Math.min(255, Math.max(0, value));
    }
    adjustContrastImgData(imageData, contrast) {
        contrast = (contrast - 50) * 5.1;
        const data = imageData.data;
        const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));

        for (let i = 0; i < data.length; i += 4) {
            data[i] = this.truncate(factor * (data[i] - 128) + 128);
            data[i + 1] = this.truncate(factor * (data[i + 1] - 128) + 128);
            data[i + 2] = this.truncate(factor * (data[i + 2] - 128) + 128);
        }
    }

    saveResultFromUrl(dataUrl, fileExtension) {
        const timestamp = new Date().getTime();
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `decoded_${timestamp}.${fileExtension}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

errorHandling.scriptsLoaded.CloakUniversal = true;
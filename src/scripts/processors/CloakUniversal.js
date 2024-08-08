const mimeTypes = {
    'html': 'text/html',
    'css': 'text/css',
    'png': 'image/png',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'bmp': 'image/bmp',
    'webp': 'image/webp',
    'mp3': 'audio/mpeg',
    'wav': 'audio/wav',
    'ogg': 'audio/ogg',
    'mp4': 'video/mp4',
    'webm': 'video/webm',
    'flv': 'video/x-flv',
    'gif': 'image/gif',
    'svg': 'image/svg+xml',
    'pdf': 'application/pdf',
    'txt': 'text/plain'
};

export class CloakUniversal {
    constructor(defaultArguments) { }

    static classifyFileType = (extension) => {
        if (mimeTypes.hasOwnProperty(extension)) {
            return mimeTypes[extension];
        } else {
            return 'application/octet-stream';
        }
    }

    showTextOnCanvas(canvas, text = '暂不支持预览此文件', additionalText = '') {
        this.clearCanvas(canvas);
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
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
        let ret = new ImageData(new Uint8ClampedArray(imageData.data), imageData.width, imageData.height);
        console.log(ret);
        console.log(ret.data);
        console.log(imageData.data);
        return ret;
    }

    truncate(value) {
        return Math.min(255, Math.max(0, value));
    }

    adjustImageData(canvas, imageData, contrast, luminance) {
        let data = new Uint8ClampedArray(imageData.data.length);
        const oldData = imageData.data;

        contrast = (contrast - 50) * 5.1;
        const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
        const offset = luminance * 3 - 150;

        for (let i = 0; i < data.length; i += 4) {
            data[i] = this.truncate(factor * (oldData[i] - 128) + 128 + offset);
            data[i + 1] = this.truncate(factor * (oldData[i + 1] - 128) + 128 + offset);
            data[i + 2] = this.truncate(factor * (oldData[i + 2] - 128) + 128 + offset);
            data[i + 3] = 255;
        }

        const newImageData = new ImageData(data, imageData.width, imageData.height);
        canvas.width = newImageData.width;
        canvas.height = newImageData.height;
        canvas.getContext('2d').putImageData(newImageData, 0, 0);
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

    clearCanvas(canvas) {
        canvas.width = 300;
        canvas.height = 150;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    getImageDataFromImage(image) {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);
        return ctx.getImageData(0, 0, image.width, image.height);
    }
}
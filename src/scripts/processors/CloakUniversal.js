import { ext2mime } from './MimeMap.js';

export class CloakUniversal {
    constructor(defaultArguments) {}

    static classifyFileType = (extension) => {
        return ext2mime[extension] || 'application/octet-stream';
    };

    static showTextOnMetaCanvas(metaCanvas, text = '暂不支持预览此文件', additionalText = '') {
        CloakUniversal.clearMetaCanvas(metaCanvas);
        const canvas = metaCanvas.querySelector('canvas');
        const ctx = canvas.getContext('2d');
        ctx.font = '15px Microsoft Yahei';
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--front-color');
        ctx.textAlign = 'center';
        if (!additionalText) {
            ctx.fillText(text, canvas.width / 2, canvas.height / 2);
        } else {
            ctx.fillText(text, canvas.width / 2, canvas.height / 2 - 10);
            ctx.fillText(additionalText, canvas.width / 2, canvas.height / 2 + 10);
        }
    }

    static cloneImageData(imageData) {
        let ret = new ImageData(new Uint8ClampedArray(imageData.data), imageData.width, imageData.height);
        console.log(ret);
        console.log(ret.data);
        console.log(imageData.data);
        return ret;
    }

    static truncate(value) {
        return Math.min(255, Math.max(0, value));
    }

    static adjustImageData(canvas, imageData, contrast, luminance) {
        let data = new Uint8ClampedArray(imageData.data.length);
        const oldData = imageData.data;

        contrast = (contrast - 50) * 5.1;
        const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
        const offset = luminance * 3 - 150;

        for (let i = 0; i < data.length; i += 4) {
            data[i] = CloakUniversal.truncate(factor * (oldData[i] - 128) + 128 + offset);
            data[i + 1] = CloakUniversal.truncate(factor * (oldData[i + 1] - 128) + 128 + offset);
            data[i + 2] = CloakUniversal.truncate(factor * (oldData[i + 2] - 128) + 128 + offset);
            data[i + 3] = 255;
        }

        const newImageData = new ImageData(data, imageData.width, imageData.height);
        canvas.width = newImageData.width;
        canvas.height = newImageData.height;
        canvas.getContext('2d').putImageData(newImageData, 0, 0);
    }

    static saveResultFromUrl(dataUrl, fileExtension) {
        const timestamp = new Date().getTime();
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `decoded_${timestamp}.${fileExtension}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    static clearMetaCanvas(metaCanvas) {
        metaCanvas.querySelector('.sizeLabel').innerText = '';
        metaCanvas.querySelector('.typeLabel').innerText = '';
        for (let displayer of metaCanvas.querySelectorAll('canvas, video, audio')) {
            displayer.classList.remove('displayFlex');
        }

        const canvas = metaCanvas.querySelector('canvas');
        canvas.classList.add('displayFlex');
        CloakUniversal.clearCanvas(canvas);

        for (let displayer of metaCanvas.querySelectorAll('video, audio')) {
            if (displayer.src) {
                displayer.pause();
                displayer.currentTime = 0;
                displayer.src = '';
            }
        }
    }

    static getImageDataFromImageCanvas(image) {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);
        return ctx.getImageData(0, 0, image.width, image.height);
    }

    static async showMetaCanvas(metaCanvas, url, fileExt, length, scale = 1) {
        return new Promise((resolve, reject) => {
            const type = CloakUniversal.classifyFileType(fileExt);

            const displayers = [metaCanvas.querySelector('canvas'), metaCanvas.querySelector('video'), metaCanvas.querySelector('audio')];
            displayers.forEach((displayer) => {
                displayer.classList.remove('displayFlex');
            });

            switch (type.slice(0, 5)) {
                case 'image':
                    const img = new Image();
                    img.onload = () => {
                        displayers[0].width = img.width * scale;
                        displayers[0].height = img.height * scale;
                        displayers[0].getContext('2d').drawImage(img, 0, 0, img.width * scale, img.height * scale);
                        displayers[0].classList.add('displayFlex');
                        resolve();
                    };
                    img.src = url;
                    break;
                case 'video':
                    displayers[1].src = url;
                    displayers[1].classList.add('displayFlex');
                    resolve();
                    break;
                case 'audio':
                    displayers[2].src = url;
                    displayers[2].classList.add('displayFlex');
                    resolve();
                    break;
                default:
                    CloakUniversal.showTextOnMetaCanvas(metaCanvas, '暂不支持预览此文件', '文件类型：' + type);
                    resolve();
                    break;
            }

            CloakUniversal.showSize(metaCanvas.querySelector('.sizeLabel'), length);

            const typeLabel = metaCanvas.querySelector('.typeLabel');
            typeLabel.innerText = '里文件类型：' + type;
        });
    }

    static showSize(sizeLabel, length) {
        sizeLabel.innerText =
            '里文件大小：' +
            ((length) => {
                if (length >= 0x100000) {
                    return (length / 0x100000).toFixed(2) + ' MB';
                } else if (length > 0x400) {
                    return (length / 0x400).toFixed(2) + ' KB';
                } else {
                    return length + ' B';
                }
            })(length);
    }

    static clearCanvas = (canvas) => {
        canvas.width = 300;
        canvas.height = 150;
    };
}

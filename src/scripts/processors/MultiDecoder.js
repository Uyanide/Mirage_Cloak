import { UniversalListeners } from "../listeners/UniversalListeners";

export class MultiDecoder {
    constructor(defaultArguments, inputCanvasId, outputCanvasId, sizeLabelId, sidebarContentId, sidebarAmountLabelId) {
        import('./CloakDecoder.js').then(module => {
            this._decoder = new module.CloakDecoder(defaultArguments, inputCanvasId, outputCanvasId, sizeLabelId);
        }).catch(error => {
            console.error('Failed to load CloakDecoder:', error);
            alert('加载解码器失败，请刷新页面重试。');
        });

        this._sidebarContent = document.getElementById(sidebarContentId);
        this._sidebarAmountLabel = document.getElementById(sidebarAmountLabelId);

        this._fileList = [];
    }

    appendQueue = async (file) => {
        return new Promise((resolve, reject) => {
            if (!file.type.startsWith('image')) reject(new Error('请选择图片文件'));
            this._fileList.push({ src: file, status: 'pending', image: null, url: null, fileExt: null, length: null });
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.id = 'queue' + (this._fileList.length - 1);
                canvas.addEventListener('click', this.decode);
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                this._sidebarContent.appendChild(canvas);
                this._fileList[this._fileList.length - 1].image = img;
                resolve();
            };
            img.onerror = () => {
                console.error('Error loading image');
                URL.revokeObjectURL(img.src);
                this._fileList.pop();
                reject(new Error('图片加载失败'));
            };
            img.src = URL.createObjectURL(file);
        });
    }

    decode = async (event) => {
        if (applicationState.currPageId !== 'decodePage') {
            UniversalListeners.switchPage();
        }
        try {
            const index = parseInt(event.target.id.slice(5));
            if (this._selected !== undefined) {
                const prev = document.getElementById('queue' + this._selected);
                if (prev) {
                    prev.classList.remove('canvasSelected');
                }
            }
            event.target.classList.add('canvasSelected');
            this._selected = index;
            let color = '#00FF00';
            let retError = null;
            await this.processSingle(index).catch((error) => {
                color = '#FF0000';
                retError = error;
            });
            this.showCornerStatus(event.target, color);
            if (retError) {
                throw retError;
            }
        } catch (error) {
            alert('图像处理失败：' + error.message);
        }
    }

    showCornerStatus = (canvas, color) => {
        const offset = Math.min(canvas.width, canvas.height) / 10;
        const ctx = canvas.getContext('2d');
        // 画圆
        const centerX = canvas.width - offset / 2;
        const centerY = canvas.height - offset / 2;
        const radius = offset * 0.4;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = color;
        ctx.fill();
    }

    processSingle = async (index) => {
        return new Promise((resolve, reject) => {
            (async () => {
                switch (this._fileList[index].status) {
                    case 'pending':
                        await this._decoder.updateImage(this._fileList[index].src, this._fileList[index].image).catch((error) => {
                            this._fileList[index].status = 'failed';
                            reject(error);
                        });
                        const result = this._decoder.getResult();
                        if (result) {
                            this._fileList[index].status = 'decoded';
                            this._fileList[index].url = result.url;
                            this._fileList[index].fileExt = result.fileExt;
                            this._fileList[index].length = result.length;
                            resolve();
                        } else {
                            this._fileList[index].status = 'failed';
                            reject(new Error('Invalid result'));
                        }
                        break;
                    case 'decoded':
                        await this._decoder.updateImage(null, this._fileList[index].image, this._fileList[index].url, this._fileList[index].fileExt, this._fileList[index].length).catch((error) => {
                            reject(error);
                        });
                        break;
                    case 'failed':
                        await this._decoder.updateImage(null, this._fileList[index].image, 'failed', null, null).catch((error) => {
                            reject(error);
                        });
                        break;
                    default:
                        reject(new Error('Invalid status'));
                }
            })();
        });
    }

    clearQueue = () => {
        for (let i = 0; i < this._fileList.length; i++) {
            this._sidebarContent.removeChild(document.getElementById('queue' + i));
            if (this._fileList[i].image) {
                URL.revokeObjectURL(this._fileList[i].image.src);
            }
            if (this._fileList[i].url) {
                URL.revokeObjectURL(this._fileList[i].url);
            }
        }
        this._fileList = [];
        this._sidebarAmountLabel.innerText = '数量：0';
    }

    saveCurrResult = () => {
        try {
            this._decoder.saveResult();
        } catch (error) {
            alert('保存失败：' + error.message);
        }
    }

    saveAllResults = async () => {
        try {
            let successed = 0, failed = 0;
            for (let i = 0; i < this._fileList.length; i++) {
                switch (this._fileList[i].status) {
                    case 'failed':
                        failed++;
                        break;
                    case 'pending':
                        let flag = false;
                        await this.processSingle(i).catch(() => {
                            failed++;
                            flag = true;
                        });
                        if (flag) {
                            this.showCornerStatus(document.getElementById('queue' + i), '#FF0000');
                            break;
                        } else {
                            this.showCornerStatus(document.getElementById('queue' + i), '#00FF00');
                            /*fall through*/
                        }
                    case 'decoded':
                        const link = document.createElement('a');
                        link.href = this._fileList[i].url;
                        link.download = `decoded_${new Date().getTime()}.${this._fileList[i].fileExt}`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        successed++;
                        await new Promise(resolve => setTimeout(resolve, 500));
                        break;
                    default:
                        throw new Error('Invalid status');
                }
            }
            this._sidebarAmountLabel.innerHTML = `数量：${this._fileList.length}<br>成功：${successed}<br>失败：${failed}`;
        } catch (error) {
            alert('保存失败：' + error.message);
        }
    }
}
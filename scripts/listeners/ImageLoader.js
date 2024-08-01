/*
        copyImage: copyImage,
        updateImageFromFile: updateImageFromFile,
        updateImageFromURL: updateImageFromURL,
        updateImageFromClipboard: updateImageFromClipboard,
        updateImageFromClipboardDirect: updateImageFromClipboardDirect,
        dragDropLoadImage: dragDropLoadImage,
        switchPage: switchPage,
*/

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.ImageLoader = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {
    function copyImage(img) {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const url = canvas.toDataURL();
        canvas.remove();
        return url;
    }

    applicationState.currCanvasIndex = 0;
    function handleImageLoadError(error, callback) {
        alert('图像处理失败！' + error);
        // if (errorHandling.defaultImg[errorHandling.currCanvasIndex].src) {
        //     const img = new Image();
        //     img.src = copyImage(errorHandling.defaultImg[errorHandling.currCanvasIndex]);
        //     img.onload = () => {
        //         callback(img);
        //     };
        // }
    }

    function convertBlobToBase64(blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.onerror = (error) => {
                reject(error);
            };
            reader.readAsDataURL(blob);
        });
    }

    // 从源加载图像并返回
    async function loadImage(input, timeout = 5000) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            let timer;

            img.onload = () => {
                clearTimeout(timer);
                resolve(img);
            };

            img.onerror = (error) => {
                clearTimeout(timer);
                reject(error);
            };

            timer = setTimeout(() => {
                img.src = '';
                reject(new Error('加载图像超时'));
            }, timeout);

            if (typeof input === 'string') {
                img.crossOrigin = 'anonymous';
                img.src = input;
            } else if (input instanceof File) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    img.src = e.target.result;
                };
                reader.onerror = (error) => {
                    clearTimeout(timer);
                    reject(error);
                };
                reader.readAsDataURL(input);
            } else {
                clearTimeout(timer);
                reject(new Error('不支持的输入类型'));
            }
        });
    }

    // 从文件加载图像，调用callback
    async function updateImageFromFile(file, callback) {
        loadImage(file).then((img) => {
            callback(img);
        }).catch((error) => {
            handleImageLoadError(error, callback);
        });
    }

    // 从URL加载图像，调用callback
    async function updateImageFromURL(event, callback) {
        const imageUrl = event.target.previousElementSibling.value;
        loadImage(imageUrl).then((img) => {
            callback(img);
        }).catch((error) => {
            handleImageLoadError(error, callback);
        });
    }

    // 从剪贴板更新图像，调用callback
    async function updateImageFromClipboard(event, callback) {
        const items = (event.clipboardData || event.originalEvent.clipboardData).items;
        for (const item of items) {
            if (item.type.indexOf('image') !== -1) {
                const blob = item.getAsFile();
                loadImage(blob).then((img) => {
                    callback(img);
                }).catch((error) => {
                    handleImageLoadError(error, callback);
                });
            }
        }
    }

    // 直接从剪贴板更新图像，调用callback
    async function updateImageFromClipboardDirect(callback) {
        try {
            const permission = await navigator.permissions.query({ name: 'clipboard-read' });
            if (permission.state === 'granted' || permission.state === 'prompt') {
                const clipboardItems = await navigator.clipboard.read();
                for (const item of clipboardItems) {
                    if (item.types.some(type => type.startsWith('image/'))) {
                        const blob = await item.getType(item.types.find(type => type.startsWith('image/')));
                        const url = await convertBlobToBase64(blob);
                        loadImage(url).then((img) => {
                            callback(img);
                        }).catch((error) => {
                            throw error;
                        });
                    } else {
                        alert('剪贴板中没有图片');
                    }
                }
            } else {
                alert('没有剪贴板读取权限');
            }
        } catch (error) {
            handleImageLoadError(error, callback);
        }
    }

    // 拖动文件加载图像
    async function dragDropLoadImage(event, callback) {
        event.preventDefault();
        if (event.dataTransfer.items) {
            for (const item of event.dataTransfer.items) {
                if (item.kind === 'file') {
                    const file = item.getAsFile();
                    loadImage(file).then((img) => {
                        callback(img);
                    }).catch((error) => {
                        handleImageLoadError(error, callback);
                    });
                }
            }
        }
    }

    const ImageLoader = {
        copyImage: copyImage,
        updateImageFromFile: updateImageFromFile,
        updateImageFromURL: updateImageFromURL,
        updateImageFromClipboard: updateImageFromClipboard,
        updateImageFromClipboardDirect: updateImageFromClipboardDirect,
        dragDropLoadImage: dragDropLoadImage,
    };

    return ImageLoader;
}));
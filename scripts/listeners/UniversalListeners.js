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
    if (errorHandling.defaultImg[errorHandling.currCanvasIndex].src) {
        const img = new Image();
        img.src = copyImage(errorHandling.defaultImg[errorHandling.currCanvasIndex]);
        img.onload = () => {
            callback(img);
        };
    }
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

// 切换页面显示
function switchPage() {
    var decodePage = document.getElementById('decodePage');
    var encodePage = document.getElementById('encodePage');
    var decodeButton = document.getElementById('decodeButton');
    var encodeButton = document.getElementById('encodeButton');
    if (applicationState.currPageId === 'decodePage') {
        encodePage.classList.remove('displayNone');
        encodePage.classList.add('displayFlex');
        decodePage.classList.remove('displayFlex');
        decodePage.classList.add('displayNone');
        decodeButton.classList.remove('backgroundSecondary');
        decodeButton.classList.add('backgroundNotSelected');
        encodeButton.classList.remove('backgroundNotSelected');
        encodeButton.classList.add('backgroundSecondary');
        decodeRemoveEventListeners();
        encodeSetUpEventListeners();
        applicationState.currPageId = 'encodePage';
    } else {
        decodePage.classList.remove('displayNone');
        decodePage.classList.add('displayFlex');
        encodePage.classList.remove('displayFlex');
        encodePage.classList.add('displayNone');
        decodeButton.classList.remove('backgroundNotSelected');
        decodeButton.classList.add('backgroundSecondary');
        encodeButton.classList.remove('backgroundSecondary');
        encodeButton.classList.add('backgroundNotSelected');
        decodeSetupEventListeners();
        encodeRemoveEventListeners();
        applicationState.currPageId = 'decodePage';
    }
}

function universalSetupEventListeners() {
    // 隐私政策按钮事件监听
    document.getElementById('togglePrivacyPolicy').addEventListener('click', (event) => {
        const privacyPolicy = document.getElementById('privacyPolicy');
        const state = window.getComputedStyle(privacyPolicy).display;
        if (state === 'none') {
            privacyPolicy.style.display = 'block';
            event.target.textContent = '隐藏使用须知';
            window.scrollTo(0, document.body.scrollHeight);
        } else {
            privacyPolicy.style.display = 'none';
            event.target.textContent = '显示使用须知';
        }
    });

    // 版本记录按钮事件监听
    document.getElementById('toggleVersionRecord').addEventListener('click', (event) => {
        const changelog = document.getElementById('versionRecordTable');
        const state = window.getComputedStyle(changelog).display;
        if (state === 'none') {
            changelog.style.display = 'block';
            event.target.textContent = '隐藏主要更新记录';
            window.scrollTo(0, document.body.scrollHeight);
        } else {
            changelog.style.display = 'none';
            event.target.textContent = '显示主要更新记录';
        }
    });

    // 禁用拖动默认事件
    document.addEventListener('dragover', (event) => {
        event.preventDefault();
    });

    // 切换明暗模式
    document.getElementById('isDarkmodeCheckbox').addEventListener('change', (event) => {
        const theme = event.target.checked ? 'dark' : 'light';
        applyTheme(theme);
    });
}

errorHandling.scriptsLoaded.UniversalListeners = true;
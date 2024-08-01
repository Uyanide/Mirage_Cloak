// 设置是否读取元数据
function setReadMetadata(event) {
    applicationState.isReadMetadata = event.target.checked;
}

// 从文件加载图像
function decodeLoadImageFile(event) {
    const file = event.target.files[0];
    errorHandling.currCanvasIndex = 0;
    updateImageFromFile(file, (img) => {
        CloakProcessor.CloakDecoder.updateImage(img);
    });
    event.target.value = '';
}

// 从URL加载图像
function decodeLoadImageURL(event) {
    errorHandling.currCanvasIndex = 0;
    updateImageFromURL(event, (img) => {
        CloakProcessor.CloakDecoder.updateImage(img);
    });
    event.target.previousElementSibling.value = '';
}

// 从剪贴板加载图像
function decodeLoadImageFromClipboard(event) {
    errorHandling.currCanvasIndex = 0;
    updateImageFromClipboard(event, (img) => {
        CloakProcessor.CloakDecoder.updateImage(img);
    });
}

// 从粘贴按钮加载图像
function decodeLoadImageFromPasteButton() {
    errorHandling.currCanvasIndex = 0;
    document.body.focus();
    const pasteEvent = new ClipboardEvent('paste');
    updateImageFromClipboardDirect((img) => {
        CloakProcessor.CloakDecoder.updateImage(img);
    });
}

// 从拖动加载图像
function decodeLoadImageFromDrag(event) {
    errorHandling.currCanvasIndex = 0;
    dragDropLoadImage(event, (img) => {
        CloakProcessor.CloakDecoder.updateImage(img);
    });
}

// 解码图像
function decodeProcess() {
    try {
        CloakProcessor.CloakDecoder.process();
    } catch (error) {
        alert(error.message);
    }
}

// 保存图像
function decodeSaveFile() {
    try {
        CloakProcessor.CloakDecoder.saveResult();
    } catch (error) {
        alert(error.message);
    }
}

// 设置解码事件监听器
function decodeSetupEventListeners() {
    // 图像加载事件监听
    document.getElementById('decodeImageFileInput').addEventListener('change', decodeLoadImageFile);
    document.getElementById('decodeLoadImageButton').addEventListener('click', decodeLoadImageURL);

    // document.getElementById('decodeProcessButton').addEventListener('click', decodeProcess);
    if (!applicationState.isOnPhone) {
        window.addEventListener('paste', decodeLoadImageFromClipboard);
        document.body.addEventListener('drop', decodeLoadImageFromDrag);
    } else {
        document.getElementById('decodePasteButtonInput').addEventListener('click', decodeLoadImageFromPasteButton);
    }
    document.getElementById('decodeSaveButton').addEventListener('click', decodeSaveFile);
    // 切换页面
    document.getElementById('encodeButton').addEventListener('click', switchPage);
}

// 移除解码事件监听器
function decodeRemoveEventListeners() {
    document.getElementById('decodeImageFileInput').removeEventListener('change', decodeLoadImageFile);
    document.getElementById('decodeLoadImageButton').removeEventListener('click', decodeLoadImageURL);
    // document.getElementById('decodeProcessButton').removeEventListener('click', decodeProcess);
    if (!applicationState.isOnPhone) {
        window.removeEventListener('paste', decodeLoadImageFromClipboard);
        document.body.removeEventListener('drop', decodeLoadImageFromDrag);
    } else {
        document.getElementById('decodePasteButtonInput').removeEventListener('click', decodeLoadImageFromPasteButton);
    }
    document.getElementById('decodeSaveButton').removeEventListener('click', decodeSaveFile);
    document.getElementById('encodeButton').removeEventListener('click', switchPage);
}

errorHandling.scriptsLoaded.DecodeListeners = true;
import { ImageLoader } from './ImageLoader.js';

// 从文件加载图像
function decodeLoadImageFile(event) {
    const file = event.target.files[0];
    errorHandling.currCanvasIndex = 0;
    ImageLoader.updateImageFromFile(file,
        CloakProcessor.CloakDecoder.updateImage,
        true);
    event.target.value = '';
}

// 从剪贴板加载图像
function decodeLoadImageFromClipboard(event) {
    errorHandling.currCanvasIndex = 0;
    ImageLoader.updateImageFromClipboard(event,
        CloakProcessor.CloakDecoder.updateImage,
        true);
}

// 从粘贴按钮加载图像
function decodeLoadImageFromPasteButton() {
    errorHandling.currCanvasIndex = 0;
    document.body.focus();
    const pasteEvent = new ClipboardEvent('paste');
    ImageLoader.updateImageFromClipboardDirect(
        CloakProcessor.CloakDecoder.updateImage,
        true);
}

// 从拖动加载图像
function decodeLoadImageFromDrag(event) {
    errorHandling.currCanvasIndex = 0;
    ImageLoader.dragDropLoadImage(event,
        CloakProcessor.CloakDecoder.updateImage,
        true);
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

    // document.getElementById('decodeProcessButton').addEventListener('click', decodeProcess);
    if (!applicationState.isOnPhone) {
        window.addEventListener('paste', decodeLoadImageFromClipboard);
        document.body.addEventListener('drop', decodeLoadImageFromDrag);
    } else {
        document.getElementById('decodePasteButtonInput').addEventListener('click', decodeLoadImageFromPasteButton);
    }
    document.getElementById('decodeSaveButton').addEventListener('click', decodeSaveFile);
}

// 移除解码事件监听器
function decodeRemoveEventListeners() {
    document.getElementById('decodeImageFileInput').removeEventListener('change', decodeLoadImageFile);
    // document.getElementById('decodeProcessButton').removeEventListener('click', decodeProcess);
    if (!applicationState.isOnPhone) {
        window.removeEventListener('paste', decodeLoadImageFromClipboard);
        document.body.removeEventListener('drop', decodeLoadImageFromDrag);
    } else {
        document.getElementById('decodePasteButtonInput').removeEventListener('click', decodeLoadImageFromPasteButton);
    }
    document.getElementById('decodeSaveButton').removeEventListener('click', decodeSaveFile);
}

const DecodeListeners = {
    decodeSetupEventListeners,
    decodeRemoveEventListeners,
};

export { DecodeListeners };

errorHandling.scriptsLoaded.DecodeListeners = true;
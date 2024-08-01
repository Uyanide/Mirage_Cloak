// 从文件加载里图
function encodeLoadInnerImageFile(event) {
    errorHandling.currCanvasIndex = 1;
    const file = event.target.files[0];
    updateImageFromFile(file, (img) => {
        CloakProcessor.CloakEncoder.updateInnerImage(img);
    });
    event.target.value = '';
}

// 从文件加载表图
function encodeLoadCoverImageFile(event) {
    errorHandling.currCanvasIndex = 2;
    const file = event.target.files[0];
    updateImageFromFile(file, (img) => {
        CloakProcessor.CloakEncoder.updateCoverImage(img);
    });
    event.target.value = '';
}

// 从文件加载隐藏文件
function encodeLoadHiddenFile(event) {
    CloakProcessor.CloakEncoder.updateHiddenFile(event.target.files[0]);
}

// 从拖动加载里图
function encodeLoadInnerImageFromDrag(event) {
    errorHandling.currCanvasIndex = 1;
    dragDropLoadImage(event, (img) => {
        CloakProcessor.CloakEncoder.updateInnerImage(img);
    });
}

// 从拖动加载表图
function encodeLoadCoverImageFromDrag(event) {
    errorHandling.currCanvasIndex = 2;
    dragDropLoadImage(event, (img) => {
        CloakProcessor.CloakEncoder.updateCoverImage(img);
    });
}

// 从拖动加载隐藏文件
function encodeLoadHiddenFileFromDrag(event) {
    event.preventDefault();
    CloakProcessor.CloakEncoder.updateHiddenFile(event.dataTransfer.files[0]);
}

// 设置里图对比度
function encodeSetInnerContrast(event) {
    CloakProcessor.CloakEncoder.adjustInnerContrast(parseInt(event.target.value, 10));
}

// 重置里图对比度
function resetInnerContrast() {
    CloakProcessor.CloakEncoder.innerContrast = 50;
    document.getElementById('innerContrastRange').value = 50;
    CloakProcessor.CloakEncoder.adjustInnerContrast(50);
}

// 设置表图对比度
function encodeSetCoverContrast(event) {
    CloakProcessor.CloakEncoder.adjustCoverContrast(parseInt(event.target.value, 10));
}

// 重置表图对比度
function resetCoverContrast() {
    CloakProcessor.CloakEncoder.coverContrast = 50;
    document.getElementById('coverContrastRange').value = 50;
    CloakProcessor.CloakEncoder.adjustCoverContrast(50);
}

// 处理图像
function encodeProcessImage() {
    try {
        CloakProcessor.CloakEncoder.process();
    } catch (error) {
        alert(error);
    }
}

// 保存图像
function encodeSaveImage() {
    try {
        CloakProcessor.CloakEncoder.saveOutputImage();
    } catch (error) {
        alert(error);
    }
}

// 设置编码事件监听器
function encodeSetUpEventListeners() {

    document.getElementById('decodeButton').addEventListener('click', switchPage);

    document.getElementById('innerSourceFileInput').addEventListener('change', encodeLoadInnerImageFile);
    document.getElementById('coverSourceFileInput').addEventListener('change', encodeLoadCoverImageFile);
    document.getElementById('hiddenSourceFileInput').addEventListener('change', encodeLoadHiddenFile);
    if (!applicationState.isOnPhone) {
        document.getElementById('innerCanvas').addEventListener('drop', encodeLoadInnerImageFromDrag);
        document.getElementById('coverCanvas').addEventListener('drop', encodeLoadCoverImageFromDrag);
        document.getElementById('hiddenCanvas').addEventListener('drop', encodeLoadHiddenFileFromDrag);
    }
    document.getElementById('innerContrastRange').addEventListener('input', encodeSetInnerContrast);
    document.getElementById('coverContrastRange').addEventListener('input', encodeSetCoverContrast);
    document.getElementById('innerResetContrastButton').addEventListener('click', resetInnerContrast);
    document.getElementById('coverResetContrastButton').addEventListener('click', resetCoverContrast);
    document.getElementById('encodeProcessButton').addEventListener('click', encodeProcessImage);
    document.getElementById('encodeSaveButton').addEventListener('click', encodeSaveImage);
}

// 移除编码事件监听器
function encodeRemoveEventListeners() {
    document.getElementById('decodeButton').removeEventListener('click', switchPage);
    document.getElementById('innerSourceFileInput').removeEventListener('change', encodeLoadInnerImageFile);
    document.getElementById('coverSourceFileInput').removeEventListener('change', encodeLoadCoverImageFile);
    document.getElementById('hiddenSourceFileInput').removeEventListener('change', encodeLoadHiddenFile);
    if (!applicationState.isOnPhone) {
        document.getElementById('innerCanvas').removeEventListener('drop', encodeLoadInnerImageFromDrag);
        document.getElementById('coverCanvas').removeEventListener('drop', encodeLoadCoverImageFromDrag);
        document.getElementById('hiddenCanvas').removeEventListener('drop', encodeLoadHiddenFileFromDrag);
    }
    document.getElementById('innerContrastRange').removeEventListener('input', encodeSetInnerContrast);
    document.getElementById('coverContrastRange').removeEventListener('input', encodeSetCoverContrast);
    document.getElementById('innerResetContrastButton').removeEventListener('click', resetInnerContrast);
    document.getElementById('coverResetContrastButton').removeEventListener('click', resetCoverContrast);
    document.getElementById('encodeProcessButton').removeEventListener('click', encodeProcessImage);
    document.getElementById('encodeSaveButton').removeEventListener('click', encodeSaveImage);
}

errorHandling.scriptsLoaded.EncodeListeners = true;
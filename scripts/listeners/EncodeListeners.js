(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['/scripts/listeners/ImageLoader.js'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('/scripts/listeners/ImageLoader.js'));
    } else {
        root.EncodeListeners = factory(root.ImageLoader);
    }
}(typeof self !== 'undefined' ? self : this, function (ImageLoader) {

    // 从文件加载里图
    function encodeLoadInnerImageFile(event) {
        errorHandling.currCanvasIndex = 1;
        const file = event.target.files[0];
        ImageLoader.updateImageFromFile(file, (img) => {
            CloakProcessor.CloakEncoder.updateInnerImage(img);
        });
        event.target.value = '';
    }

    // 从文件加载表图
    function encodeLoadCoverImageFile(event) {
        errorHandling.currCanvasIndex = 2;
        const file = event.target.files[0];
        ImageLoader.updateImageFromFile(file, (img) => {
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
        ImageLoader.dragDropLoadImage(event, (img) => {
            CloakProcessor.CloakEncoder.updateInnerImage(img);
        });
    }

    // 从拖动加载表图
    function encodeLoadCoverImageFromDrag(event) {
        errorHandling.currCanvasIndex = 2;
        ImageLoader.dragDropLoadImage(event, (img) => {
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
        document.getElementById('innerContrastRange').value = 50;
        CloakProcessor.CloakEncoder.adjustInnerContrast(50);
    }

    // 设置表图对比度
    function encodeSetCoverContrast(event) {
        CloakProcessor.CloakEncoder.adjustCoverContrast(parseInt(event.target.value, 10));
    }

    // 重置表图对比度
    function resetCoverContrast() {
        document.getElementById('coverContrastRange').value = 50;
        CloakProcessor.CloakEncoder.adjustCoverContrast(50);
    }

    // 设置里图亮度
    function encodeSetInnerLuminance(event) {
        CloakProcessor.CloakEncoder.adjustInnerLuminance(parseInt(event.target.value, 10));
    }

    // 重置里图亮度
    function resetInnerLuminance() {
        document.getElementById('innerLuminanceRange').value = 50;
        CloakProcessor.CloakEncoder.adjustInnerLuminance(50);
    }

    // 设置表图亮度
    function encodeSetCoverLuminance(event) {
        CloakProcessor.CloakEncoder.adjustCoverLuminance(parseInt(event.target.value, 10));
    }

    // 重置表图亮度
    function resetCoverLuminance() {
        document.getElementById('coverLuminanceRange').value = 50;
        CloakProcessor.CloakEncoder.adjustCoverLuminance(50);
    }

    // 设置指定输出图像大小
    function encodeSetMirageSize() {
        const size = parseInt(document.getElementById('mirageSizeInput').value, 10);
        if (size < 0 || size > 10000) {
            alert('请输入合理的整数');
            return;
        }
        CloakProcessor.CloakEncoder.setMirageSize(size);
    }

    // 设置是否添加水印
    function encodeSetIsAddMark(event) {
        CloakProcessor.CloakEncoder.setIsAddMark(event.target.checked);
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
        document.getElementById('innerLuminanceRange').addEventListener('input', encodeSetInnerLuminance);
        document.getElementById('coverLuminanceRange').addEventListener('input', encodeSetCoverLuminance);
        document.getElementById('innerResetLuminanceButton').addEventListener('click', resetInnerLuminance);
        document.getElementById('coverResetLuminanceButton').addEventListener('click', resetCoverLuminance);
        document.getElementById('mirageSizeConfirmButton').addEventListener('click', encodeSetMirageSize);
        document.getElementById('isAddMarkCheckbox').addEventListener('change', encodeSetIsAddMark);
        document.getElementById('encodeProcessButton').addEventListener('click', encodeProcessImage);
        document.getElementById('encodeSaveButton').addEventListener('click', encodeSaveImage);
    }

    // 移除编码事件监听器
    function encodeRemoveEventListeners() {
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
        document.getElementById('innerLuminanceRange').removeEventListener('input', encodeSetInnerLuminance);
        document.getElementById('coverLuminanceRange').removeEventListener('input', encodeSetCoverLuminance);
        document.getElementById('innerResetLuminanceButton').removeEventListener('click', resetInnerLuminance);
        document.getElementById('coverResetLuminanceButton').removeEventListener('click', resetCoverLuminance);
        document.getElementById('mirageSizeConfirmButton').removeEventListener('click', encodeSetMirageSize);
        document.getElementById('isAddMarkCheckbox').removeEventListener('change', encodeSetIsAddMark);
        document.getElementById('encodeProcessButton').removeEventListener('click', encodeProcessImage);
        document.getElementById('encodeSaveButton').removeEventListener('click', encodeSaveImage);
    }

    const EncodeListeners = {
        encodeSetUpEventListeners,
        encodeRemoveEventListeners
    };

    return EncodeListeners;
}));

errorHandling.scriptsLoaded.EncodeListeners = true;
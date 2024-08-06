(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['./ImageLoader.js'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('./ImageLoader.js'));
    } else {
        root.EncodeListeners = factory(root.ImageLoader);
    }
}(typeof self !== 'undefined' ? self : this, function (ImageLoader) {

    // 从文件加载里图
    function encodeLoadInnerImageFile(event) {
        errorHandling.currCanvasIndex = 1;
        const file = event.target.files[0];
        ImageLoader.updateImageFromFile(file, (img) => {
            CloakProcessor.CloakEncoder.clearOutputCanvas();
            CloakProcessor.CloakEncoder.updateInnerImage(img);
        });
        event.target.value = '';
    }

    // 从文件加载表图
    function encodeLoadCoverImageFile(event) {
        errorHandling.currCanvasIndex = 2;
        const file = event.target.files[0];
        ImageLoader.updateImageFromFile(file, (img) => {
            CloakProcessor.CloakEncoder.clearOutputCanvas();
            CloakProcessor.CloakEncoder.updateCoverImage(img);
        });
        event.target.value = '';
    }

    // 从文件加载隐藏文件
    function encodeLoadHiddenFile(event) {
        CloakProcessor.CloakEncoder.clearOutputCanvas();
        CloakProcessor.CloakEncoder.updateHiddenFile(event.target.files[0]);
    }

    // 从拖动加载里图
    function encodeLoadInnerImageFromDrag(event) {
        errorHandling.currCanvasIndex = 1;
        ImageLoader.dragDropLoadImage(event, (img) => {
            CloakProcessor.CloakEncoder.clearOutputCanvas();
            CloakProcessor.CloakEncoder.updateInnerImage(img);
        });
    }

    // 从拖动加载表图
    function encodeLoadCoverImageFromDrag(event) {
        errorHandling.currCanvasIndex = 2;
        ImageLoader.dragDropLoadImage(event, (img) => {
            CloakProcessor.CloakEncoder.clearOutputCanvas();
            CloakProcessor.CloakEncoder.updateCoverImage(img);
        });
    }

    // 从拖动加载隐藏文件
    function encodeLoadHiddenFileFromDrag(event) {
        event.preventDefault();
        CloakProcessor.CloakEncoder.clearOutputCanvas();
        CloakProcessor.CloakEncoder.updateHiddenFile(event.dataTransfer.files[0]);
    }

    // 设置里图对比度
    function encodeSetInnerContrast(event) {
        CloakProcessor.CloakEncoder.clearOutputCanvas();
        CloakProcessor.CloakEncoder.adjustInnerContrast(parseInt(event.target.value, 10));
    }

    // 重置里图对比度
    function resetInnerContrast() {
        CloakProcessor.CloakEncoder.clearOutputCanvas();
        document.getElementById('innerContrastRange').value = 50;
        CloakProcessor.CloakEncoder.adjustInnerContrast(50);
    }

    // 设置表图对比度
    function encodeSetCoverContrast(event) {
        CloakProcessor.CloakEncoder.clearOutputCanvas();
        CloakProcessor.CloakEncoder.adjustCoverContrast(parseInt(event.target.value, 10));
    }

    // 重置表图对比度
    function resetCoverContrast() {
        CloakProcessor.CloakEncoder.clearOutputCanvas();
        document.getElementById('coverContrastRange').value = 50;
        CloakProcessor.CloakEncoder.adjustCoverContrast(50);
    }

    // 设置里图亮度
    function encodeSetInnerLuminance(event) {
        CloakProcessor.CloakEncoder.clearOutputCanvas();
        CloakProcessor.CloakEncoder.adjustInnerLuminance(parseInt(event.target.value, 10));
    }

    // 重置里图亮度
    function resetInnerLuminance() {
        CloakProcessor.CloakEncoder.clearOutputCanvas();
        document.getElementById('innerLuminanceRange').value = 50;
        CloakProcessor.CloakEncoder.adjustInnerLuminance(50);
    }

    // 设置表图亮度
    function encodeSetCoverLuminance(event) {
        CloakProcessor.CloakEncoder.clearOutputCanvas();
        CloakProcessor.CloakEncoder.adjustCoverLuminance(parseInt(event.target.value, 10));
    }

    // 重置表图亮度
    function resetCoverLuminance() {
        CloakProcessor.CloakEncoder.clearOutputCanvas();
        document.getElementById('coverLuminanceRange').value = 50;
        CloakProcessor.CloakEncoder.adjustCoverLuminance(50);
    }

    // 设置指定输出图像大小
    function encodeSetMirageSize() {
        CloakProcessor.CloakEncoder.clearOutputCanvas();
        const size = parseInt(document.getElementById('mirageSizeInput').value, 10);
        if (size < 0 || size > 10000) {
            alert('请输入合理的整数');
            return;
        }
        CloakProcessor.CloakEncoder.setMirageSize(size);
    }

    // 设置是否添加水印
    function encodeSetIsAddMark(event) {
        CloakProcessor.CloakEncoder.clearOutputCanvas();
        CloakProcessor.CloakEncoder.setIsAddMark(event.target.checked);
    }

    // 设置是否压缩隐写图像
    function encodeSetIsCompress(event) {
        CloakProcessor.CloakEncoder.clearOutputCanvas();
        CloakProcessor.CloakEncoder.setIsCompress(event.target.checked);
    }

    // 设置噪声强度
    let diffInputTimeout;
    function encodeSetDiff(event) {
        clearTimeout(diffInputTimeout);

        diffInputTimeout = setTimeout(function () {
            CloakProcessor.CloakEncoder.clearOutputCanvas();
            let diff = parseInt(event.target.value, 10)
            if (isNaN(diff)) {
                return;
            }
            if (diff > applicationState.defaultArguments.max_difference) {
                diff = applicationState.defaultArguments.max_difference;
                event.target.value = applicationState.defaultArguments.max_difference;
            } else if (diff < applicationState.defaultArguments.min_difference) {
                diff = applicationState.defaultArguments.min_difference;
                event.target.value = applicationState.defaultArguments.min_difference;
            }
            CloakProcessor.CloakEncoder.setDiff(diff * 6);
        }, 500);
    }

    // 设置编码方法
    function encodeSetMethod(event) {
        CloakProcessor.CloakEncoder.clearOutputCanvas();
        setDiffHelper(event.target.value);
    }
    function setDiffHelper(version) {
        const encodeDiffInputHint = document.getElementById('encodeDiffinputHint');
        const encodeDiffInput = document.getElementById('encodeDiffInput');
        switch (version) {
            case '1':
                encodeDiffInputHint.innerText = `(${applicationState.defaultArguments.min_difference}-${applicationState.defaultArguments.max_difference}, 越大抗干扰能力越强, 但幻影坦克效果越差)`;
                encodeDiffInput.value = Math.floor(applicationState.defaultArguments.version_1.difference / 6);
                CloakProcessor.CloakEncoder.setVersion(parseInt(version, 10));
                CloakProcessor.CloakEncoder.setDiff(applicationState.defaultArguments.version_1.difference);
                break;
            case '2':
                encodeDiffInputHint.innerText = `(${applicationState.defaultArguments.min_difference}-${applicationState.defaultArguments.max_difference}, 越大抗干扰能力越强, 但幻影坦克效果越差)`;
                encodeDiffInput.value = Math.floor(applicationState.defaultArguments.version_2.difference / 6);
                CloakProcessor.CloakEncoder.setVersion(parseInt(version, 10));
                CloakProcessor.CloakEncoder.setDiff(applicationState.defaultArguments.version_2.difference);
                break;
            case '0':
                encodeDiffInputHint.innerText = `(${applicationState.defaultArguments.min_difference}-${applicationState.defaultArguments.max_difference}, 越大隐写信息密度越高, 但幻影坦克效果越差)`;
                encodeDiffInput.value = Math.ceil(applicationState.defaultArguments.version_0.difference / 6);
                CloakProcessor.CloakEncoder.setDiff(applicationState.defaultArguments.version_0.difference); // lsb的diff参数会影响隐写信息密度，但此处调用setDiff时CloakEncoder的_version属性不为0，所以不会重新计算尺寸。
                CloakProcessor.CloakEncoder.setVersion(parseInt(version, 10)); // version改变时是一定会重新计算尺寸的，结合上一行，将version设为0时，只会重新计算一次尺寸。
                break;
        }
    }

    // 处理图像
    function encodeProcessImage() {
        CloakProcessor.CloakEncoder.clearOutputCanvas();
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
        document.getElementById('isEncodeCompressCheckbox').addEventListener('change', encodeSetIsCompress);
        document.getElementById('encodeDiffInput').addEventListener('change', encodeSetDiff);
        document.getElementById('encodeMethodSelect').addEventListener('change', encodeSetMethod);
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
        document.getElementById('isEncodeCompressCheckbox').removeEventListener('change', encodeSetIsCompress);
        document.getElementById('encodeDiffInput').removeEventListener('change', encodeSetDiff);
        document.getElementById('encodeMethodSelect').removeEventListener('change', encodeSetMethod);
        document.getElementById('encodeProcessButton').removeEventListener('click', encodeProcessImage);
        document.getElementById('encodeSaveButton').removeEventListener('click', encodeSaveImage);
    }

    const EncodeListeners = {
        setDiffHelper,
        encodeSetUpEventListeners,
        encodeRemoveEventListeners
    };

    return EncodeListeners;
}));

errorHandling.scriptsLoaded.EncodeListeners = true;
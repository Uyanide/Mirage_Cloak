errorHandling.userAgent = navigator.userAgent.toLowerCase();
applicationState.isOnPhone = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(errorHandling.userAgent);
applicationState.isDownloadNotSupported = applicationState.isOnPhone && /xiaomi|miui/i.test(errorHandling.userAgent);
applicationState.isOnTiebaBrowser = /tieba/i.test(errorHandling.userAgent);
// applicationState.isOnPhone = true;

import CloakDecoder from '/scripts/processors/CloakDecoder.js';
import CloakEncoder from '/scripts/processors/CloakEncoder.js';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        if (applicationState.isOnTiebaBrowser) {
            document.body.innerHTML = '<h1>请点击右上角<br>用浏览器打开</h1><img src="https://gsp0.baidu.com/5aAHeD3nKhI2p27j8IqW0jdnxx1xbK/tb/editor/images/client/image_emoticon1.png"></img>';
            return;
        }
        if (applicationState.isDownloadNotSupported) {
            alert('由于浏览器限制，部分功能可能无法使用，建议使用其他浏览器或等待后续更新适配');
        }
        // 版本显示
        const versionInfoElement = document.getElementById('versionInfo');
        if (versionInfoElement) {
            versionInfoElement.innerHTML = `version: <b>${applicationState.version}</b>`;
        }

        // 加载默认参数
        let path = document.getElementById('jsonPath').getAttribute('data-json-path');
        path = path + '?v=' + applicationState.version;
        applicationState.defaultArguments = new DefaultArguments();
        await applicationState.defaultArguments.loadDefaultArguments(path);
        applicationState.defaultArguments.setDefaultValues();
        applicationState.currPageId = applicationState.defaultArguments.defaultPageId;

        // 实例化解码器和编码器
        CloakProcessor.CloakDecoder = new CloakDecoder(applicationState.defaultArguments, 'decodeInputCanvas', 'decodeOutputCanvas');
        CloakProcessor.CloakEncoder = new CloakEncoder(applicationState.defaultArguments, 'innerCanvas', 'coverCanvas', 'hiddenCanvas', 'encodeOutputCanvas', 'encodeOutputSize');

        // // 加载默认图像
        // errorHandling.defaultImg = [];
        // for (let i = 0; i < applicationState.defaultArguments.defaultSrc.length; i++) {
        //     errorHandling.defaultImg[i] = new Image();
        //     errorHandling.defaultImg[i].crossOrigin = 'anonymous';
        //     const timer = setTimeout(() => {
        //         errorHandling.defaultImg[i].src = '';
        //         errorHandling.defaultImg[i].onerror = null;
        //         console.error('加载默认图像超时: ' + applicationState.defaultArguments.defaultSrc[i]);
        //     }, 5000);
        //     errorHandling.defaultImg[i].onload = () => {
        //         clearTimeout(timer);
        //         switch (i) {
        //             case 0:
        //                 PrismProcessor.PrismDecoder.updateImage(errorHandling.defaultImg[i]);
        //                 break;
        //             case 1:
        //                 PrismProcessor.PrismEncoder.updateInnerImage(errorHandling.defaultImg[i]);
        //                 break;
        //             case 2:
        //                 PrismProcessor.PrismEncoder.updateCoverImage(errorHandling.defaultImg[i]);
        //                 break;
        //         }
        //     };
        //     errorHandling.defaultImg[i].onerror = () => {
        //         clearTimeout(timer);
        //         console.error('无法加载默认图像: ' + applicationState.defaultArguments.defaultSrc[i]);
        //         errorHandling.defaultImg[i].src = '';
        //         errorHandling.defaultImg[i].onerror = null;
        //     };
        //     errorHandling.defaultImg[i].src = applicationState.defaultArguments.defaultSrc[i];
        // }

        // 加载水印
        applicationState.markImage = new Image();
        applicationState.markImage.crossOrigin = 'anonymous';
        applicationState.markImage.onload = () => {
            CloakProcessor.CloakEncoder.updateMarkImage(applicationState.markImage);
        };
        applicationState.markImage.onerror = () => {
            alert('无法加载标记图案: ' + applicationState.defaultArguments.mark_path);
            CloakProcessor.CloakEncoder.updateMarkImage(null);
        }
        applicationState.markImage.src = applicationState.defaultArguments.mark_path;

        // 设置全局事件监听器
        universalSetupEventListeners();

        // 显示默认页面
        switch (applicationState.defaultArguments.defaultPageId) {
            case 'encodePage':
                encodeSetUpEventListeners();
                document.getElementById('decodePage').classList.add('displayNone');
                document.getElementById('encodePage').classList.add('displayFlex');
                document.getElementById('decodeButton').classList.add('backgroundNotSelected');
                document.getElementById('encodeButton').classList.add('backgroundSecondary');
                break;
            case 'decodePage':
                decodeSetupEventListeners();
                document.getElementById('encodePage').classList.add('displayNone');
                document.getElementById('decodePage').classList.add('displayFlex');
                document.getElementById('encodeButton').classList.add('backgroundNotSelected');
                document.getElementById('decodeButton').classList.add('backgroundSecondary');
                break;
        }

        if (applicationState.isOnPhone) {
            document.getElementById('decodePasteInput').classList.add('displayNone');
            document.getElementById('decodeDragInputHint').classList.add('displayNone');
            const elements = document.getElementsByClassName('encodeDrag');
            for (let i = 0; i < elements.length; i++) {
                elements[i].classList.add('displayNone');
            }
        } else {
            document.getElementById('decodePasteButton').style.display = 'none';
        }
    } catch (error) {
        console.error('Failed to initialize: ' + error);
        alert('初始化失败: ' + error);
    }
});

errorHandling.scriptsLoaded.init = true;
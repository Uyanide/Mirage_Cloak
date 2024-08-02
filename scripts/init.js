(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([
            '/scripts/processors/CloakDecoder.js',
            '/scripts/processors/CloakEncoder.js',
            '/scripts/listeners/UniversalListeners.js',
            '/scripts/listeners/DecodeListeners.js',
            '/scripts/listeners/EncodeListeners.js',
            '/scripts/DefaultArguments.js'
        ], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(
            require('/scripts/processors/CloakDecoder.js'),
            require('/scripts/processors/CloakEncoder.js'),
            require('/scripts/listeners/UniversalListeners.js'),
            require('/scripts/listeners/DecodeListeners.js'),
            require('/scripts/listeners/EncodeListeners.js'),
            require('/scripts/DefaultArguments.js')
        );
    } else {
        root.init = factory(
            root.CloakDecoder,
            root.CloakEncoder,
            root.UniversalListeners,
            root.DecodeListeners,
            root.EncodeListeners,
            root.DefaultArguments
        );
    }
}(typeof self !== 'undefined' ? self : this, function (
    CloakDecoder,
    CloakEncoder,
    UniversalListeners,
    DecodeListeners,
    EncodeListeners,
    DefaultArguments
) {

    errorHandling.userAgent = navigator.userAgent.toLowerCase();
    applicationState.isOnPhone = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(errorHandling.userAgent);
    applicationState.isDownloadNotSupported = applicationState.isOnPhone && /xiaomi|miui/i.test(errorHandling.userAgent);
    applicationState.isOnTiebaBrowser = /tieba/i.test(errorHandling.userAgent);
    // applicationState.isOnPhone = true;

    document.addEventListener('DOMContentLoaded', async () => {
        try {
            if (applicationState.isOnTiebaBrowser) {
                document.body.innerHTML = '<h1>请点击右上角<br>用浏览器打开</h1><img src="https://gsp0.baidu.com/5aAHeD3nKhI2p27j8IqW0jdnxx1xbK/tb/editor/images/client/image_emoticon1.png"></img>';
                return;
            }
            if (applicationState.isDownloadNotSupported) {
                alert('由于浏览器限制，部分功能可能无法使用，建议使用其他浏览器或等待后续更新适配');
            }

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
            applicationState.markImage.onerror = (event) => {
                console.error('无法加载水印图案: ' + applicationState.defaultArguments.mark_path, event);
                alert('无法加载水印图案: ' + applicationState.defaultArguments.mark_path + '\n错误详情: ' + event.message);
                CloakProcessor.CloakEncoder.updateMarkImage(null);
            };
            applicationState.markImage.src = applicationState.defaultArguments.mark_path;

            // 设置全局事件监听器
            UniversalListeners.universalSetupEventListeners();

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
}));

errorHandling.scriptsLoaded.init = true;
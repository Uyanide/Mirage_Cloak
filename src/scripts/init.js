import '../css/style.css';
import '../css/classes.css';
import '../css/switch.css';
import '../css/sidebar.css';
import '../css/busy.css';

import { DefaultArguments } from './DefaultArguments.js';
import { UniversalListeners } from './listeners/UniversalListeners.js';
import { EncodeListeners } from './listeners/EncodeListeners.js';

import mark from '../res/mark.png';
import icon from '../res/mugi.ico';

// 运行环境检测
window.errorHandling.userAgent = navigator.userAgent;
window.applicationState.isOnPhone = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
    window.errorHandling.userAgent
);
window.applicationState.isDownloadNotSupported =
    window.applicationState.isOnPhone && /xiaomi|miui|quark|ucbrowser/i.test(window.errorHandling.userAgent);
window.applicationState.isOnTiebaBrowser = /tieba/i.test(window.errorHandling.userAgent);
// window.applicationState.isOnPhone = true;

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // 设置主题与监听系统设置变化
        UniversalListeners.applyTheme();
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', UniversalListeners.applyTheme);

        // 屏蔽贴吧内置浏览器，某些浏览器提示兼容性
        if (window.applicationState.isOnTiebaBrowser) {
            alert('建议使用正常浏览器打开本页面，贴吧内置浏览器上一大堆功能有问题。');
        }
        if (window.applicationState.isDownloadNotSupported) {
            alert('由于浏览器限制，下载功能可能出现异常，建议使用其他浏览器或等待后续更新适配。');
        }

        // 显示图标
        const link = document.createElement('link');
        link.rel = 'shortcut icon';
        link.href = icon;
        document.head.appendChild(link);

        // 初始化默认参数
        window.applicationState.defaultArguments = DefaultArguments.loadDefaultArguments();
        DefaultArguments.setDefaultValues();
        window.applicationState.version = window.applicationState.defaultArguments.app_version;

        // 检查版本号，清除缓存
        console.log('target version:', window.applicationState.version);
        console.log('local version:', localStorage.getItem('version'));
        const previousVersion = localStorage.getItem('version');
        if (!previousVersion || previousVersion !== window.applicationState.version) {
            console.log('new version detected, clearing cache');
            localStorage.clear();
            localStorage.setItem('version', window.applicationState.version);
            location.reload(true);
        }

        // 显示版本号
        const versionInfoElement = document.getElementById('versionInfo');
        if (versionInfoElement) {
            versionInfoElement.innerHTML = `version: <b>${window.applicationState.version}</b>`;
        }

        // 根据版本显示不同的默认diff和提示
        EncodeListeners.setDiffHelper(window.applicationState.defaultArguments.version.toString());

        // 加载水印
        try {
            await new Promise((resolve, reject) => {
                window.applicationState.markImage = new Image();
                window.applicationState.markImage.crossOrigin = 'anonymous';
                window.applicationState.markImage.onload = () => {
                    resolve();
                };
                window.applicationState.markImage.onerror = (event) => {
                    reject(event);
                };
                window.applicationState.markImage.src = mark;
            });
        } catch (error) {
            console.error('Failed to load mark:', error);
            alert('加载水印失败，请刷新页面重试。');
            window.applicationState.markImage = null;
        }

        // 设置全局事件监听器
        UniversalListeners.universalSetupEventListeners();

        // 设置默认页面
        window.applicationState.currPageId =
            window.applicationState.defaultArguments.defaultPageId === 'decodePage' ? 'encodePage' : 'decodePage';
        UniversalListeners.switchPage();

        // 移动端隐藏部分元素，启用粘贴按钮
        if (window.applicationState.isOnPhone) {
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
        alert('初始化失败！' + error.message);
    }
});

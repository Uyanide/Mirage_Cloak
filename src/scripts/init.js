import '../css/style.css';
import '../css/classes.css';
import '../css/switch.css';

import { DefaultArguments } from './DefaultArguments.js';
import { UniversalListeners } from './listeners/UniversalListeners.js';
import { EncodeListeners } from './listeners/EncodeListeners.js';

import mark from '../res/mark.png';
import icon from '../res/mugi.ico';

// 运行环境检测
errorHandling.userAgent = navigator.userAgent.toLowerCase();
applicationState.isOnPhone = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(errorHandling.userAgent);
applicationState.isDownloadNotSupported = applicationState.isOnPhone && /xiaomi|miui/i.test(errorHandling.userAgent);
applicationState.isOnTiebaBrowser = /tieba/i.test(errorHandling.userAgent);
// applicationState.isOnPhone = true;

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // 设置主题与监听系统设置变化
        UniversalListeners.applyTheme();
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", UniversalListeners.applyTheme);

        // 屏蔽贴吧内置浏览器，某些浏览器提示兼容性
        if (applicationState.isOnTiebaBrowser) {
            document.body.innerHTML = '<h1>请点击右上角<br>用浏览器打开</h1><img src="https://gsp0.baidu.com/5aAHeD3nKhI2p27j8IqW0jdnxx1xbK/tb/editor/images/client/image_emoticon1.png"></img>';
            return;
        }
        if (applicationState.isDownloadNotSupported) {
            alert('由于浏览器限制，部分功能可能无法使用，建议使用其他浏览器或等待后续更新适配');
        }

        // 显示图标
        const link = document.createElement('link');
        link.rel = 'shortcut icon';
        link.href = icon;
        document.head.appendChild(link);

        // 初始化默认参数
        applicationState.defaultArguments = new DefaultArguments();
        applicationState.defaultArguments.loadDefaultArguments();
        applicationState.defaultArguments.setDefaultValues();
        applicationState.version = applicationState.defaultArguments.app_version;

        // 检查版本号，清除缓存
        console.log('target version:', applicationState.version);
        console.log('local version:', localStorage.getItem('version'));
        const previousVersion = localStorage.getItem('version');
        if (!previousVersion || previousVersion !== applicationState.version) {
            console.log('new version detected, clearing cache');
            localStorage.clear();
            localStorage.setItem('version', applicationState.version);
            location.reload(true);
        }

        // 显示版本号
        const versionInfoElement = document.getElementById('versionInfo');
        if (versionInfoElement) {
            versionInfoElement.innerHTML = `version: <b>${applicationState.version}</b>`;
        }

        // 根据版本显示不同的默认diff和提示
        EncodeListeners.setDiffHelper(applicationState.defaultArguments.version.toString());

        // 加载水印
        try {
            await new Promise((resolve, reject) => {
                applicationState.markImage = new Image();
                applicationState.markImage.crossOrigin = 'anonymous';
                applicationState.markImage.onload = () => {
                    resolve();
                };
                applicationState.markImage.onerror = (event) => {
                    reject(event);
                };
                applicationState.markImage.src = mark;
            });
        } catch (error) {
            console.error('Failed to load mark:', error);
            alert('加载水印失败，请刷新页面重试。');
            applicationState.markImage = null;
        }

        // 设置全局事件监听器
        UniversalListeners.universalSetupEventListeners();

        // 设置默认页面
        applicationState.currPageId = applicationState.defaultArguments.defaultPageId === 'decodePage' ? 'encodePage' : 'decodePage';
        UniversalListeners.switchPage();

        // 移动端隐藏部分元素，启用粘贴按钮
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
        alert('初始化失败！' + error);
    }
});

errorHandling.scriptsLoaded.init = true;
import { DecodeListeners } from './DecodeListeners.js';
import { EncodeListeners } from './EncodeListeners.js';
import { BusyStatus } from './BusyStatus.js';

// 切换页面显示
function switchPage() {
    var decodePage = document.getElementById('decodePage');
    var encodePage = document.getElementById('encodePage');
    var decodeButton = document.getElementById('decodeButton');
    var encodeButton = document.getElementById('encodeButton');
    if (window.applicationState.currPageId === 'decodePage') {
        if (window.CloakProcessor.CloakEncoder === undefined) {
            BusyStatus.showBusy();
            import('../processors/CloakEncoder.js')
                .then((module) => {
                    window.CloakProcessor.CloakEncoder = new module.CloakEncoder(
                        window.applicationState.defaultArguments,
                        'innerCanvas',
                        'coverCanvas',
                        'hiddenMetaCanvas',
                        'encodeOutputCanvas',
                        'encodeOutputSize',
                        'encodeHiddenSize',
                        'encodeSaveLabel'
                    );
                    BusyStatus.hideBusy();
                })
                .catch((error) => {
                    BusyStatus.hideBusy();
                    console.error('Failed to load CloakEncoder:', error);
                    alert('加载编码器失败，请刷新页面重试。');
                });
        }
        encodePage.classList.remove('displayNone');
        encodePage.classList.add('displayFlex');
        decodePage.classList.remove('displayFlex');
        decodePage.classList.add('displayNone');
        decodeButton.classList.remove('backgroundSecondary');
        decodeButton.classList.add('backgroundNotSelected');
        encodeButton.classList.remove('backgroundNotSelected');
        encodeButton.classList.add('backgroundSecondary');
        decodeButton.addEventListener('click', switchPage);
        encodeButton.removeEventListener('click', switchPage);
        DecodeListeners.decodeRemoveEventListeners();
        EncodeListeners.encodeSetUpEventListeners();
        window.applicationState.currPageId = 'encodePage';
    } else {
        if (window.CloakProcessor.MultiDecoder === undefined) {
            BusyStatus.showBusy();
            import('../processors/CloakDecoder.js')
                .then((module) => {
                    const decoder = new module.CloakDecoder(
                        window.applicationState.defaultArguments,
                        'decodeInputCanvas',
                        'decodeOutputMetaCanvas'
                    );
                    import('../processors/MultiDecoder.js')
                        .then((module) => {
                            window.CloakProcessor.MultiDecoder = new module.MultiDecoder(
                                window.applicationState.defaultArguments,
                                decoder,
                                'sidebarContent',
                                'sidebarAmountLabel'
                            );
                            document
                                .getElementById('sidebarClearButton')
                                .addEventListener('click', window.CloakProcessor.MultiDecoder.clearQueue);
                            BusyStatus.hideBusy();
                        })
                        .catch((error) => {
                            BusyStatus.hideBusy();
                            console.error('Failed to load MultiDecoder:', error);
                            alert('加载解码器失败，请刷新页面重试。');
                        });
                })
                .catch((error) => {
                    BusyStatus.hideBusy();
                    console.error('Failed to load CloakDecoder:', error);
                    alert('加载解码器失败，请刷新页面重试。');
                });
        }
        decodePage.classList.remove('displayNone');
        decodePage.classList.add('displayFlex');
        encodePage.classList.remove('displayFlex');
        encodePage.classList.add('displayNone');
        decodeButton.classList.remove('backgroundNotSelected');
        decodeButton.classList.add('backgroundSecondary');
        encodeButton.classList.remove('backgroundSecondary');
        encodeButton.classList.add('backgroundNotSelected');
        encodeButton.addEventListener('click', switchPage);
        decodeButton.removeEventListener('click', switchPage);
        DecodeListeners.decodeSetupEventListeners();
        EncodeListeners.encodeRemoveEventListeners();
        window.applicationState.currPageId = 'decodePage';
    }
}

// 设置主题
const applyTheme = (tarTheme) => {
    if (tarTheme === undefined || typeof tarTheme !== 'string') {
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
        tarTheme = prefersDarkScheme ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', tarTheme);
    document.getElementById('isDarkmodeCheckbox').checked = tarTheme === 'dark';
};

// 侧边栏图片点击事件回调
const sidebarImageProcess = async (event) => {
    try {
        BusyStatus.showBusy();
        await window.CloakProcessor.MultiDecoder.decode(event).then(() => {
            BusyStatus.hideBusy();
        });
    } catch (error) {
        BusyStatus.hideBusy();
        alert('解码失败：' + error.message);
        console.error('Failed to decode:', error.stack, error.message);
    }
};

function universalSetupEventListeners() {
    // 隐私政策按钮事件监听
    document.getElementById('togglePrivacyPolicy').addEventListener('click', (event) => {
        const privacyPolicy = document.getElementById('privacyPolicy');
        const state = window.getComputedStyle(privacyPolicy).display;
        if (state === 'none') {
            privacyPolicy.classList.remove('displayNone');
            privacyPolicy.classList.add('displayBlock');
            event.target.textContent = '隐藏使用须知';
            window.scrollTo(0, document.body.scrollHeight);
        } else {
            privacyPolicy.classList.remove('displayBlock');
            privacyPolicy.classList.add('displayNone');
            event.target.textContent = '显示使用须知';
        }
    });

    // 版本记录按钮事件监听
    document.getElementById('toggleVersionRecord').addEventListener('click', (event) => {
        const changelog = document.getElementById('versionRecordTable');
        const state = window.getComputedStyle(changelog).display;
        if (state === 'none') {
            changelog.classList.remove('displayNone');
            changelog.classList.add('displayBlock');
            event.target.textContent = '隐藏主要更新记录';
            window.scrollTo(0, document.body.scrollHeight);
        } else {
            changelog.classList.remove('displayBlock');
            changelog.classList.add('displayNone');
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

    document
        .getElementById('sidebarToggleButton')
        .addEventListener(window.applicationState.isOnPhone ? 'touchstart' : 'mousedown', DecodeListeners.adjustSidebarWidth);
    document.getElementById('sidebar').addEventListener('click', DecodeListeners.showSidebar);
}

const UniversalListeners = {
    switchPage,
    applyTheme,
    sidebarImageProcess,
    universalSetupEventListeners,
};

export { UniversalListeners };

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([
            '/scripts/listeners/DecodeListeners.js',
            '/scripts/listeners/EncodeListeners.js',
        ], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(
            require('/scripts/listeners/DecodeListeners.js'),
            require('/scripts/listeners/EncodeListeners.js')
        );
    } else {
        root.UniversalListeners = factory(
            root.DecodeListeners,
            root.EncodeListeners
        );
    }
}(typeof self !== 'undefined' ? self : this, function (DecodeListeners, EncodeListeners) {
    // 切换页面显示
    function switchPage() {
        var decodePage = document.getElementById('decodePage');
        var encodePage = document.getElementById('encodePage');
        var decodeButton = document.getElementById('decodeButton');
        var encodeButton = document.getElementById('encodeButton');
        if (applicationState.currPageId === 'decodePage') {
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
            applicationState.currPageId = 'encodePage';
        } else {
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
            applicationState.currPageId = 'decodePage';
        }
    }

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
    }

    const UniversalListeners = {
        switchPage: switchPage,
        universalSetupEventListeners: universalSetupEventListeners
    };

    return UniversalListeners;
}));

errorHandling.scriptsLoaded.UniversalListeners = true;
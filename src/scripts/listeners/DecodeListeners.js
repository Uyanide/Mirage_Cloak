import { BusyStatus } from './BusyStatus';

// 调整侧边栏宽度
function disableHorizontalScroll() {
    document.documentElement.style.overflowX = 'hidden';
}
function enableHorizontalScroll() {
    document.documentElement.style.overflowX = 'auto';
}
function hideSidebarFullscreen(event) {
    if (!document.getElementById('isDarkmodeContainer').contains(event.target) && (event.target.id == 'sidebarToggleButton' || !document.getElementById('sidebar').contains(event.target))) {
        hideSidebar();
    }
}
const showSidebar = () => {
    applicationState.sidebarVisible = true;
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.remove('sidebarHide');
    sidebar.classList.add('sidebarShow');
    setTimeout(() => {
        document.addEventListener('click', hideSidebarFullscreen);
    }, 500);
    sidebar.removeEventListener('click', showSidebar);
};
const hideSidebar = () => {
    if (applicationState.dontCareSidebarClick) {
        applicationState.dontCareSidebarClick = false;
        return;
    }
    applicationState.sidebarVisible = false;
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.remove('sidebarShow');
    sidebar.classList.add('sidebarHide');
    document.removeEventListener('click', hideSidebarFullscreen);
    setTimeout(() => {
        sidebar.addEventListener('click', showSidebar);
    }, 500);
};
function adjustSidebarWidth(event) {
    if (!applicationState.sidebarVisible) {
        showSidebar();
        return;
    }
    disableHorizontalScroll();
    const initWidth = getComputedStyle(document.documentElement).getPropertyValue('--sidebar-width');
    const initX = event.clientX || event.touches[0].clientX;
    const parentWidth = document.documentElement.getBoundingClientRect().width;
    const minWidth = parentWidth * 0.1;
    const maxWidth = parentWidth * 0.7;
    let offset = 0;

    const adjustMouse = (event) => {
        applicationState.dontCareSidebarClick = true;
        offset = event.clientX - initX;
        const newWidth = Math.min(Math.max(parseInt(initWidth) - offset, minWidth), maxWidth);
        document.documentElement.style.setProperty('--sidebar-width', `${newWidth}px`);
    };

    const adjustTouch = (event) => {
        applicationState.dontCareSidebarClick = true;
        offset = event.touches[0].clientX - initX;
        const newWidth = Math.min(Math.max(parseInt(initWidth) - offset, minWidth), maxWidth);
        document.documentElement.style.setProperty('--sidebar-width', `${newWidth}px`);
    };

    const adjustEnd = () => {
        document.removeEventListener('mousemove', adjustMouse);
        document.removeEventListener('mouseup', adjustEnd);
        document.removeEventListener('touchmove', adjustTouch);
        document.removeEventListener('touchend', adjustEnd);
        enableHorizontalScroll();
    };

    applicationState.dontCareSidebarClick = false;
    if (!applicationState.isOnPhone) {
        document.addEventListener('mousemove', adjustMouse);
        document.addEventListener('mouseup', adjustEnd);
    } else {
        document.addEventListener('touchmove', adjustTouch);
        document.addEventListener('touchend', adjustEnd);
    }
}

// 处理队列
async function decodeProcessQueue(files, callback) {
    if (!files || files.length === 0) {
        return;
    }
    CloakProcessor.MultiDecoder.clearQueue();
    let successed = 0;
    let promises = [];
    for (let i = 0; i < files.length; i++) {
        promises.push(
            CloakProcessor.MultiDecoder.appendQueue(files[i])
                .then(() => successed++)
                .catch((error) => {
                    console.error(`Error on ${files[i].name}：`, error.stack, error.message);
                })
        );
    }
    await Promise.all(promises);
    if (successed > 0) {
        document.getElementById('queue0').dispatchEvent(new Event('click'));
    }
    if (successed > 1) {
        showSidebar();
    } else {
        hideSidebar();
    }
    document.getElementById('sidebarAmountLabel').innerText = `数量：${successed}`;
    if (callback) {
        callback();
    }
}

// 从文件加载图像
async function decodeLoadImageFile(event) {
    try {
        BusyStatus.showBusy();
        const files = event.target.files;
        await decodeProcessQueue(files, () => {
            event.target.value = '';
        });
        BusyStatus.hideBusy();
    } catch (error) {
        BusyStatus.hideBusy();
        alert('图像加载失败：' + error.message);
        console.error('Failed to load image:', error.stack, error.message);
    }
}

// 从剪贴板加载图像
async function decodeLoadImageFromClipboard(event) {
    try {
        BusyStatus.showBusy();
        const files = [];
        const items = (event.clipboardData || event.originalEvent.clipboardData).items;
        for (const item of items) {
            if (item.type.indexOf('image') !== -1) {
                const blob = item.getAsFile();
                files.push(blob);
            }
        }
        await decodeProcessQueue(files);
        BusyStatus.hideBusy();
    } catch (error) {
        BusyStatus.hideBusy();
        alert('图像加载失败：' + error.message);
        console.error('Failed to load image:', error.stack, error.message);
    }
}

// 从粘贴按钮加载图像
async function decodeLoadImageFromPasteButton() {
    try {
        BusyStatus.showBusy();
        const permission = await navigator.permissions.query({ name: 'clipboard-read' });
        if (permission.state === 'granted' || permission.state === 'prompt') {
            const clipboardItems = await navigator.clipboard.read();
            for (const item of clipboardItems) {
                if (item.types.some((type) => type.startsWith('image/'))) {
                    const blob = await item.getType(item.types.find((type) => type.startsWith('image/')));
                    await decodeProcessQueue([blob]);
                } else {
                    throw new Error('剪贴板中没有图像');
                }
            }
        } else {
            throw new Error('未获得剪贴板访问权限');
        }
        BusyStatus.hideBusy();
    } catch (error) {
        BusyStatus.hideBusy();
        alert('图像加载失败：' + error.message);
        console.error('Failed to load image:', error.stack, error.message);
    }
}

// 从拖动加载图像
async function decodeLoadImageFromDrag(event) {
    try {
        BusyStatus.showBusy();
        event.preventDefault();
        const files = event.dataTransfer.files;
        await decodeProcessQueue(files);
        BusyStatus.hideBusy();
    } catch (error) {
        BusyStatus.hideBusy();
        alert('图像加载失败：' + error.message);
        console.error('Failed to load image:', error.stack, error.message);
    }
}

// 保存当前结果
function decodeSaveCurrResult() {
    try {
        BusyStatus.showBusy();
        CloakProcessor.MultiDecoder.saveCurrResult();
        BusyStatus.hideBusy();
    } catch (error) {
        BusyStatus.hideBusy();
        alert('保存结果失败：' + error.message);
        console.error('Failed to save result:', error.stack, error.message);
    }
}

// 保存所有结果
async function decodeSaveAllResults() {
    try {
        BusyStatus.showBusy();
        await CloakProcessor.MultiDecoder.saveAllResults();
        BusyStatus.hideBusy();
    } catch (error) {
        BusyStatus.hideBusy();
        alert('保存结果失败：' + error.message);
        console.error('Failed to save result:', error.stack, error.message);
    }
}

// 设置解码事件监听器
function decodeSetupEventListeners() {
    // 图像加载事件监听
    document.getElementById('decodeImageFileInput').addEventListener('change', decodeLoadImageFile);

    if (!applicationState.isOnPhone) {
        window.addEventListener('paste', decodeLoadImageFromClipboard);
        document.body.addEventListener('drop', decodeLoadImageFromDrag);
    } else {
        document.getElementById('decodePasteButtonInput').addEventListener('click', decodeLoadImageFromPasteButton);
    }
    document.getElementById('decodeSaveButton').addEventListener('click', decodeSaveCurrResult);
    document.getElementById('sidebarSaveAllButton').addEventListener('click', decodeSaveAllResults);
}

// 移除解码事件监听器
function decodeRemoveEventListeners() {
    document.getElementById('decodeImageFileInput').removeEventListener('change', decodeLoadImageFile);
    if (!applicationState.isOnPhone) {
        window.removeEventListener('paste', decodeLoadImageFromClipboard);
        document.body.removeEventListener('drop', decodeLoadImageFromDrag);
    } else {
        document.getElementById('decodePasteButtonInput').removeEventListener('click', decodeLoadImageFromPasteButton);
    }
    document.getElementById('decodeSaveButton').removeEventListener('click', decodeSaveCurrResult);
    document.getElementById('sidebarSaveAllButton').removeEventListener('click', decodeSaveAllResults);
}

const DecodeListeners = {
    decodeSetupEventListeners,
    decodeRemoveEventListeners,
    adjustSidebarWidth,
    showSidebar,
};

export { DecodeListeners };

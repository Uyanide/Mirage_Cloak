import { BusyStatus } from './BusyStatus.js';

// 编码参数更新标准框架
const encodeUpdate = async (callback, event, errorMsg = '操作失败！', isClear = true) => {
    try {
        BusyStatus.showBusy();
        if (isClear) {
            window.CloakProcessor.CloakEncoder.clearOutputCanvas();
        }
        await callback(event);
    } catch (error) {
        alert(errorMsg + error.message);
        console.error('Failed to update:', error.stack, error.message);
    } finally {
        BusyStatus.hideBusy();
    }
};

// 从源加载图像并返回
async function loadImage(input, timeout = 5000) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        let timer;

        img.onload = () => {
            clearTimeout(timer);
            resolve(img);
        };

        img.onerror = (error) => {
            clearTimeout(timer);
            reject(error);
        };

        timer = setTimeout(() => {
            img.src = '';
            reject(new Error('加载图像超时'));
        }, timeout);

        if (typeof input === 'string') {
            img.crossOrigin = 'anonymous';
            img.src = input;
        } else if (input instanceof File) {
            const reader = new FileReader();
            reader.onload = (e) => {
                img.src = e.target.result;
            };
            reader.onerror = (error) => {
                clearTimeout(timer);
                reject(error);
            };
            reader.readAsDataURL(input);
        } else {
            clearTimeout(timer);
            reject(new Error('不支持的输入类型'));
        }
    });
}

// 拖动文件加载图像
async function dragDropLoadImage(event) {
    return new Promise((resolve, reject) => {
        try {
            event.preventDefault();
            if (event.dataTransfer.items) {
                for (const item of event.dataTransfer.items) {
                    if (item.kind === 'file') {
                        const file = item.getAsFile();
                        loadImage(file)
                            .then((img) => {
                                resolve(img);
                            })
                            .catch((error) => {
                                reject(error);
                            });
                    }
                }
            }
        } catch (error) {
            reject(error);
        }
    });
}

// 从文件加载里图
function encodeLoadInnerImageFile(event) {
    encodeUpdate(
        async (event) => {
            await window.CloakProcessor.CloakEncoder.updateInnerImage(await loadImage(event.target.files[0]));
            event.target.value = '';
        },
        event,
        '图像加载失败！'
    );
}

// 从文件加载表图
function encodeLoadCoverImageFile(event) {
    encodeUpdate(
        async (event) => {
            await window.CloakProcessor.CloakEncoder.updateCoverImage(await loadImage(event.target.files[0]));
            event.target.value = '';
        },
        event,
        '图像加载失败！'
    );
}

// 从文件加载隐藏文件
function encodeLoadHiddenFile(event) {
    encodeUpdate(
        async (event) => {
            await window.CloakProcessor.CloakEncoder.updateHiddenFile(event.target.files[0]);
            event.target.value = '';
        },
        event,
        '里文件加载失败！'
    );
}

// 从拖动加载里图
function encodeLoadInnerImageFromDrag(event) {
    encodeUpdate(
        async (event) => {
            await window.CloakProcessor.CloakEncoder.updateInnerImage(await dragDropLoadImage(event));
        },
        event,
        '图像加载失败！'
    );
}

// 从拖动加载表图
function encodeLoadCoverImageFromDrag(event) {
    encodeUpdate(
        async (event) => {
            await window.CloakProcessor.CloakEncoder.updateCoverImage(await dragDropLoadImage(event));
        },
        event,
        '图像加载失败！'
    );
}

// 从拖动加载隐藏文件
function encodeLoadHiddenFileFromDrag(event) {
    encodeUpdate(
        async (event) => {
            event.preventDefault();
            await window.CloakProcessor.CloakEncoder.updateHiddenFile(event.dataTransfer.files[0]);
        },
        event,
        '隐藏文件加载失败！'
    );
}

/******图像参数调整为即时渲染，不使用框架*****/

// 设置里图对比度
function encodeSetInnerContrast(event) {
    window.CloakProcessor.CloakEncoder.clearOutputCanvas();
    window.CloakProcessor.CloakEncoder.adjustInnerContrast(parseInt(event.target.value, 10));
}

// 重置里图对比度
function resetInnerContrast() {
    window.CloakProcessor.CloakEncoder.clearOutputCanvas();
    document.getElementById('innerContrastRange').value = 50;
    window.CloakProcessor.CloakEncoder.adjustInnerContrast(50);
}

// 设置表图对比度
function encodeSetCoverContrast(event) {
    window.CloakProcessor.CloakEncoder.clearOutputCanvas();
    window.CloakProcessor.CloakEncoder.adjustCoverContrast(parseInt(event.target.value, 10));
}

// 重置表图对比度
function resetCoverContrast() {
    window.CloakProcessor.CloakEncoder.clearOutputCanvas();
    document.getElementById('coverContrastRange').value = 50;
    window.CloakProcessor.CloakEncoder.adjustCoverContrast(50);
}

// 设置里图亮度
function encodeSetInnerLuminance(event) {
    window.CloakProcessor.CloakEncoder.clearOutputCanvas();
    window.CloakProcessor.CloakEncoder.adjustInnerLuminance(parseInt(event.target.value, 10));
}

// 重置里图亮度
function resetInnerLuminance() {
    window.CloakProcessor.CloakEncoder.clearOutputCanvas();
    document.getElementById('innerLuminanceRange').value = 50;
    window.CloakProcessor.CloakEncoder.adjustInnerLuminance(50);
}

// 设置表图亮度
function encodeSetCoverLuminance(event) {
    window.CloakProcessor.CloakEncoder.clearOutputCanvas();
    window.CloakProcessor.CloakEncoder.adjustCoverLuminance(parseInt(event.target.value, 10));
}

// 重置表图亮度
function resetCoverLuminance() {
    window.CloakProcessor.CloakEncoder.clearOutputCanvas();
    document.getElementById('coverLuminanceRange').value = 50;
    window.CloakProcessor.CloakEncoder.adjustCoverLuminance(50);
}

// 设置是否添加水印
function encodeSetIsAddMark(event) {
    window.CloakProcessor.CloakEncoder.clearOutputCanvas();
    window.CloakProcessor.CloakEncoder.setIsAddMark(event.target.checked);
}

/******************************************/

// 设置指定输出图像大小
function encodeSetMirageSize() {
    encodeUpdate(
        async () => {
            const size = parseInt(document.getElementById('mirageSizeInput').value, 10);
            if (size < 0 || size > 10000) {
                throw new Error('无效的输出图像大小');
            }
            await window.CloakProcessor.CloakEncoder.setMirageSize(size);
        },
        undefined,
        '设置输出图像大小失败！'
    );
}

// 设置是否压缩隐写图像
function encodeSetIsCompress(event) {
    encodeUpdate(async (event) => {
        await window.CloakProcessor.CloakEncoder.setIsCompress(event.target.checked);
    }, event);
}

// 设置噪声强度
function encodeSetDiff(event) {
    clearTimeout(window.applicationState.diffInputTimeout);

    window.applicationState.diffInputTimeout = setTimeout(() => {
        encodeUpdate(async (event) => {
            let diff = parseInt(event.target.value, 10);
            if (isNaN(diff)) {
                return;
            }
            if (diff > window.applicationState.defaultArguments.max_difference) {
                diff = window.applicationState.defaultArguments.max_difference;
                event.target.value = window.applicationState.defaultArguments.max_difference;
            } else if (diff < window.applicationState.defaultArguments.min_difference) {
                diff = window.applicationState.defaultArguments.min_difference;
                event.target.value = window.applicationState.defaultArguments.min_difference;
            }
            await window.CloakProcessor.CloakEncoder.setDiff(diff * 6);
        }, event);
    }, 500);
}

// 设置编码方法
function encodeSetMethod(event) {
    encodeUpdate(async () => {
        await setDiffHelper(event.target.value);
    }, event);
}
function setVisibility(className, isVisible) {
    const elements = document.getElementsByClassName(className);
    for (let i = 0; i < elements.length; i++) {
        if (isVisible) {
            elements[i].classList.remove('hidden');
        } else {
            elements[i].classList.add('hidden');
        }
    }
}
const setDiffHelper = async (version) => {
    const encodeDiffInputHint = document.getElementById('encodeDiffinputHint');
    const encodeDiffInput = document.getElementById('encodeDiffInput');
    const encodeInnerInputLabel = document.getElementById('innerSourceFileInput').previousElementSibling;
    switch (version) {
        case '1': // 双极
            encodeDiffInputHint.innerText = `(${window.applicationState.defaultArguments.min_difference}-${window.applicationState.defaultArguments.max_difference}, 越大抗干扰能力越强, 但幻影坦克效果越差)`;
            encodeDiffInput.value = Math.floor(window.applicationState.defaultArguments.version_1.difference / 6);
            if (window.CloakProcessor.CloakEncoder !== undefined) {
                await window.CloakProcessor.CloakEncoder.setVersion(parseInt(version, 10));
                await window.CloakProcessor.CloakEncoder.setDiff(window.applicationState.defaultArguments.version_1.difference);
            }
            setVisibility('encodeCoverInput', true);
            setVisibility('encodeEncryptFileInput', true);
            setVisibility('isAddMarkContainer', true);
            setVisibility('encodeDiffInputContainer', true);
            setVisibility('isEncodeCompressCheckboxContainer', true);
            encodeInnerInputLabel.innerText = '选择幻坦里图';
            break;
        case '2': // 四极
            encodeDiffInputHint.innerText = `(${window.applicationState.defaultArguments.min_difference}-${window.applicationState.defaultArguments.max_difference}, 越大抗干扰能力越强, 但幻影坦克效果越差)`;
            encodeDiffInput.value = Math.floor(window.applicationState.defaultArguments.version_2.difference / 6);
            if (window.CloakProcessor.CloakEncoder !== undefined) {
                await window.CloakProcessor.CloakEncoder.setVersion(parseInt(version, 10));
                await window.CloakProcessor.CloakEncoder.setDiff(window.applicationState.defaultArguments.version_2.difference);
            }
            setVisibility('encodeCoverInput', true);
            setVisibility('encodeEncryptFileInput', true);
            setVisibility('isAddMarkContainer', true);
            setVisibility('encodeDiffInputContainer', true);
            setVisibility('isEncodeCompressCheckboxContainer', true);
            encodeInnerInputLabel.innerText = '选择幻坦里图';
            break;
        case '0': // 无影棋盘
            encodeDiffInputHint.innerText = `(${window.applicationState.defaultArguments.min_difference}-${window.applicationState.defaultArguments.max_difference}, 越大隐写信息密度越高, 但幻影坦克效果越差)`;
            encodeDiffInput.value = Math.ceil(window.applicationState.defaultArguments.version_0.difference / 6);
            if (window.CloakProcessor.CloakEncoder !== undefined) {
                await window.CloakProcessor.CloakEncoder.setDiff(
                    window.applicationState.defaultArguments.version_0.difference,
                    false
                );
                await window.CloakProcessor.CloakEncoder.setVersion(parseInt(version, 10));
            }
            setVisibility('encodeCoverInput', true);
            setVisibility('encodeEncryptFileInput', true);
            setVisibility('isAddMarkContainer', true);
            setVisibility('encodeDiffInputContainer', true);
            setVisibility('isEncodeCompressCheckboxContainer', true);
            encodeInnerInputLabel.innerText = '选择幻坦里图';
            break;
        case '3': // 传统无影
            encodeDiffInputHint.innerText = `(${window.applicationState.defaultArguments.min_difference}-${window.applicationState.defaultArguments.max_difference}, 越大隐写信息密度越高, 但输出图像质量越差)`;
            encodeDiffInput.value = Math.ceil(window.applicationState.defaultArguments.version_3.difference / 6);
            if (window.CloakProcessor.CloakEncoder !== undefined) {
                await window.CloakProcessor.CloakEncoder.setDiff(
                    window.applicationState.defaultArguments.version_3.difference,
                    false
                );
                await window.CloakProcessor.CloakEncoder.setVersion(parseInt(version, 10));
            }
            setVisibility('encodeCoverInput', false);
            setVisibility('encodeEncryptFileInput', true);
            setVisibility('isAddMarkContainer', true);
            setVisibility('encodeDiffInputContainer', true);
            setVisibility('isEncodeCompressCheckboxContainer', true);
            encodeInnerInputLabel.innerText = '选择表图';
            break;
        case '4': // 黑白幻影
            encodeDiffInputHint.innerText = `制作纯幻影坦克时此设置项无效`;
            encodeDiffInput.value = 0;
            if (window.CloakProcessor.CloakEncoder !== undefined) {
                await window.CloakProcessor.CloakEncoder.setVersion(parseInt(version, 10));
            }
            setVisibility('encodeCoverInput', true);
            setVisibility('encodeEncryptFileInput', false);
            setVisibility('isAddMarkContainer', false);
            setVisibility('encodeDiffInputContainer', false);
            setVisibility('isEncodeCompressCheckboxContainer', false);
            encodeInnerInputLabel.innerText = '选择幻坦里图';
            break;
        case '5': // 全彩幻影
            encodeDiffInputHint.innerText = `制作纯幻影坦克时此设置项无效`;
            encodeDiffInput.value = 0;
            if (window.CloakProcessor.CloakEncoder !== undefined) {
                await window.CloakProcessor.CloakEncoder.setVersion(parseInt(version, 10));
            }
            setVisibility('encodeCoverInput', true);
            setVisibility('encodeEncryptFileInput', false);
            setVisibility('isAddMarkContainer', false);
            setVisibility('encodeDiffInputContainer', false);
            setVisibility('isEncodeCompressCheckboxContainer', false);
            encodeInnerInputLabel.innerText = '选择幻坦里图';
            break;
    }
};

// 处理图像
function encodeProcessImage() {
    encodeUpdate(
        () => {
            window.CloakProcessor.CloakEncoder.process();
        },
        undefined,
        '图像处理失败！'
    );
}

// 保存图像
function encodeSaveImage() {
    // 同上
    encodeUpdate(
        () => {
            window.CloakProcessor.CloakEncoder.saveOutputImage();
        },
        undefined,
        '图像保存失败！',
        false
    );
}

// 切换编码信息显示
function toggleEncodeInfo(event) {
    const encodeInfo = document.getElementById('encodeMethodDescription');
    if (event.target.innerText.startsWith('隐藏')) {
        event.target.innerText = '显示各模式说明';
        encodeInfo.classList.remove('displayFlex');
    } else {
        event.target.innerText = '隐藏各模式说明';
        encodeInfo.classList.add('displayFlex');
    }
}

// 编码监听事件列表
window.applicationState.encodeEvents = [
    { id: 'innerSourceFileInput', event: 'change', handler: encodeLoadInnerImageFile },
    { id: 'coverSourceFileInput', event: 'change', handler: encodeLoadCoverImageFile },
    { id: 'hiddenSourceFileInput', event: 'change', handler: encodeLoadHiddenFile },
    { id: 'innerContrastRange', event: 'input', handler: encodeSetInnerContrast },
    { id: 'coverContrastRange', event: 'input', handler: encodeSetCoverContrast },
    { id: 'innerResetContrastButton', event: 'click', handler: resetInnerContrast },
    { id: 'coverResetContrastButton', event: 'click', handler: resetCoverContrast },
    { id: 'innerLuminanceRange', event: 'input', handler: encodeSetInnerLuminance },
    { id: 'coverLuminanceRange', event: 'input', handler: encodeSetCoverLuminance },
    { id: 'innerResetLuminanceButton', event: 'click', handler: resetInnerLuminance },
    { id: 'coverResetLuminanceButton', event: 'click', handler: resetCoverLuminance },
    { id: 'mirageSizeConfirmButton', event: 'click', handler: encodeSetMirageSize },
    { id: 'isAddMarkCheckbox', event: 'change', handler: encodeSetIsAddMark },
    { id: 'isEncodeCompressCheckbox', event: 'change', handler: encodeSetIsCompress },
    { id: 'encodeDiffInput', event: 'change', handler: encodeSetDiff },
    { id: 'encodeMethodSelect', event: 'change', handler: encodeSetMethod },
    { id: 'encodeProcessButton', event: 'click', handler: encodeProcessImage },
    { id: 'encodeSaveButton', event: 'click', handler: encodeSaveImage },
    { id: 'encodeInfoToggle', event: 'click', handler: toggleEncodeInfo },
];
window.applicationState.encodeDragEvents = [
    { id: 'innerCanvas', event: 'drop', handler: encodeLoadInnerImageFromDrag },
    { id: 'coverCanvas', event: 'drop', handler: encodeLoadCoverImageFromDrag },
    { id: 'hiddenMetaCanvas', event: 'drop', handler: encodeLoadHiddenFileFromDrag },
];

// 设置编码事件监听器
function encodeSetUpEventListeners() {
    window.applicationState.encodeEvents.forEach(({ id, event, handler }) => {
        document.getElementById(id).addEventListener(event, handler);
    });

    if (!window.applicationState.isOnPhone) {
        window.applicationState.encodeDragEvents.forEach(({ id, event, handler }) => {
            document.getElementById(id).addEventListener(event, handler);
        });
    }
}

// 移除编码事件监听器
function encodeRemoveEventListeners() {
    window.applicationState.encodeEvents.forEach(({ id, event, handler }) => {
        document.getElementById(id).removeEventListener(event, handler);
    });

    if (!window.applicationState.isOnPhone) {
        window.applicationState.encodeDragEvents.forEach(({ id, event, handler }) => {
            document.getElementById(id).removeEventListener(event, handler);
        });
    }
}

const EncodeListeners = {
    setDiffHelper,
    encodeSetUpEventListeners,
    encodeRemoveEventListeners,
};

export { EncodeListeners };

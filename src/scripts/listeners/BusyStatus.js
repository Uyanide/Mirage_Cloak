const showBusy = () => {
    if (!window.applicationState.isBusy) {
        window.applicationState.isBusy = true;
        const busyStatusElement = document.getElementById('busyStatus');
        busyStatusElement.style.display = 'flex';
    }
};

const hideBusy = () => {
    if (window.applicationState.isBusy) {
        window.applicationState.isBusy = false;
        const busyStatusElement = document.getElementById('busyStatus');
        busyStatusElement.style.display = 'none';
    }
};

const BusyStatus = {
    showBusy,
    hideBusy,
};

export { BusyStatus };

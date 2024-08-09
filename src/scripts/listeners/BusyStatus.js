const showBusy = () => {
    if (!applicationState.isBusy) {
        applicationState.isBusy = true;
        const busyStatusElement = document.getElementById('busyStatus');
        busyStatusElement.style.display = 'flex';
    }
};

const hideBusy = () => {
    if (applicationState.isBusy) {
        applicationState.isBusy = false;
        const busyStatusElement = document.getElementById('busyStatus');
        busyStatusElement.style.display = 'none';
    }
};

const BusyStatus = {
    showBusy,
    hideBusy
};

export { BusyStatus };
import { encode } from 'fast-png';
const messageQueue = [];
let isProcessing = false;

self.onmessage = async (event) => {
    messageQueue.push(event.data);
    if (!isProcessing) {
        processQueue();
    }
};

async function processQueue() {
    if (messageQueue.length === 0) {
        isProcessing = false;
        return;
    }

    isProcessing = true;
    const data = messageQueue.shift();

    try {
        const pngBlob = new Blob([encode(data)], { type: 'image/png' });

        postMessage({
            success: true, result: {
                url: URL.createObjectURL(pngBlob),
                fileName: `encoded_${new Date().getTime()}.png`
            }
        });
    } catch (error) {
        postMessage({ success: false, error: error });
    } finally {
        isProcessing = false;
        if (messageQueue.length > 0) {
            processQueue();
        }
    }
}
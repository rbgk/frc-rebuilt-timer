// https://developer.mozilla.org/en-US/docs/Web/API/Screen_Wake_Lock_API

// Request wake lock
async function requestWakeLock() {
    if ('wakeLock' in navigator) {
        try {
            // not tracking wakeLock release, just request it each time
            await navigator.wakeLock.request('screen');
        } catch (err) {
            warnUser(`Wake lock request failed: ${err.name}, ${err.message}`);
        }
    } else {
        warnUser('Prevent Screen Dim is not supported by this browser');
    }
}

// Detect first user interaction
document.addEventListener('pointerdown', async () => {
    await requestWakeLock();
}, { once: true });

// Re-request wake lock when the page becomes visible again; if app became inactive
document.addEventListener('visibilitychange', async () => {
    if (document.visibilityState === 'visible') {
        await requestWakeLock();
    }
});

function warnUser(msg) {
    const warningBox = document.getElementById("warningBox");
    warningBox.innerText = msg;
    warningBox.classList.remove("notify");
    void warningBox.offsetWidth;
    warningBox.classList.add("notify");
}

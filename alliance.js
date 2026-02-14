const ActiveHub = "ActiveHub";
const cookieDomain = "rbgk.github.io/frc-rebuilt-timer";
const expireTime = 365;

function getCookie(key) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${key}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Setting a cookie
function setCookie(key, value, days, domain) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    const domainStr = domain ? "; domain=" + domain : "";
    document.cookie = `${key}=${value || ""}${expires}; path=/${domainStr}`;
}

function init() {
    setCookie(ActiveHub, "red");
    alliance_color = getCookie(ActiveHub);
    document.getElementById("body").style.backgroundColor = "var(--r-alliance)";

    let flashSetting = localStorage.getItem("flashSetting");
    if (flashSetting === null) {
        localStorage.setItem("flashSetting", "off");
        flashOff.style.display = "inline-block";
        flashOn.style.display = "none";

    } else if (flashSetting == "true") {
        flashOff.style.display = "none";
        flashOn.style.display = "inline-block";

    } else if (flashSetting == "off") {
        flashOff.style.display = "inline-block";
        flashOn.style.display = "none";

    }
}

function switchHub() {
    getCookie(ActiveHub) === "red" ? setCookie(ActiveHub, "blue") : setCookie(ActiveHub, "red");

    switch (getCookie(ActiveHub)) {
        case "red":
            document.getElementById("body").style.backgroundColor = "var(--r-alliance)";
            break;

        case "blue":
            document.getElementById("body").style.backgroundColor = "var(--b-alliance)";
            break;
    }
}

function vibrate() {
    let pause = 50;
    let pulse = 250;
    let one = 1000;
    window.navigator.vibrate([one, pause, one, pause, pulse, pause, pulse, pause, pulse, pause, pulse]);
}

const WinAutoToggle = document.getElementById('WinAutoToggle');
const WinAutoNo = document.getElementById('WinAutoNo');
const WinAutoYes = document.getElementById('WinAutoYes');
let AutoWinner = false;
WinAutoToggle.addEventListener('click', () => {
    AutoWinner = !AutoWinner; // toggle state
    AutoWinner ? (WinAutoYes.style.display = "inline-block", WinAutoNo.style.display = "none" ): (WinAutoNo.style.display = "inline-block", WinAutoYes.style.display = "none"); // update button text
    AutoWinnerHub();
});

const flashToggle = document.getElementById('flashToggle');
const flashOff = document.getElementById('flashOff');
const flashOn = document.getElementById('flashOn');
let flashSetting = localStorage.getItem("flashSetting") === "true";
flashToggle.addEventListener('click', () => {
    flashSetting = !flashSetting; // toggle state
    flashSetting ? (flashOn.style.display = "inline-block", flashOff.style.display = "none",  localStorage.setItem("flashSetting", true)) : (flashOff.style.display = "inline-block", flashOn.style.display = "none", localStorage.setItem("flashSetting", "off")); // update localStorage and toggle
    flashSetting ? flash(brightFlashPerSecond, 2) : killFlash();
});

let flashInterval;
const brightFlashPerSecond = 6; // Count visual flash per second; 3 green-black pairs
const totalFlashDurationSec = 7; // Visual flash for how many seconds; 7 seconds
function flash(brightFlashPerSecond, totalFlashDurationSec) {
    if (flashSetting == true) { // Only flash if user enabled
        const flashDiv = document.getElementById("flashDiv");
        flashDiv.style.display = "block";
        flashDiv.style.backgroundColor = "var(--brights)";
        let flashActive = false;

        flashInterval = setInterval(() => {
            flashDiv.style.backgroundColor = flashActive ? 'var(--brights)' : 'var(--black)';
            flashActive = !flashActive;
        }, 1000/brightFlashPerSecond);

        setTimeout(() => {
            flashDiv.style.display = "none";
            clearInterval(flashInterval);
        }, 1000*totalFlashDurationSec);
    }
}

function killFlash() {
    flashDiv.style.display = "none";
    clearInterval(flashInterval);

}

function chooseAlliance() {
    switchHub();
    alliance_color = getCookie(ActiveHub);

    switch (alliance_color) {
        case "red":
            document.getElementById("alliance_color").textContent = "red";
            break;

        case "blue":
            document.getElementById("alliance_color").textContent = "blue";
            break;
    }
}

function AutoWinnerHub() {
    switch (phase.textContent) {
        case "Shift 1":
        case "Shift 2":
        case "Shift 3":
        case "Shift 4":
            switchHub();
            break;

        default:
            // do nothing
            break;
    }
}

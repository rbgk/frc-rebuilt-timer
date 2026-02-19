const audioCavalryCharge = document.getElementById("audioCavalryCharge");
const audioBuzzer = document.getElementById("audioBuzzer");
const audioThreeBells = document.getElementById("audioThreeBells");
const audioShift = document.getElementById("audioShift");
const audioEndGame = document.getElementById("audioEndGame");
const audioSonar = document.getElementById("audioSonar");

function matchCavalryCharge() {
    audioCavalryCharge.play();
}

function matchBuzzer() {
    audioBuzzer.play();
}

function matchThreeBells() {
    audioThreeBells.play();
}

function matchShift() {
    audioShift.play();
}

function matchSonar() {
    audioSonar.play();
}

function matchEndGame() {
    audioEndGame.play();
}

function killAudio() {
    document.querySelectorAll("audio").forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });
}
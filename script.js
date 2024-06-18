// script.js

let startPauseButton = document.getElementById('startPause');
let resetButton = document.getElementById('reset');
let lapButton = document.getElementById('lap');
let minutesElement = document.getElementById('minutes');
let secondsElement = document.getElementById('seconds');
let millisecondsElement = document.getElementById('milliseconds');
let lapsList = document.getElementById('lapsList');

let timer;
let running = false;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;

function startPause() {
    if (running) {
        clearInterval(timer);
        startPauseButton.textContent = 'Start';
    } else {
        timer = setInterval(updateTime, 10);
        startPauseButton.textContent = 'Pause';
    }
    running = !running;
}

function reset() {
    clearInterval(timer);
    running = false;
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    updateDisplay();
    startPauseButton.textContent = 'Start';
    lapsList.innerHTML = '';
}

function lap() {
    if (running) {
        let lapTime = formatTime(minutes) + ':' + formatTime(seconds) + ':' + formatTime(milliseconds);
        let li = document.createElement('li');
        li.textContent = lapTime;
        lapsList.appendChild(li);
    }
}

function updateTime() {
    milliseconds += 1;
    if (milliseconds === 100) {
        milliseconds = 0;
        seconds += 1;
    }
    if (seconds === 60) {
        seconds = 0;
        minutes += 1;
    }
    updateDisplay();
}

function updateDisplay() {
    minutesElement.textContent = formatTime(minutes);
    secondsElement.textContent = formatTime(seconds);
    millisecondsElement.textContent = formatTime(milliseconds);
}

function formatTime(unit) {
    return unit < 10 ? '0' + unit : unit;
}

startPauseButton.addEventListener('click', startPause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);

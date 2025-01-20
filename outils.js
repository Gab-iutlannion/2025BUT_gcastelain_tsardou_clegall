// chronometre
let startTime;
let elapsedTime = 0;
let timerInterval;

function timeToString(time) {
    const milliseconds = Math.floor((time % 1000) / 10).toString().padStart(2, '0');
    const seconds = Math.floor((time / 1000) % 60).toString().padStart(2, '0');
    const minutes = Math.floor((time / (1000 * 60)) % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
}

function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        document.getElementById('time').textContent = timeToString(elapsedTime);
    }, 10);
}

function stop() {
    clearInterval(timerInterval);
}

function reset() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    document.getElementById('time').textContent = "00:00:00";
}

document.getElementById('start').addEventListener('click', start);
document.getElementById('stop').addEventListener('click', stop);
document.getElementById('reset').addEventListener('click', reset);



//Slider
let slider = document.querySelector(".slider");
let showGraphic = document.getElementById("show-graphic");
let showGame = document.getElementById("show-game");


showGraphic.addEventListener('click', () => {
    slider.style.left = '520px';
});

showGame.addEventListener('click', () => {
    slider.style.left = '715px';
});

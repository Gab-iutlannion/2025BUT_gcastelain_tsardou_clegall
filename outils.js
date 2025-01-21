//Onglets
const graphicSection = document.getElementById('graphic-section');
const gameSection = document.getElementById('game-section');
const chronoSection = document.getElementById('chrono');
const showGraphicButton = document.getElementById('show-graphic');
const showGameButton = document.getElementById('show-game');


showGraphicButton.addEventListener('click', () => {
    graphicSection.style.display = 'block';
    gameSection.style.display = 'none';
    chronoSection.style.display = 'none';
});

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



//Bouton jeu
showGameButton.addEventListener('click', () => {
    graphicSection.style.display = 'none';
    gameSection.style.display = 'block';
    chronoSection.style.display = 'block';
    document.getElementById('interface-jeu').style.display = 'none';
    

});

document.getElementById('start-button').addEventListener('click', function() {
    document.getElementById('start-section').style.display = 'none';
    document.getElementById('play-section').style.display = 'block';
    document.getElementById('interface-jeu').style.display = 'block';
    document.getElementById('stop').style.display = 'block';
    document.getElementById('reset').style.display = 'block';

});

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



document.getElementById('start-button').addEventListener('click', start);
document.getElementById('stop').addEventListener('click', stop);







document.addEventListener('DOMContentLoaded', () => {
    const introScreen = document.getElementById('introScreen');
    const startButton = document.getElementById('startButton');

    startButton.addEventListener('click', () => {
        introScreen.style.display = 'none';
        initGame(); // from game.js
    });
});

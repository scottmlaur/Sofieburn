// intro.js

document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('start-btn');
  const introScreen = document.getElementById('intro-screen');
  const gameCanvas = document.getElementById('gameCanvas');

  startBtn.addEventListener('click', () => {
    // Hide intro screen
    introScreen.style.display = 'none';

    // Show game canvas
    gameCanvas.style.display = 'block';

    // Start the game
    if (typeof window.initGame === 'function') {
      window.initGame();
    } else {
      console.error('initGame() not found. Make sure main.js exposes it globally.');
    }
  });
});

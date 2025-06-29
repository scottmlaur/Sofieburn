window.addEventListener('DOMContentLoaded', () => {
  const introScreen = document.getElementById('intro-screen');
  const gameCanvas = document.getElementById('gameCanvas');

  // Start with canvas hidden
  gameCanvas.style.display = 'none';

  const startGame = () => {
    introScreen.style.display = 'none';
    gameCanvas.style.display = 'block';

    // Optional: add fade-in effect
    gameCanvas.style.opacity = 0;
    setTimeout(() => {
      gameCanvas.style.transition = 'opacity 1s';
      gameCanvas.style.opacity = 1;
    }, 50);

    // Now call game logic if needed
    if (typeof initGame === 'function') {
      initGame();
    }
  };

  document.body.addEventListener('click', startGame, { once: true });
});

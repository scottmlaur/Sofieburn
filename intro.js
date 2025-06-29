window.addEventListener('DOMContentLoaded', () => {
  const introScreen = document.getElementById('intro-screen');
  const gameCanvas = document.getElementById('gameCanvas');

  // Hide game canvas initially
  gameCanvas.style.display = 'none';

  const startGame = () => {
    introScreen.style.display = 'none';
    gameCanvas.style.display = 'block';

    // Wait 1 frame before calling
    setTimeout(() => {
      if (typeof initGame === 'function') {
        initGame();
      } else {
        console.error("initGame is not defined");
      }
    }, 50);
  };

  document.body.addEventListener('click', startGame, { once: true });
});

document.addEventListener('DOMContentLoaded', () => {
  console.log('🔥 DOM Ready, binding start button');

  const startButton = document.getElementById('startButton');
  const introScreen = document.getElementById('intro-screen');
  const gameCanvas = document.getElementById('gameCanvas');
  const ctx = gameCanvas?.getContext('2d');

  if (!startButton || !introScreen || !gameCanvas || !ctx) {
    console.error('❌ Missing elements in DOM. Check your HTML IDs.');
    return;
  }

  startButton.addEventListener('click', () => {
    console.log('🚀 Starting game...');
    introScreen.style.display = 'none';
    gameCanvas.style.display = 'block';

    const bgImage = new Image();
    bgImage.src = 'assets/backgrounds/sanctuary_bg.png';

    bgImage.onload = () => {
      requestAnimationFrame(gameLoop);
    };

    function gameLoop() {
      ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
      ctx.drawImage(bgImage, 0, 0, gameCanvas.width, gameCanvas.height);
      requestAnimationFrame(gameLoop);
    }
  });
});

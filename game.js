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
    console.log('🚀 Start button clicked');
    introScreen.style.display = 'none';
    gameCanvas.style.display = 'block';

    gameCanvas.width = window.innerWidth;
    gameCanvas.height = window.innerHeight;

    fetch('flappy-level.json')  // ✅ FIXED: removed "./"
      .then(response => response.json())
      .then(levelData => {
        console.log('📦 Detailed level loaded:', levelData);
      })
      .catch(error => {
        console.error('❌ Failed to load flappy-level.json:', error);
      });

    const bgImage = new Image();
    bgImage.src = 'assets/backgrounds/sanctuary_bg.png';

    const candleImage = new Image();
    candleImage.src = './assets/characters/candle.png';

    const candle = {
      x: gameCanvas.width / 4,
      y: gameCanvas.height / 2,
      width: 50,
      height: 80
    };

    bgImage.onload = () => {
      console.log('🖼️ Background image loaded.');

      if (candleImage.complete) {
        console.log('🕯️ Candle image already loaded.');
        requestAnimationFrame(gameLoop);
      } else {
        candleImage.onload = () => {
          console.log('🕯️ Candle image loaded.');
          requestAnimationFrame(gameLoop);
        };
      }
    };

    candleImage.onerror = () => {
      console.error('❌ Failed to load candle image. Check path: ./assets/characters/candle.png');
    };

    function drawCandle() {
      ctx.drawImage(candleImage, candle.x, candle.y, candle.width, candle.height);
    }

    function gameLoop() {
      ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
      ctx.drawImage(bgImage, 0, 0, gameCanvas.width, gameCanvas.height);
      drawCandle();
      requestAnimationFrame(gameLoop);
    }
  });
});

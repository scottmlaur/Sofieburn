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

    let bgReady = false;
    let candleReady = false;
    let jsonReady = false;

    function tryStart() {
      if (bgReady && candleReady && jsonReady) {
        requestAnimationFrame(gameLoop);
      }
    }

    fetch('./flappy-level.json')
      .then(response => {
        if (!response.ok) throw new Error('Failed to load flappy-level.json');
        return response.json();
      })
      .then(data => {
        console.log('📜 Detailed level loaded:', data);
        if (data.birdStartX !== undefined) candle.x = data.birdStartX;
        if (data.birdStartY !== undefined) candle.y = data.birdStartY;
        jsonReady = true;
        tryStart();
      })
      .catch(error => {
        console.error('❌ Failed to load flappy-level.json:', error);
      });

    bgImage.onload = () => {
      console.log('🖼️ Background image loaded.');
      bgReady = true;
      tryStart();
    };

    if (candleImage.complete) {
      console.log('🕯️ Candle image already loaded.');
      candleReady = true;
      tryStart();
    } else {
      candleImage.onload = () => {
        console.log('🕯️ Candle image loaded.');
        candleReady = true;
        tryStart();
      };
    }

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

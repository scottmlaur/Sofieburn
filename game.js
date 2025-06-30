document.addEventListener('DOMContentLoaded', () => {
  console.log('🕯️ DOM Ready, binding start button');

  startButton.addEventListener('click', () => {
    console.log('🔥 Start button clicked');

    // Load background and candle
    bgImage.onload = () => {
      console.log('🌒 Background image loaded.');
    };
    bgImage.src = 'assets/characters/intro.png';

    if (candleImage.complete) {
      console.log('🕯️ Candle image already loaded.');
    } else {
      candleImage.onload = () => {
        console.log('🕯️ Candle image loaded.');
      };
    }

    // ✅ Load flappy-level.json
    fetch('./flappy-level.json')
      .then(response => {
        if (!response.ok) throw new Error('Failed to load flappy-level.json');
        return response.json();
      })
      .then(data => {
        console.log('✅ Flappy Level loaded:', data);
        // Do not apply yet — just confirm presence
      })
      .catch(error => {
        console.error('❌ Error loading flappy-level.json:', error);
      });

    gameLoop(); // Start game loop
  });

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

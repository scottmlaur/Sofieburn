document.addEventListener('DOMContentLoaded', () => {
  console.log('🕯️ DOM Ready, binding start button');

  const startButton = document.getElementById('start-button');
  startButton.addEventListener('click', () => {
    console.log('🔥 Start button clicked');

    fetch('./flappy-level.json')
      .then((response) => response.json())
      .then((levelData) => {
        console.log('📦 Detailed level loaded:', levelData);

        // Continue game logic with levelData here...
        // Example:
        // initGame(levelData); // ← Uncomment and define if needed

        const bgImage = new Image();
        bgImage.src = 'assets/obstacles/intro.png';
        bgImage.onload = () => {
          console.log('🌄 Background image loaded.');
          // draw background, etc.
        };

        const candleImage = new Image();
        candleImage.src = 'assets/obstacles/pipe_bottom_stone.png';
        candleImage.onload = () => {
          console.log('🕯️ Candle image loaded.');
          // draw candle, etc.
        };
      })
      .catch((error) => {
        console.error('❌ Failed to load flappy-level.json', error);
      });
  });
});

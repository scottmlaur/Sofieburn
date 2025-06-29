function initGame() {
  const container = document.getElementById('game-container');
  container.innerHTML = ''; // Clear intro

  // Create canvas
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 600;
  canvas.style.display = 'block';
  canvas.style.margin = '0 auto';
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');

  // Load candle sprite (placeholder path)
  const candle = new Image();
  candle.src = 'assets/candle_idle.png'; // Replace with your actual asset

  // Set initial position
  let candleX = 100;
  let candleY = 250;
  let velocityY = 0;
  const gravity = 0.5;
  const lift = -10;

  // Handle input
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
      velocityY = lift;
    }
  });

  // Game loop
  function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update position
    velocityY += gravity;
    candleY += velocityY;

    // Simple floor collision
    if (candleY > canvas.height - 50) {
      candleY = canvas.height - 50;
      velocityY = 0;
    }

    // Draw sprite
    ctx.drawImage(candle, candleX, candleY, 40, 40);

    requestAnimationFrame(gameLoop);
  }

  candle.onload = () => {
    gameLoop(); // Start loop after sprite loads
  };
}

// Expose to intro.js
window.initGame = initGame;

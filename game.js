// Game variables
let canvas, ctx;
let gameStarted = false;

function initGame() {
  // DOM elements
  const introImage = document.getElementById('introImage');
  canvas = document.getElementById('gameCanvas');
  ctx = canvas.getContext('2d');

  // Hide intro image, show game canvas
  if (introImage) introImage.style.display = 'none';
  if (canvas) canvas.style.display = 'block';

  // Set canvas size (optional, match CSS or set fixed)
  canvas.width = 800;
  canvas.height = 600;

  // Clear canvas and draw initial screen
  ctx.fillStyle = '#111';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#fca396';
  ctx.font = '28px Courier New';
  ctx.fillText('Welcome to SofieBurn', 260, 280);
  ctx.fillText('Get ready...', 330, 320);

  // Initialize game loop
  gameStarted = true;
  requestAnimationFrame(gameLoop);
}

function gameLoop() {
  if (!gameStarted) return;

  // Clear previous frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw background (placeholder)
  ctx.fillStyle = '#111';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw candle (placeholder)
  ctx.fillStyle = '#fca396';
  ctx.beginPath();
  ctx.arc(100, 300, 20, 0, Math.PI * 2);
  ctx.fill();

  // Next frame
  requestAnimationFrame(gameLoop);
}

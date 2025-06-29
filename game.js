function initGame() {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');

  // Clear canvas and fill background
  ctx.fillStyle = '#111';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw simple placeholder flame
  ctx.fillStyle = '#fda997';
  ctx.beginPath();
  ctx.arc(400, 300, 40, 0, Math.PI * 2);
  ctx.fill();

  // You can replace this with loading levels, sprites, etc.
  console.log('Game initialized');
}

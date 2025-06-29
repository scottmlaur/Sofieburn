document.getElementById('startButton').addEventListener('click', initGame);

function initGame() {
  const introImage = document.getElementById('introImage');
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');

  // Hide intro image and show canvas
  introImage.style.display = 'none';
  canvas.style.display = 'block';

  // Draw something simple for now
  ctx.fillStyle = 'orange';
  ctx.font = '48px Courier New';
  ctx.fillText('🔥 SofieBurn Begins 🔥', 150, 300);
}

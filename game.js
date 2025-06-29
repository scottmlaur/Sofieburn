// Global Variables
let canvas, ctx;
let background = new Image();
background.src = 'assets/backgrounds/sanctuary_bg.png';

function initGame() {
  console.log("🔥 initGame() fired");

  // Get DOM elements
  canvas = document.getElementById('gameCanvas');
  ctx = canvas.getContext('2d');
  document.getElementById('introImage').style.display = 'none';
  canvas.style.display = 'block';

  // When the background is loaded, start the game loop
  background.onload = () => {
    requestAnimationFrame(gameLoop);
  };
}

// Main Game Loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw background
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  // Example debug text
  ctx.fillStyle = 'white';
  ctx.font = '32px Courier New';
  ctx.fillText("SofieBurn Running 🕯️", 220, 300);

  requestAnimationFrame(gameLoop);
}

// Event Binding (wait for DOM to be ready)
window.addEventListener('DOMContentLoaded', () => {
  console.log("🔥 DOM Ready, binding start button");
  document.getElementById('startButton').addEventListener('click', initGame);
});

let canvas, ctx;
let background = new Image();
let backgroundLoaded = false;

function initGame() {
  console.log("🔥 initGame() fired");

  // Setup canvas and context
  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");

  // Load background
  background.src = "assets/backgrounds/sanctuary_bg.png";
  background.onload = () => {
    console.log("🖼️ Background loaded");
    backgroundLoaded = true;
    requestAnimationFrame(gameLoop);
  };
}

function gameLoop() {
  if (!backgroundLoaded) return;

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw background
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  // TODO: Add candle, pipes, physics, etc.

  requestAnimationFrame(gameLoop);
}

// Wait for DOM to load and bind start button
document.addEventListener("DOMContentLoaded", () => {
  console.log("🔥 DOM Ready, binding start button");

  const startButton = document.getElementById("startButton");
  const introContainer = document.getElementById("introContainer");
  const gameCanvas = document.getElementById("gameCanvas");

  startButton.addEventListener("click", () => {
    introContainer.style.display = "none";
    gameCanvas.style.display = "block";
    initGame();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  console.log("🔥 DOM Ready, binding start button");

  const startButton = document.getElementById("start-button");
  startButton.addEventListener("click", startGame);
});

let canvas, ctx;
let level = null;
let backgroundImg = new Image();
let candle = {
  x: 100,
  y: 200,
  width: 20,
  height: 40,
  vy: 0
};

function startGame() {
  console.log("🔥 Game started");

  document.getElementById("intro-screen").style.display = "none";

  canvas = document.createElement("canvas");
  canvas.width = 800;
  canvas.height = 600;
  canvas.style.border = "2px solid #f88";
  canvas.style.display = "block";
  canvas.style.margin = "0 auto";
  document.body.appendChild(canvas);

  ctx = canvas.getContext("2d");

  fetch("levels.json")
    .then((response) => response.json())
    .then((data) => {
      level = data[0]; // Load first level
      initLevel();
    })
    .catch((error) => console.error("Failed to load levels:", error));
}

function initLevel() {
  candle.x = level.bird.x;
  candle.y = level.bird.y;
  candle.vy = 0;

  backgroundImg.src = level.background;
  backgroundImg.onload = () => {
    requestAnimationFrame(gameLoop);
  };
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

function update() {
  candle.vy += level.gravity;
  candle.y += candle.vy;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);

  // Draw the candle as a red rectangle placeholder
  ctx.fillStyle = "#ff5533";
  ctx.fillRect(candle.x, candle.y, candle.width, candle.height);
}

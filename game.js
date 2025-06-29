const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Candle settings
const candle = {
  x: 100,
  y: 200,
  width: 32,
  height: 32,
  velocity: 0,
  gravity: 0.5,
  jumpStrength: -9,
};

let pipes = [];
const pipeGap = 140;
const pipeWidth = 50;
const pipeSpeed = 2;
let gameRunning = false;

// === SETUP ===
function addPipe() {
  const topHeight = Math.random() * (canvas.height - pipeGap - 100) + 50;
  pipes.push({
    x: canvas.width,
    top: topHeight,
    bottom: topHeight + pipeGap,
  });
}

function setupGame() {
  candle.y = canvas.height / 2;
  candle.velocity = 0;
  pipes = [];
  addPipe();
  gameRunning = true;
  requestAnimationFrame(gameLoop);
}

// === GAME LOOP ===
function gameLoop() {
  if (!gameRunning) return;

  // Update physics
  candle.velocity += candle.gravity;
  candle.y += candle.velocity;

  for (let i = 0; i < pipes.length; i++) {
    let pipe = pipes[i];
    pipe.x -= pipeSpeed;

    if (
      candle.x < pipe.x + pipeWidth &&
      candle.x + candle.width > pipe.x &&
      (candle.y < pipe.top || candle.y + candle.height > pipe.bottom)
    ) {
      return endGame();
    }

    if (pipe.x + pipeWidth < 0) {
      pipes.splice(i, 1);
      i--;
      addPipe();
    }
  }

  if (candle.y < 0 || candle.y + candle.height > canvas.height) {
    return endGame();
  }

  // Draw frame
  draw();
  requestAnimationFrame(gameLoop);
}

function draw() {
  ctx.fillStyle = "#0f0f0f";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#663333";
  pipes.forEach(pipe => {
    ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top);
    ctx.fillRect(pipe.x, pipe.bottom, pipeWidth, canvas.height - pipe.bottom);
  });

  ctx.fillStyle = "#ffaa00";
  ctx.fillRect(candle.x, candle.y, candle.width, candle.height);
}

function endGame() {
  gameRunning = false;
  alert("Game Over 🕯️");
}

function flap() {
  if (gameRunning) candle.velocity = candle.jumpStrength;
}

window.addEventListener("keydown", e => {
  if (e.code === "Space") flap();
});
window.addEventListener("click", flap);

// === DEBUG LAUNCH ===
window.onload = () => {
  canvas.style.display = "block";
  setupGame();
};

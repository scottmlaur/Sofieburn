const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const candle = {
  x: 100,
  y: 200,
  width: 32,
  height: 32,
  velocity: 0,
  gravity: 0.5,
  jump: -8,
};

let pipes = [];
const pipeGap = 150;
const pipeWidth = 60;
const pipeSpacing = 300;
const pipeSpeed = 3;

let backgroundImage = null;
let gameRunning = false;

// === IMMEDIATE GAME START ===
function initGame() {
  console.log("🚀 initGame() called");
  // Skip loading. Set background to null
  backgroundImage = null;
  resetGame();
  gameRunning = true;
  requestAnimationFrame(gameLoop);
}

// === Reset game state ===
function resetGame() {
  candle.y = canvas.height / 2;
  candle.velocity = 0;
  pipes = [];

  for (let i = 0; i < 5; i++) {
    spawnPipe(canvas.width + i * pipeSpacing);
  }
}

// === Spawn a pipe ===
function spawnPipe(x) {
  const top = Math.random() * (canvas.height - pipeGap - 100) + 50;
  pipes.push({
    x: x,
    top: top,
    bottom: top + pipeGap,
  });
}

// === Game update logic ===
function update() {
  candle.velocity += candle.gravity;
  candle.y += candle.velocity;

  for (let i = 0; i < pipes.length; i++) {
    const p = pipes[i];
    p.x -= pipeSpeed;

    const hit =
      candle.x < p.x + pipeWidth &&
      candle.x + candle.width > p.x &&
      (candle.y < p.top || candle.y + candle.height > p.bottom);

    if (hit) return endGame();

    if (p.x + pipeWidth < 0) {
      pipes.splice(i, 1);
      i--;
    }
  }

  const last = pipes[pipes.length - 1];
  if (last && last.x < canvas.width - pipeSpacing) {
    spawnPipe(canvas.width);
  }

  if (candle.y < 0 || candle.y + candle.height > canvas.height) {
    return endGame();
  }
}

// === Game draw logic ===
function draw() {
  // Background (none for now)
  ctx.fillStyle = "#0f0f0f";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Pipes
  ctx.fillStyle = "#5e2d2d";
  pipes.forEach(p => {
    ctx.fillRect(p.x, 0, pipeWidth, p.top);
    ctx.fillRect(p.x, p.bottom, pipeWidth, canvas.height - p.bottom);
  });

  // Candle
  ctx.fillStyle = "#ffaa00";
  ctx.fillRect(candle.x, candle.y, candle.width, candle.height);
}

// === Game loop ===
function gameLoop() {
  if (!gameRunning) return;
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// === Controls ===
function flap() {
  if (gameRunning) {
    candle.velocity = candle.jump;
  }
}

window.addEventListener("keydown", e => {
  if (e.code === "Space") flap();
});
window.addEventListener("click", flap);

function endGame() {
  gameRunning = false;
  alert("Game Over 🕯️");
}

window.initGame = initGame;

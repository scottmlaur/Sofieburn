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
let gameRunning = false;

const pipeGap = 150;
const pipeWidth = 60;
const pipeSpacing = 300;
const pipeSpeed = 3;

// 🔥 Entry point from intro.js
function initGame() {
  console.log("🚀 initGame called");
  resetGame();
  gameRunning = true;
  requestAnimationFrame(gameLoop);
}

// 🔄 Start the game state
function resetGame() {
  candle.y = canvas.height / 2;
  candle.velocity = 0;
  pipes = [];

  // Create 5 initial pipes
  for (let i = 0; i < 5; i++) {
    spawnPipe(canvas.width + i * pipeSpacing);
  }
}

// 🧱 Pipe generation
function spawnPipe(x) {
  const minHeight = 50;
  const maxTop = canvas.height - pipeGap - minHeight;
  const top = Math.random() * maxTop + minHeight;

  pipes.push({ x, top, bottom: top + pipeGap });
}

// 🌀 Game loop
function gameLoop() {
  if (!gameRunning) return;
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// 🧠 Update logic
function update() {
  candle.velocity += candle.gravity;
  candle.y += candle.velocity;

  for (let i = 0; i < pipes.length; i++) {
    const p = pipes[i];
    p.x -= pipeSpeed;

    // 💥 Collision
    if (
      candle.x < p.x + pipeWidth &&
      candle.x + candle.width > p.x &&
      (candle.y < p.top || candle.y + candle.height > p.bottom)
    ) return endGame();

    // 🔁 Recycle
    if (p.x + pipeWidth < 0) {
      pipes.splice(i, 1);
      i--;
    }
  }

  const last = pipes[pipes.length -]()

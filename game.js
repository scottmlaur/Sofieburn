const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Canvas size
canvas.width = 800;
canvas.height = 600;

// Load candle sprite
const candleImg = new Image();
candleImg.src = "assets/sprites/candle.png"; // Adjust if path is different

// Game state
let gameRunning = false;
let scrollSpeed = 2;
let gravity = 0.5;
let jumpForce = -10;
let frameCount = 0;

// Candle (player)
let candle = {
  x: 150,
  y: 250,
  width: 48,
  height: 48,
  velocity: 0
};

// Pipes
let pipes = [];
let pipeWidth = 80;
let pipeGap = 160;
let pipeSpawnRate = 120; // frames

// Load level config
let level = {
  scrollSpeed: 2,
  gravity: 0.5,
  candle: { x: 150, y: 250 },
  pipe: { gap: 160, width: 80, spawnRate: 120 },
  finishLine: 4000
};

function resetGame() {
  scrollSpeed = level.scrollSpeed;
  gravity = level.gravity;
  candle.x = level.candle.x;
  candle.y = level.candle.y;
  candle.velocity = 0;
  pipes = [];
  frameCount = 0;
  gameRunning = true;
}

function drawCandle() {
  ctx.drawImage(candleImg, candle.x, candle.y, candle.width, candle.height);
}

function drawPipes() {
  ctx.fillStyle = "green";
  for (const pipe of pipes) {
    ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top);
    ctx.fillRect(pipe.x, pipe.top + pipeGap, pipeWidth, canvas.height - pipe.top - pipeGap);
  }
}

function updateCandle() {
  candle.velocity += gravity;
  candle.y += candle.velocity;

  if (candle.y + candle.height > canvas.height) {
    gameOver();
  }
}

function updatePipes() {
  for (let pipe of pipes) {
    pipe.x -= scrollSpeed;
    if (
      candle.x < pipe.x + pipeWidth &&
      candle.x + candle.width > pipe.x &&
      (candle.y < pipe.top || candle.y + candle.height > pipe.top + pipeGap)
    ) {
      gameOver();
    }
  }

  pipes = pipes.filter(pipe => pipe.x + pipeWidth > 0);

  if (frameCount % pipeSpawnRate === 0) {
    const top = Math.floor(Math.random() * (canvas.height - pipeGap - 100)) + 50;
    pipes.push({ x: canvas.width, top: top });
  }
}

function draw() {
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawPipes();
  drawCandle();
}

function update() {
  updateCandle();
  updatePipes();

  if (frameCount * scrollSpeed > level.finishLine) {
    gameOver(true);
  }
}

function loop() {
  if (!gameRunning) return;
  frameCount++;
  update();
  draw();
  requestAnimationFrame(loop);
}

function gameOver(won = false) {
  gameRunning = false;
  alert(won ? "🔥 You reached the end!" : "💀 Candle extinguished. Try again.");
}

document.addEventListener("keydown", (e) => {
  if (e.code === "Space" || e.code === "ArrowUp") {
    candle.velocity = jumpForce;
  }
});

document.getElementById("startBtn").addEventListener("click", () => {
  resetGame();
  loop();
});

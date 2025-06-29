const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// === Candle player ===
const candle = {
  x: 100,
  y: 200,
  width: 32,
  height: 32,
  velocity: 0,
  gravity: 0.5,
  jump: -8,
  sprite: null,
};

let pipes = [];
let lastPipeX = 0;

const pipeGap = 150;
const pipeWidth = 60;
const pipeSpacing = 300;
const pipeSpeed = 3;

let gameRunning = false;
let backgroundImage = null;

// === Load assets (with fallback) ===
function loadAssets(callback) {
  let loaded = 0;
  const total = 2;

  const bg = new Image();
  bg.src = "assets/backgrounds/sanctuary.png";
  bg.onload = () => {
    backgroundImage = bg;
    console.log("🖼️ Background loaded");
    if (++loaded === total) callback();
  };
  bg.onerror = () => {
    console.warn("⚠️ Background failed to load");
    backgroundImage = null;
    if (++loaded === total) callback();
  };

  const sprite = new Image();
  sprite.src = "assets/characters/candle.png";
  sprite.onload = () => {
    candle.sprite = sprite;
    console.log("🕯️ Candle sprite loaded");
    if (++loaded === total) callback();
  };
  sprite.onerror = () => {
    console.warn("⚠️ Candle sprite failed. Using fallback.");
    candle.sprite = null;
    if (++loaded === total) callback();
  };
}

// === Init game from intro.js ===
function initGame() {
  console.log("🚀 initGame() fired");
  loadAssets(() => {
    console.log("✅ Assets loaded. Starting game...");
    resetGame();
    gameRunning = true;
    requestAnimationFrame(gameLoop);
  });
}

// === Setup pipes + player position ===
function resetGame() {
  candle.y = canvas.height / 2;
  candle.velocity = 0;
  pipes = [];

  lastPipeX = canvas.width + 200;
  for (let i = 0; i < 5; i++) {
    spawnPipe(lastPipeX);
    lastPipeX += pipeSpacing;
  }
}

// === Spawn one pipe pair ===
function spawnPipe(xPosition) {
  const minHeight = 50;
  const maxTop = canvas.height - pipeGap - minHeight;
  const top = Math.floor(Math.random() * maxTop) + minHeight;

  pipes.push({
    x: xPosition,
    top: top,
    bottom: top + pipeGap
  });
}

// === Main loop ===
function gameLoop() {
  if (!gameRunning) return;
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// === Update game state ===
function update() {
  candle.velocity += candle.gravity;
  candle.y += candle.velocity;

  for (let i = 0; i < pipes.length; i++) {
    const p = pipes[i];
    p.x -= pipeSpeed;

    // Collision
    const hit =
      candle.x < p.x + pipeWidth &&
      candle.x + candle.width > p.x &&
      (candle.y < p.top || candle.y + candle.height > p.bottom);

    if (hit) return endGame();

    // Remove offscreen pipes
    if (p.x + pipeWidth < 0) {
      pipes.splice(i, 1);
      i--;

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

let backgroundImage = null;
let gameRunning = false;

// === Image Loader ===
function loadAssets(callback) {
  let loaded = 0;

  // Background
  const bg = new Image();
  bg.src = "assets/backgrounds/sanctuary.png";
  bg.onload = () => {
    backgroundImage = bg;
    loaded++;
    checkDone();
  };
  bg.onerror = () => {
    console.warn("⚠️ Background failed to load.");
    loaded++;
    checkDone();
  };

  // Candle sprite
  const sprite = new Image();
  sprite.src = "assets/characters/candle.png";
  sprite.onload = () => {
    candle.sprite = sprite;
    loaded++;
    checkDone();
  };
  sprite.onerror = () => {
    console.warn("⚠️ Candle sprite failed. Using fallback.");
    loaded++;
    checkDone();
  };

  function checkDone() {
    if (loaded === 2) callback();
  }
}

// === Entry point from intro.js ===
function initGame() {
  console.log("🚀 initGame()");
  loadAssets(() => {
    console.log("✅ Assets loaded");
    resetGame();
    gameRunning = true;
    requestAnimationFrame(gameLoop);
  });
}

// === Setup pipes + player ===
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

// === Spawn a pipe ===
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

// === Main game loop ===
function gameLoop() {
  if (!gameRunning) return;
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// === Physics and spawning ===
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

  const lastPipe = pipes[pipes.length - 1];
  if (lastPipe && lastPipe.x < canvas.width - pipeSpacing) {
    spawnPipe(canvas.width);
  }

  if (candle.y < 0 || ca

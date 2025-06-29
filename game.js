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
  sprite: null,
};

let pipes = [];
const pipeGap = 150;
const pipeWidth = 60;
const pipeSpeed = 2;

let gameRunning = false;
let backgroundImage = null;

// === Load Assets ===
function loadAssets(callback) {
  let loaded = 0;
  const total = 2;

  const bg = new Image();
  bg.src = "assets/backgrounds/sanctuary.png";
  bg.onload = () => {
    backgroundImage = bg;
    if (++loaded === total) callback();
  };
  bg.onerror = () => {
    console.warn("No background loaded.");
    if (++loaded === total) callback();
  };

  const sprite = new Image();
  sprite.src = "assets/characters/candle.png";
  sprite.onload = () => {
    candle.sprite = sprite;
    if (++loaded === total) callback();
  };
  sprite.onerror = () => {
    console.warn("No candle sprite. Using fallback.");
    if (++loaded === total) callback();
  };
}

// === Game Init ===
function initGame() {
  loadAssets(() => {
    resetGame();
    gameRunning = true;
    requestAnimationFrame(gameLoop);
  });
}

function resetGame() {
  candle.y = canvas.height / 2;
  candle.velocity = 0;
  pipes = [];

  // Spawn starting pipes
  for (let i = 0; i < 3; i++) {
    spawnPipe(canvas.width + i * 300); // space out initial pipes
  }
}

// === Spawn Pipe at X ===
function spawnPipe(xPos) {
  const top = Math.random() * (canvas.height - pipeGap - 100) + 50;
  pipes.push({
    x: xPos,
    top: top,
    bottom: top + pipeGap
  });
}

// === Game Loop ===
function gameLoop() {
  if (!gameRunning) return;

  update();
  draw();
  requestAnimationFrame(gameLoop);
}

function update() {
  candle.velocity += candle.gravity;
  candle.y += candle.velocity;

  for (let i = 0; i < pipes.length; i++) {
    pipes[i].x -= pipeSpeed;

    const p = pipes[i];
    const hit =
      candle.x < p.x + pipeWidth &&
      candle.x + candle.width > p.x &&
      (candle.y < p.top || candle.y + candle.height > p.bottom);

    if (hit) return endGame();

    // Recycle pipe
    if (p.x + pipeWidth < 0) {
      pipes.splice(i, 1);
      i--;
      spawnPipe(canvas.width);
    }
  }

  if (candle.y + candle.height > canvas.height || candle.y < 0) {
    endGame();
  }
}

function draw() {
  // === Background
  if (backgroundImage) {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  } else {
    ctx.fillStyle = "#0f0f0f";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  // === Pipes
  ctx.fillStyle = "#5e2d2d";
  pipes.forEach(p => {
    ctx.fillRect(p.x, 0, pipeWidth, p.top);
    ctx.fillRect(p.x, p.bottom, pipeWidth, canvas.height - p.bottom);
  });

  // === Candle
  if (candle.sprite) {
    ctx.drawImage(candle.sprite, candle.x, candle.y, candle.width, candle.height);
  } else {
    ctx.fillStyle = "#ffaa00";
    ctx.fillRect(candle.x, candle.y, candle.width, candle.height);
  }
}

function flap() {
  if (gameRunning) {
    candle.velocity = candle.jump;
  }
}

function endGame() {
  gameRunning = false;
  alert("Game Over 🕯️");
}

window.addEventListener("keydown", e => {
  if (e.code === "Space") flap();
});
window.addEventListener("click", flap);

window.initGame = initGame;

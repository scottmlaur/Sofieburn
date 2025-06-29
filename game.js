const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// === Candle Character ===
const candle = {
  x: 100,
  y: 200,
  width: 32,
  height: 32,
  velocity: 0,
  gravity: 0.5,
  jumpForce: -8,
  sprite: null,
};

// === Pipes ===
let pipes = [];
const pipeGap = 140;
const pipeWidth = 50;
const pipeSpeed = 2;

// === State Flags ===
let gameRunning = false;

// === Load Sprite (Fallback Safe) ===
function loadCandleSprite(callback) {
  const img = new Image();
  img.src = "assets/characters/candle.png";
  img.onload = () => {
    candle.sprite = img;
    callback();
  };
  img.onerror = () => {
    console.warn("⚠️ Failed to load candle.png. Using fallback.");
    callback();
  };
}

// === Game Init Entry Point ===
function initGame() {
  loadCandleSprite(() => {
    resetGame();
    gameRunning = true;
    requestAnimationFrame(gameLoop);
  });
}

// === Game Reset Logic ===
function resetGame() {
  candle.y = canvas.height / 2;
  candle.velocity = 0;
  pipes = [];
  spawnPipe();
}

// === Create a Pipe Pair ===
function spawnPipe() {
  const topHeight = Math.random() * (canvas.height - pipeGap - 120) + 40;
  pipes.push({
    x: canvas.width,
    top: topHeight,
    bottom: topHeight + pipeGap
  });
}

// === Frame Update ===
function gameLoop() {
  if (!gameRunning) return;

  updatePhysics();
  renderScene();
  requestAnimationFrame(gameLoop);
}

// === Physics and Collision ===
function updatePhysics() {
  candle.velocity += candle.gravity;
  candle.y += candle.velocity;

  for (let i = 0; i < pipes.length; i++) {
    const pipe = pipes[i];
    pipe.x -= pipeSpeed;

    // Collision detection
    const hitPipe = (
      candle.x < pipe.x + pipeWidth &&
      candle.x + candle.width > pipe.x &&
      (candle.y < pipe.top || candle.y + candle.height > pipe.bottom)
    );
    if (hitPipe) return endGame();

    // Remove offscreen pipes and add new
    if (pipe.x + pipeWidth < 0) {
      pipes.splice(i, 1);
      i--;
      spawnPipe();
    }
  }

  // Hit top or bottom
  if (candle.y < 0 || candle.y + candle.height > canvas.height) {
    endGame();
  }
}

// === Render Everything ===
function renderScene() {
  ctx.fillStyle = "#0f0f0f";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Pipes
  ctx.fillStyle = "#5e2d2d";
  pipes.forEach(pipe => {
    ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top);
    ctx.fillRect(pipe.x, pipe.bottom, pipeWidth, canvas.height - pipe.bottom);
  });

  // Candle
  if (candle.sprite) {
    ctx.drawImage(candle.sprite, candle.x, candle.y, candle.width, candle.height);
  } else {
    ctx.fillStyle = "#ffaa00";
    ctx.fillRect(candle.x, candle.y, candle.width, candle.height);
  }
}

// === Candle Jump ===
function flap() {
  if (gameRunning) {
    candle.velocity = candle.jumpForce;
  }
}

// === Input Listeners ===
window.addEventListener("keydown", e => {
  if (e.code === "Space") flap();
});
window.addEventListener("click", flap);

// === End Game ===
function endGame() {
  gameRunning = false;
  alert("Game Over 🕯️");
}

// === Expose Entry Point ===
window.initGame = initGame;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// === Candle Player ===
const candle = {
  x: 100,
  y: 200,
  width: 32,
  height: 32,
  velocity: 0,
  gravity: 0.5,
  jumpStrength: -9,
  img: null,
};

// === Pipes ===
let pipes = [];
const pipeGap = 150;
const pipeWidth = 50;
const pipeSpeed = 2;

// === Game Control ===
let gameRunning = false;

// === Load Candle Sprite ===
function loadAssets(callback) {
  const img = new Image();
  img.src = "assets/characters/candle.png"; // Adjust path if needed
  img.onload = () => {
    candle.img = img;
    callback();
  };
  img.onerror = () => {
    console.warn("Could not load candle sprite. Using fallback.");
    callback();
  };
}

// === Initialize Game ===
function initGame() {
  loadAssets(() => {
    setupGame();
    gameRunning = true;
    requestAnimationFrame(gameLoop);
  });
}

// === Setup ===
function setupGame() {
  candle.y = canvas.height / 2;
  candle.velocity = 0;
  pipes = [];
  addPipe();
}

// === Add Pipe ===
function addPipe() {
  const topHeight = Math.random() * (canvas.height - pipeGap - 100) + 50;
  pipes.push({
    x: canvas.width,
    top: topHeight,
    bottom: topHeight + pipeGap,
  });
}

// === Game Loop ===
function gameLoop() {
  if (!gameRunning) return;

  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// === Update Logic ===
function update() {
  // Candle physics
  candle.velocity += candle.gravity;
  candle.y += candle.velocity;

  // Pipe movement
  for (let i = 0; i < pipes.length; i++) {
    pipes[i].x -= pipeSpeed;

    // Collision
    if (
      candle.x < pipes[i].x + pipeWidth &&
      candle.x + candle.width > pipes[i].x &&
      (candle.y < pipes[i].top || candle.y + candle.height > pipes[i].bottom)
    ) {
      return endGame();
    }

    // Remove pipe and add new
    if (pipes[i].x + pipeWidth < 0) {
      pipes.splice(i, 1);
      i--;
      addPipe();
    }
  }

  // Canvas bounds
  if (candle.y + candle.height > canvas.height || candle.y < 0) {
    return endGame();
  }
}

// === Draw Everything ===
function draw() {
  // Background
  ctx.fillStyle = "#0f0f0f";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Pipes
  ctx.fillStyle = "#663333";
  for (let pipe of pipes) {
    ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top);
    ctx.fillRect(pipe.x, pipe.bottom, pipeWidth, canvas.height - pipe.bottom);
  }

  // Candle
  if (candle.img) {
    ctx.drawImage(candle.img, candle.x, candle.y, candle.width, candle.height);
  } else {
    ctx.fillStyle = "#ffaa00";
    ctx.fillRect(candle.x, candle.y, candle.width, candle.height);
  }
}

// === Jump ===
function flap() {
  if (!gameRunning) return;
  candle.velocity = candle.jumpStrength;
}

window.addEventListener("keydown", (e) => {
  if (e.code === "Space") flap();
});
window.addEventListener("click", flap);

// === End Game ===
function endGame() {
  gameRunning = false;
  alert("Game over 🕯️");
}

// === Expose for intro.js ===
window.initGame = initGame;

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let candle = {
  x: 150,
  y: 200,
  width: 32,
  height: 32,
  velocity: 0,
  gravity: 0.6,
  lift: -10,
  img: null
};

let pipes = [];
let pipeGap = 140;
let pipeWidth = 50;
let pipeSpeed = 2;

let gameRunning = false;

function initGame() {
  loadAssets(() => {
    setup();
    gameRunning = true;
    requestAnimationFrame(update);
  });
}

function loadAssets(callback) {
  const img = new Image();
  img.src = 'assets/characters/candle.png'; // Replace if you use a different path
  img.onload = () => {
    candle.img = img;
    callback();
  };
}

function setup() {
  pipes = [];
  candle.y = canvas.height / 2;
  candle.velocity = 0;
  createPipe();
}

function createPipe() {
  const top = Math.random() * (canvas.height - pipeGap - 100) + 50;
  pipes.push({
    x: canvas.width,
    top,
    bottom: top + pipeGap
  });
}

function update() {
  if (!gameRunning) return;

  // Clear
  ctx.fillStyle = "#0f0f0f";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Candle physics
  candle.velocity += candle.gravity;
  candle.y += candle.velocity;

  // Draw candle
  if (candle.img) {
    ctx.drawImage(candle.img, candle.x, candle.y, candle.width, candle.height);
  } else {
    ctx.fillStyle = "#ffcc00";
    ctx.fillRect(candle.x, candle.y, candle.width, candle.height);
  }

  // Move pipes
  for (let i = 0; i < pipes.length; i++) {
    let p = pipes[i];
    p.x -= pipeSpeed;

    ctx.fillStyle = "#8b3a3a";
    ctx.fillRect(p.x, 0, pipeWidth, p.top);
    ctx.fillRect(p.x, p.bottom, pipeWidth, canvas.height - p.bottom);

    // Collision
    if (
      candle.x < p.x + pipeWidth &&
      candle.x + candle.width > p.x &&
      (candle.y < p.top || candle.y + candle.height > p.bottom)
    ) {
      gameOver();
    }

    if (p.x + pipeWidth < 0) {
      pipes.splice(i, 1);
      i--;
      createPipe();
    }
  }

  // Boundary collision
  if (candle.y < 0 || candle.y + candle.height > canvas.height) {
    gameOver();
  }

  requestAnimationFrame(update);
}

function gameOver() {
  gameRunning = false;
  alert("Game over 🕯️");
}

function flap() {
  if (gameRunning) {
    candle.velocity = candle.lift;
  }
}

window.addEventListener('keydown', (e) => {
  if (e.code === 'Space') flap();
});
window.addEventListener('click', flap);

// Expose game start
window.initGame = initGame;

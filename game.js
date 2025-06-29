const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

canvas.width = 800;
canvas.height = 600;

// Game state
let gameRunning = false;
let gravity = 0.5;
let scrollSpeed = 2;
let candle = {
  x: 150,
  y: 200,
  width: 40,
  height: 40,
  velocity: 0
};
let pipes = [];
let levelData = null;

// Load assets
const candleImg = new Image();
candleImg.src = 'assets/candle_sprite.gif';

// Load JSON level
fetch('level1.json')
  .then((response) => response.json())
  .then((json) => {
    levelData = json;
    gravity = json.gravity;
    scrollSpeed = json.scrollSpeed;
    candle.y = json.birdStart.y;
    loadPipes(json.pipes);
    requestAnimationFrame(gameLoop);
  });

function loadPipes(pipeArray) {
  pipes = pipeArray.map(pipe => ({
    x: pipe.x,
    width: pipe.width,
    gapY: pipe.gapY,
    gapHeight: pipe.gapHeight
  }));
}

function gameLoop() {
  if (!gameRunning) return;

  update();
  render();
  requestAnimationFrame(gameLoop);
}

function update() {
  candle.velocity += gravity;
  candle.y += candle.velocity;

  pipes.forEach(pipe => {
    pipe.x -= scrollSpeed;
  });
}

function render() {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw candle
  ctx.drawImage(candleImg, candle.x, candle.y, candle.width, candle.height);

  // Draw pipes
  ctx.fillStyle = '#2a1a13';
  pipes.forEach(pipe => {
    // Top pipe
    ctx.fillRect(pipe.x, 0, pipe.width, pipe.gapY);
    // Bottom pipe
    ctx.fillRect(pipe.x, pipe.gapY + pipe.gapHeight, pipe.width, canvas.height);
  });
}

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    candle.velocity = -10;
  }
});

document.getElementById('start-btn').addEventListener('click', () => {
  gameRunning = true;
  candle.velocity = 0;
  candle.y = levelData.birdStart.y;
  requestAnimationFrame(gameLoop);
});

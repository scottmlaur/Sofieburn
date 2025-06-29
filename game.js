const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

// Load assets
const background = new Image();
background.src = 'assets/backgrounds/sanctuary_bg.png';

const candle = new Image();
candle.src = 'assets/characters/candle.png';

const pipeImg = new Image();
pipeImg.src = 'assets/obstacles/pipe.png';

// Candle physics
let candleY = 250;
let candleVelocity = 0;
const gravity = 0.6;
const lift = -10;

// Pipe setup
let pipes = [];
const pipeGap = 150;
const pipeWidth = 60;
const pipeSpacing = 200;
const scrollSpeed = 2;

// Background scroll
let bgX = 0;

// Input
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    candleVelocity = lift;
  }
});

// Spawn initial pipes
function spawnPipes() {
  for (let i = 0; i < 3; i++) {
    const topPipeHeight = Math.floor(Math.random() * 200) + 50;
    pipes.push({
      x: canvas.width + i * pipeSpacing,
      top: topPipeHeight,
      bottom: topPipeHeight + pipeGap
    });
  }
}

// Main loop
function update() {
  // Candle movement
  candleVelocity += gravity;
  candleY += candleVelocity;

  // Background scroll
  bgX -= scrollSpeed;
  if (bgX <= -canvas.width) {
    bgX = 0;
  }

  // Pipe movement
  for (let pipe of pipes) {
    pipe.x -= scrollSpeed;
  }

  // Recycle pipes
  if (pipes[0].x + pipeWidth < 0) {
    pipes.shift();
    const top = Math.floor(Math.random() * 200) + 50;
    pipes.push({
      x: pipes[pipes.length - 1].x + pipeSpacing,
      top: top,
      bottom: top + pipeGap
    });
  }

  // Collision
  for (let pipe of pipes) {
    if (
      100 < pipe.x + pipeWidth &&
      100 + 40 > pipe.x &&
      (candleY < pipe.top || candleY + 40 > pipe.bottom)
    ) {
      resetGame();
    }
  }

  if (candleY > canvas.height || candleY < 0) {
    resetGame();
  }
}

// Draw
function draw() {
  // Background
  ctx.drawImage(background, bgX, 0, canvas.width, canvas.height);
  ctx.drawImage(background, bgX + canvas.width, 0, canvas.width, canvas.height);

  // Pipes
  for (let pipe of pipes) {
    ctx.drawImage(pipeImg, pipe.x, 0, pipeWidth, pipe.top);
    ctx.drawImage(pipeImg, pipe.x, pipe.bottom, pipeWidth, canvas.height - pipe.bottom);
  }

  // Candle
  ctx.drawImage(candle, 100, candleY, 40, 40);
}

// Game loop
function gameLoop() {
  update();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  draw();
  requestAnimationFrame(gameLoop);
}

function resetGame() {
  candleY = 250;
  candleVelocity = 0;
  pipes = [];
  spawnPipes();
}

// Init
window.onload = () => {
  spawnPipes();
  gameLoop();
};

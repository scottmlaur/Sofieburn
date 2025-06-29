const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

const GRAVITY = 0.4;
let birdY = canvas.height / 2;
let birdVelocity = 0;

const background = new Image();
background.src = 'assets/backgrounds/sanctuary_bg.png';

const bird = new Image();
bird.src = 'assets/characters/candle.png';

const pipeImage = new Image();
pipeImage.src = 'assets/obstacles/pipe.png';

let pipes = [];
const PIPE_WIDTH = 80;
const PIPE_GAP = 150;
const PIPE_SPACING = 300;
const PIPE_SPEED = 2;

// Generate initial pipes
for (let i = 0; i < 3; i++) {
  const topHeight = Math.floor(Math.random() * (canvas.height - PIPE_GAP - 100)) + 50;
  pipes.push({ x: canvas.width + i * PIPE_SPACING, top: topHeight });
}

function drawBackground() {
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
}

function drawBird() {
  ctx.drawImage(bird, 100, birdY, 40, 40);
}

function drawPipes() {
  pipes.forEach(pipe => {
    ctx.drawImage(pipeImage, pipe.x, 0, PIPE_WIDTH, pipe.top);
    ctx.drawImage(pipeImage, pipe.x, pipe.top + PIPE_GAP, PIPE_WIDTH, canvas.height - pipe.top - PIPE_GAP);
  });
}

function updatePipes() {
  pipes.forEach(pipe => {
    pipe.x -= PIPE_SPEED;

    // Recycle pipe
    if (pipe.x + PIPE_WIDTH < 0) {
      pipe.x = canvas.width + PIPE_SPACING;
      pipe.top = Math.floor(Math.random() * (canvas.height - PIPE_GAP - 100)) + 50;
    }
  });
}

function checkCollision() {
  for (let pipe of pipes) {
    const withinPipeX = 100 + 40 > pipe.x && 100 < pipe.x + PIPE_WIDTH;
    const hitsTop = birdY < pipe.top;
    const hitsBottom = birdY + 40 > pipe.top + PIPE_GAP;

    if (withinPipeX && (hitsTop || hitsBottom)) {
      return true;
    }
  }

  return birdY < 0 || birdY + 40 > canvas.height;
}

function gameLoop() {
  drawBackground();

  drawPipes();
  drawBird();

  birdVelocity += GRAVITY;
  birdY += birdVelocity;

  updatePipes();

  if (checkCollision()) {
    alert("Game Over 🕯️");
    document.location.reload();
    return;
  }

  requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', () => {
  birdVelocity = -8;
});

window.onload = () => {
  gameLoop();
};

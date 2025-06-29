const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

// Load images
const background = new Image();
background.src = "assets/backgrounds/sanctuary_bg.png";

const candle = new Image();
candle.src = "assets/characters/candle.png";

const pipe = new Image();
pipe.src = "assets/obstacles/pipe_bottom_stone.png";

// Bird/Candle
let candleY = 150;
let gravity = 0.6;
let velocity = 0;

// Pipe
let pipes = [];
const pipeGap = 150;
const pipeWidth = 50;
let pipeX = canvas.width;
let score = 0;

function drawBackground() {
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
}

function drawCandle() {
  ctx.drawImage(candle, 100, candleY, 40, 40);
}

function drawPipes() {
  pipes.forEach((pipePair) => {
    ctx.drawImage(pipe, pipePair.x, pipePair.topY, pipeWidth, pipePair.topHeight);
    ctx.drawImage(pipe, pipePair.x, pipePair.bottomY, pipeWidth, pipePair.bottomHeight);
  });
}

function updatePipes() {
  if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width - 300) {
    const topHeight = Math.floor(Math.random() * 200) + 50;
    const bottomY = topHeight + pipeGap;
    const bottomHeight = canvas.height - bottomY;

    pipes.push({
      x: canvas.width,
      topY: 0,
      topHeight,
      bottomY,
      bottomHeight,
    });
  }

  pipes.forEach((pipePair) => {
    pipePair.x -= 2;
  });

  pipes = pipes.filter((pipePair) => pipePair.x + pipeWidth > 0);
}

function checkCollision() {
  for (const pipePair of pipes) {
    const withinX = 100 + 40 > pipePair.x && 100 < pipePair.x + pipeWidth;
    const hitsTop = candleY < pipePair.topHeight;
    const hitsBottom = candleY + 40 > pipePair.bottomY;

    if (withinX && (hitsTop || hitsBottom)) {
      resetGame();
    }
  }

  if (candleY + 40 > canvas.height || candleY < 0) {
    resetGame();
  }
}

function resetGame() {
  candleY = 150;
  velocity = 0;
  pipes = [];
  score = 0;
}

function drawScore() {
  ctx.fillStyle = "#ffffff";
  ctx.font = "24px Arial";
  ctx.fillText(`Score: ${score}`, 10, 30);
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();
  drawCandle();
  drawPipes();
  drawScore();

  velocity += gravity;
  candleY += velocity;

  updatePipes();
  checkCollision();

  score += 1;

  requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", function () {
  velocity = -10;
});

window.onload = () => {
  background.onload = () => {
    gameLoop();
  };
};

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const bg = new Image();
bg.src = "assets/backgrounds/sanctuary_bg.png";

const candle = new Image();
candle.src = "assets/characters/candle.png";

const pipeImg = new Image();
pipeImg.src = "assets/obstacles/stone.png";

let bgX = 0;
let candleY = canvas.height / 2;
let candleVelocity = 0;
let gravity = 0.5;
let spacePressed = false;

const pipes = [];
const pipeGap = 150;
const pipeWidth = 80;
const pipeSpeed = 2;

function spawnPipe() {
  const topHeight = Math.random() * (canvas.height - pipeGap - 100) + 50;
  pipes.push({
    x: canvas.width,
    top: topHeight,
    bottom: topHeight + pipeGap
  });
}

function drawBackground() {
  bgX -= pipeSpeed;
  if (bgX <= -canvas.width) {
    bgX = 0;
  }
  ctx.drawImage(bg, bgX, 0, canvas.width, canvas.height);
  ctx.drawImage(bg, bgX + canvas.width, 0, canvas.width, canvas.height);
}

function drawCandle() {
  ctx.drawImage(candle, 50, candleY, 40, 40);
}

function drawPipes() {
  pipes.forEach(pipe => {
    // Draw top pipe
    ctx.save();
    ctx.translate(pipe.x + pipeWidth / 2, pipe.top / 2);
    ctx.scale(1, -1);
    ctx.drawImage(pipeImg, -pipeWidth / 2, -pipe.top / 2, pipeWidth, pipe.top);
    ctx.restore();

    // Draw bottom pipe
    ctx.drawImage(pipeImg, pipe.x, pipe.bottom, pipeWidth, canvas.height - pipe.bottom);
  });
}

function updatePipes() {
  pipes.forEach(pipe => pipe.x -= pipeSpeed);
  if (pipes.length > 0 && pipes[0].x + pipeWidth < 0) {
    pipes.shift();
  }
}

function checkCollision() {
  return pipes.some(pipe => {
    return (
      50 + 40 > pipe.x &&
      50 < pipe.x + pipeWidth &&
      (candleY < pipe.top || candleY + 40 > pipe.bottom)
    );
  });
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();

  candleVelocity += gravity;
  candleY += candleVelocity;
  if (candleY + 40 > canvas.height) candleY = canvas.height - 40;

  drawCandle();
  drawPipes();
  updatePipes();

  if (checkCollision()) {
    alert("Game Over");
    window.location.reload();
    return;
  }

  requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    candleVelocity = -8;
  }
});

document.getElementById("startButton").addEventListener("click", () => {
  document.getElementById("intro-screen").style.display = "none";
  canvas.style.display = "block";
  spawnPipe();
  setInterval(spawnPipe, 2000);
  requestAnimationFrame(gameLoop);
});

// game.js — SofieBurn engine core

let canvas, ctx;
let candleImg, pipeImg, bgImg;
let candle, pipes = [];
let gravity = 0.5;
let scrollSpeed = 2;
let gameStarted = false;

window.onload = () => {
  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");

  // Load images
  candleImg = new Image();
  candleImg.src = "assets/characters/candle.png";

  pipeImg = new Image();
  pipeImg.src = "assets/obstacles/pipe_bottom_stone.png";

  bgImg = new Image();
  bgImg.src = "assets/backgrounds/sanctuary_bg.png";

  // Start game after assets load
  bgImg.onload = () => {
    candle = {
      x: 100,
      y: canvas.height / 2,
      width: 40,
      height: 40,
      velocity: 0
    };

    // Generate initial pipes
    for (let i = 0; i < 3; i++) {
      pipes.push({
        x: 400 + i * 250,
        y: Math.random() * (canvas.height - 150) + 50,
        width: 60,
        height: 200
      });
    }

    gameLoop();
  };

  // Control
  document.addEventListener("keydown", (e) => {
    if (e.code === "Space" || e.code === "ArrowUp") {
      candle.velocity = -8;
    }
  });
};

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

function update() {
  // Apply gravity
  candle.velocity += gravity;
  candle.y += candle.velocity;

  // Scroll pipes
  for (let pipe of pipes) {
    pipe.x -= scrollSpeed;

    if (pipe.x + pipe.width < 0) {
      pipe.x = canvas.width + Math.random() * 200;
      pipe.y = Math.random() * (canvas.height - 150) + 50;
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(candleImg, candle.x, candle.y, candle.width, candle.height);

  for (let pipe of pipes) {
    ctx.drawImage(pipeImg, pipe.x, pipe.y, pipe.width, pipe.height);
  }
}

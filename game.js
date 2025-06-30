let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

let bird = { x: 100, y: 200, width: 40, height: 40, velocity: 0 };
let pipes = [];
let backgroundImage = new Image();
let candleImage = new Image();

let scrollSpeed = 2;
let gravity = 0.4;
let pipeGap = 140;
let pipeInterval = 1500;
let finishLineX = 3000;
let gameStarted = false;
let levelData = null;
let pipeTimer = 0;

candleImage.src = "assets/candle.png";

// Load level data
fetch("levels.json")
  .then((response) => response.json())
  .then((data) => {
    levelData = data[0]; // Use first level
    console.log("📜 Loaded level:", levelData.name);
    applyLevelSettings(levelData);
    bindStartButton();
  })
  .catch((error) => {
    console.error("⚠️ Error loading levels.json:", error);
  });

function applyLevelSettings(level) {
  scrollSpeed = level.scrollSpeed;
  gravity = level.gravity;
  bird.x = level.bird.x;
  bird.y = level.bird.y;
  pipeGap = level.pipes.gap;
  pipeInterval = level.pipes.interval;
  finishLineX = level.finishLineX;
  backgroundImage.src = level.background;
}

function bindStartButton() {
  document.getElementById("startButton").addEventListener("click", () => {
    document.getElementById("intro").style.display = "none";
    document.getElementById("gameCanvas").style.display = "block";
    startGame();
  });
}

function startGame() {
  gameStarted = true;
  bird.velocity = 0;
  pipes = [];
  pipeTimer = 0;
  console.log("🔥 Game started");
  requestAnimationFrame(gameLoop);
}

function gameLoop(timestamp) {
  if (!gameStarted) return;

  updateGame();
  renderGame();
  requestAnimationFrame(gameLoop);
}

function updateGame() {
  bird.velocity += gravity;
  bird.y += bird.velocity;

  pipeTimer += 16.66;
  if (pipeTimer > pipeInterval) {
    pipeTimer = 0;
    spawnPipe();
  }

  pipes.forEach(pipe => pipe.x -= scrollSpeed);
  pipes = pipes.filter(pipe => pipe.x + pipe.width > 0);
}

function renderGame() {
  try {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(candleImage, bird.x, bird.y, bird.width, bird.height);

    pipes.forEach(pipe => {
      ctx.fillStyle = "pink";
      ctx.fillRect(pipe.x, 0, pipe.width, pipe.top);
      ctx.fillRect(pipe.x, pipe.top + pipeGap, pipe.width, canvas.height);
    });
  } catch (e) {
    console.error("🛑 drawImage error:", e);
  }
}

function spawnPipe() {
  let top = Math.floor(Math.random() * (canvas.height - pipeGap - 100)) + 50;
  pipes.push({ x: canvas.width, width: 50, top: top });
}

document.addEventListener("keydown", (e) => {
  if (e.code === "Space" || e.code === "ArrowUp") {
    bird.velocity = -8;
  }
});

console.log("🔥 DOM Ready, waiting for start button...");

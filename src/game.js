const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Game objects
let bird = { x: 100, y: 200, width: 40, height: 40, velocity: 0 };
let pipes = [];
let pipeGap = 140;
let pipeInterval = 1500;
let scrollSpeed = 2;
let gravity = 0.4;
let finishLineX = 3000;

let background = new Image();
let backgroundLoaded = false;
let candleSprite = new Image();
let candleReady = false;
let levelLoaded = false;
let lastPipeTime = 0;

// Load candle sprite
candleSprite.src = "../assets/characters/candle.png";
candleSprite.onload = () => {
  candleReady = true;
};

// Load level
async function loadLevel() {
  try {
    const res = await fetch("levels.json");
    const level = await res.json().then(data => data[0]);

    scrollSpeed = level.scrollSpeed;
    gravity = level.gravity;
    bird.x = level.bird.x;
    bird.y = level.bird.y;
    pipeGap = level.pipes.gap;
    pipeInterval = level.pipes.interval;
    finishLineX = level.finishLineX;

    background.src = level.background;
    background.onload = () => {
      backgroundLoaded = true;
      levelLoaded = true;
      requestAnimationFrame(gameLoop);
    };
    background.onerror = () => {
      console.warn("Background failed to load");
      levelLoaded = true;
      requestAnimationFrame(gameLoop);
    };
  } catch (err) {
    alert("Could not load level. Check console.");
    console.error(err);
  }
}

// Draw background
function drawBackground() {
  if (backgroundLoaded) {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  } else {
    ctx.fillStyle = "#1a1111";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

// Draw candle sprite
function drawBird() {
  if (candleReady) {
    ctx.drawImage(candleSprite, bird.x, bird.y, bird.width, bird.height);
  } else {
    ctx.fillStyle = "orange";
    ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
  }
}

// Draw brown pipes
function drawPipes() {
  ctx.fillStyle = "#5b3a29"; // stone brown
  pipes.forEach(pipe => {
    ctx.fillRect(pipe.x, 0, pipe.width, pipe.top);
    ctx.fillRect(pipe.x, pipe.top + pipeGap, pipe.width, canvas.height);
  });
}

// Draw finish line
function drawFinishLine() {
  const relativeX = finishLineX - pipesOffset();
  if (relativeX >= 0 && relativeX <= canvas.width) {
    ctx.fillStyle = "white";
    ctx.fillRect(relativeX, 0, 10, canvas.height);
  }
}

// Pipe logic
function updatePipes() {
  pipes.forEach(pipe => pipe.x -= scrollSpeed);
  pipes = pipes.filter(pipe => pipe.x + pipe.width > 0);

  if (Date.now() - lastPipeTime > pipeInterval) {
    const topHeight = Math.random() * (canvas.height - pipeGap - 100) + 50;
    pipes.push({ x: canvas.width, width: 60, top: topHeight });
    lastPipeTime = Date.now();
  }
}

function pipesOffset() {
  return pipes.length > 0 ? canvas.width - pipes[pipes.length - 1].x : 0;
}

// Collision detection
function checkCollision() {
  for (const pipe of pipes) {
    const hitX = bird.x + bird.width > pipe.x && bird.x < pipe.x + pipe.width;
    const hitY = bird.y < pipe.top || bird.y + bird.height > pipe.top + pipeGap;
    if (hitX && hitY) return true;
  }
  return bird.y + bird.height > canvas.height || bird.y < 0;
}

// Main loop
function gameLoop() {
  if (!levelLoaded) return;

  bird.velocity += gravity;
  bird.y += bird.velocity;

  drawBackground();
  updatePipes();
  drawPipes();
  drawBird();
  drawFinishLine();

  if (checkCollision()) {
    alert("Game Over");
    return;
  }

  if (bird.x >= finishLineX) {
    alert("You win!");
    return;
  }

  requestAnimationFrame(gameLoop);
}

// Controls
document.addEventListener("keydown", e => {
  if (e.code === "Space") {
    bird.velocity = -8;
  }
});

// Intro screen logic
window.onload = () => {
  const startBtn = document.getElementById("startBtn");
  if (startBtn) {
    startBtn.addEventListener("click", () => {
      document.getElementById("introScreen").style.display = "none";
      loadLevel();
    });
  } else {
    // fallback for no intro screen
    loadLevel();
  }
};

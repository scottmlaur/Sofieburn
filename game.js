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
  jump: -8,
  sprite: null,
};

let pipes = [];
let lastPipeX = 0;

const pipeGap = 150;
const pipeWidth = 60;
const pipeSpeed = 3;
const pipeSpacing = 300;

let gameRunning = false;
let backgroundImage = null;

// === Load Assets ===
function loadAssets(callback) {
  let loaded = 0;
  const total = 2;

  const bg = new Image();
  bg.src = "assets/backgrounds/sanctuary.png";
  bg.onload = () => {
    backgroundImage = bg;
    if (++loaded === total) callback();
  };
  bg.onerror = () => {
    console.warn("⚠️ Background not found.");
    if (++loaded === total) callback();
  };

  const sprite = new Image();
  sprite.src = "assets/characters/candle.png";
  sprite.onload = () => {
    candle.sprite = sprite;
    if (++loaded === total) callback();
  };
  sprite.onerror = () => {
    console.warn("⚠️ Candle sprite not found. Using fallback.");
    if (++loaded === total) callback();
  };
}

// === Start Game ===
function initGame() {
  loadAssets(() => {
    resetGame();
    gameRunning = true;
    requestAnimationFrame(gameLoop);
  });
}

// === Setup Pipes and Candle ===
function resetGame() {
  candle.y = canvas.height / 2;
  candle.velocity = 0;
  pipes = [];

  lastPipeX = canvas.width + 200;
  for (let i = 0; i < 5; i++) {
    spawnPipe(lastPipeX);
    lastPipeX += pipeSpacing;
  }
}

// === Create One Pipe Pair ===
function spawnPipe(xPosition) {
  const minHeight = 50;
  const maxTop = canvas.height - pipeGap - minHeight;
  const topHeight = Math.floor(Math.random() * maxTop) + minHeight;

  pipes.push({
    x: xPosition,
    top: topHeight,
    bottom: topHe

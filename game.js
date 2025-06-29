let canvas, ctx;
let candleImage = new Image();
let candleX = 100;
let candleY = 200;
let candleLoaded = false;
let scrollSpeed = 2;

function startGame() {
  canvas = document.getElementById('game-canvas');
  ctx = canvas.getContext('2d');

  // Set canvas size
  canvas.width = 800;
  canvas.height = 600;

  // Optional: load candle sprite
  candleImage.src = 'assets/candle.png'; // Make sure this path is correct
  candleImage.onload = () => {
    candleLoaded = true;
    requestAnimationFrame(gameLoop);
  };

  // If image fails, still start game
  candleImage.onerror = () => {
    console.warn('Candle sprite not found, using fallback.');
    candleLoaded = false;
    requestAnimationFrame(gameLoop);
  };
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

function update() {
  candleX += scrollSpeed;

  // Reset if off screen
  if (candleX > canvas.width + 50) {
    candleX = -50;
  }
}

function draw() {
  // Clear canvas
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (candleLoaded) {
    ctx.drawImage(candleImage, candleX, candleY, 48, 64);
  } else {
    // fallback if candle image missing
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(candleX, candleY, 20, 0, Math.PI * 2);
    ctx.fill();
  }

  // Optional: Debug text
  ctx.fillStyle = 'gray';
  ctx.font = '16px monospace';
  ctx.fillText('SofieBurn v1', 10, 20);
}

// game.js

let canvas, ctx;
let background;

function initGame() {
  console.log("🔥 initGame() fired");

  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");

  // Load and draw the background
  background = new Image();
  background.src = 'assets/backgrounds/sanctuary_bg.png';

  background.onload = () => {
    console.log("🖼️ Background loaded");
    draw(); // Start draw loop after image loads
  };
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  // You can draw other stuff here (like candle, pipes, etc)

  requestAnimationFrame(draw);
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("🔥 DOM Ready, binding start button");

  const startButton = document.getElementById("startButton");
  startButton.addEventListener("click", () => {
    document.getElementById("startButton").style.display = "none"; // hide button
    initGame();
  });
});

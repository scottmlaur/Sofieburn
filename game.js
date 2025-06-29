const startButton = document.getElementById("start-button");
const introScreen = document.getElementById("intro");
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let x = 50;
let y = 50;
let dx = 2;
let squareSize = 50;

startButton.addEventListener("click", () => {
  introScreen.style.display = "none";
  canvas.style.display = "block";
  startGame();
});

function startGame() {
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "red";
    ctx.fillRect(x, y, squareSize, squareSize);

    x += dx;
    if (x + squareSize > canvas.width || x < 0) {
      dx = -dx;
    }

    requestAnimationFrame(draw);
  }

  draw();
}

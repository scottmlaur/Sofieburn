document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM Ready, binding start button");

  const startButton = document.getElementById("startButton");
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  const introImage = document.getElementById("introImage");

  let background = new Image();
  background.src = "assets/backgrounds/hallway.png";

  let candle = new Image();
  candle.src = "assets/characters/candle.png";

  background.onload = () => console.log("Background loaded");
  candle.onload = () => console.log("Candle sprite loaded");

  startButton.addEventListener("click", () => {
    console.log("Game started");

    // Hide intro image and button
    introImage.style.display = "none";
    startButton.style.display = "none";

    // Show canvas
    canvas.style.display = "block";

    drawFrame();
  });

  function drawFrame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(candle, canvas.width / 2 - 16, canvas.height - 64, 32, 64);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  console.log("🔥 DOM Ready, binding start button");

  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  const background = new Image();
  background.src = "assets/backgrounds/sanctuary_bg.png";

  background.onload = () => {
    console.log("📜 Background loaded");
    // Draw background immediately
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  };

  background.onerror = () => {
    console.error("❌ Failed to load sanctuary_bg.png");
  };

  // Handle Start Button
  const startButton = document.getElementById("startButton");
  startButton.addEventListener("click", () => {
    console.log("🔥 initGame() fired");
    drawScene();
  });

  function drawScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    // Here you will load and draw the candle, pipes, player etc.
    // For now, just showing background
  }
});

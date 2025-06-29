window.addEventListener("DOMContentLoaded", () => {
  console.log("🔥 DOM Ready, binding start button");

  const startButton = document.getElementById("startButton");
  const canvas = document.getElementById("gameCanvas");
  const introImage = document.getElementById("introImage");

  if (!startButton || !canvas || !introImage) {
    console.error("❌ Missing elements in DOM. Check your HTML IDs.");
    return;
  }

  const ctx = canvas.getContext("2d");

  const background = new Image();
  background.src = "assets/backgrounds/hallway.png";

  const candle = new Image();
  candle.src = "assets/characters/candle.png";

  background.onload = () => console.log("🖼️ Background loaded");
  candle.onload = () => console.log("🕯️ Candle sprite loaded");

  startButton.addEventListener("click", () => {
    console.log("🔥 Game started");
    introImage.style.display = "none";
    startButton.style.display = "none";
    canvas.style.display = "block";
    draw();
  });

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(candle, canvas.width / 2 - 16, canvas.height - 64, 32, 64);
  }
});

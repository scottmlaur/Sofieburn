document.addEventListener("DOMContentLoaded", () => {
  console.log("🔥 DOM Ready, binding start button");

  const startButton = document.getElementById("start-button");
  startButton.addEventListener("click", initGame);
});

function initGame() {
  console.log("🔥 Game started");

  const container = document.getElementById("game-container");
  container.innerHTML = ""; // Clear any previous game canvas

  const canvas = document.createElement("canvas");
  canvas.id = "game-canvas";
  canvas.width = 800;
  canvas.height = 600;
  canvas.style.border = "1px solid pink";
  container.appendChild(canvas);

  const ctx = canvas.getContext("2d");

  // Load background
  const background = new Image();
  background.src = "assets/backgrounds/sanctuary_bg.png";
  background.onload = () => {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    console.log("🖼️ Background loaded");

    // Load candle sprite after background
    const candle = new Image();
    candle.src = "assets/characters/candle.png";
    candle.onload = () => {
      ctx.drawImage(candle, 100, 250); // Sample position
      console.log("🕯️ Candle sprite loaded");
    };
  };
}

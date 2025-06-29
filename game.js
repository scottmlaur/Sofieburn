document.addEventListener("DOMContentLoaded", () => {
  console.log("🔥 DOM Ready, binding start button");

  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  const startButton = document.getElementById("startButton");
  startButton.addEventListener("click", () => {
    console.log("🕯️ Game Started");
    initGame();
  });

  function initGame() {
    console.log("initGame() fired");

    const background = new Image();
    background.src = "./assets/backgrounds/sanctuary_bg.png";

    background.onload = () => {
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      console.log("🖼️ Background loaded");
    };

    background.onerror = () => {
      console.error("❌ Failed to load background image");
    };
  }
});

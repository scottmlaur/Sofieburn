document.addEventListener("DOMContentLoaded", () => {
  console.log("🔥 DOM Ready, binding start button");

  const startButton = document.getElementById("startButton");
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  startButton.addEventListener("click", () => {
    console.log("🔥 Game started");
    initGame();
  });

  function initGame() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const bgImage = new Image();
    bgImage.onload = () => {
      console.log("🖼️ Background loaded");
      ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
    };
    bgImage.src = "./assets/backgrounds/sanctuary_bg.png"; // ✅ double check this exists
  }
});

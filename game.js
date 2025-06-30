document.addEventListener("DOMContentLoaded", function () {
  console.log("🔥 DOM Ready, binding start button");

  const startButton = document.getElementById("startButton");
  const introImage = document.getElementById("introImage");
  const gameContainer = document.getElementById("gameContainer");

  if (!startButton || !introImage || !gameContainer) {
    console.error("❌ Missing elements in DOM. Check your HTML IDs.");
    return;
  }

  // Set correct image path
  introImage.src = "assets/intro.png";
  introImage.alt = "Sofie holding candle";

  startButton.addEventListener("click", startGame);

  function startGame() {
    console.log("🔥 Game started");

    // Remove intro content
    introImage.style.display = "none";
    startButton.style.display = "none";

    // Create and add canvas
    const canvas = document.createElement("canvas");
    canvas.id = "gameCanvas";
    canvas.width = 800;
    canvas.height = 512;
    canvas.style.border = "2px solid #ff6b6b";
    canvas.style.display = "block";
    canvas.style.margin = "0 auto";

    gameContainer.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    const background = new Image();
    background.src = "assets/backgrounds/sanctuary_bg.png";
    background.onload = () => {
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    };
    background.onerror = () => {
      console.error("❌ Failed to load background image");
    };
  }
});

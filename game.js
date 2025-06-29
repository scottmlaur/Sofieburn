function initGame() {
  const canvas = document.getElementById("gameCanvas");
  if (!canvas) {
    console.error("Canvas element not found.");
    return;
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    console.error("Failed to get canvas context.");
    return;
  }

  // Load Sofie intro image
  const sofieImg = new Image();
  sofieImg.src = "assets/characters/candle.png"; // Update path if needed

  sofieImg.onload = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const imgWidth = 128;
    const imgHeight = 128;
    const centerX = (canvas.width - imgWidth) / 2;
    const centerY = (canvas.height - imgHeight) / 2;

    ctx.drawImage(sofieImg, centerX, centerY, imgWidth, imgHeight);
  };

  sofieImg.onerror = function () {
    console.error("Failed to load intro image.");
  };
}

// Expose to global scope so index.html can access it
window.initGame = initGame;

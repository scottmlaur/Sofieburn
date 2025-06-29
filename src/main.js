const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startButton = document.getElementById("startButton");

function drawIntro() {
  // Clear screen
  ctx.fillStyle = "#0d0d0d";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Load intro image
  const introImg = new Image();
  introImg.src = "../assets/sofie_intro.png";

  introImg.onload = () => {
    // Scale image to fit canvas width
    const scale = canvas.width / introImg.width;
    const scaledHeight = introImg.height * scale;
    ctx.drawImage(introImg, 0, 0, canvas.width, scaledHeight);

    // Text message
    ctx.fillStyle = "#ffffff";
    ctx.font = "20px monospace";
    ctx.textAlign = "center";
    ctx.fillText("🕯️  Press Start Game", canvas.width / 2, scaledHeight + 30);

    // Enable start button
    startButton.disabled = false;
  };
}

// Disable button until image loads
startButton.disabled = true;
window.onload = drawIntro;

document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("startButton");
  const introScreen = document.getElementById("introScreen");
  const gameCanvas = document.getElementById("gameCanvas");

  if (!startButton || !introScreen || !gameCanvas) {
    console.error("One or more intro elements not found.");
    return;
  }

  startButton.addEventListener("click", () => {
    introScreen.style.display = "none";
    gameCanvas.style.display = "block";

    // Trigger your game start logic here
    if (typeof startGame === "function") {
      startGame();
    } else {
      console.error("startGame function is not defined.");
    }
  });
});

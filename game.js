document.addEventListener("DOMContentLoaded", () => {
  console.log("🔥 DOM Ready, binding start button");

  const startButton = document.getElementById("start-button");
  const introImage = document.getElementById("intro-image");
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  let level = null;
  let backgroundImg = new Image();

  startButton.addEventListener("click", () => {
    console.log("🔥 Game started");
    introImage.style.display = "none";
    startButton.style.display = "none";
    canvas.style.display = "block";

    fetch("levels.json")
      .then(response => response.json())
      .then(data => {
        level = data[0];
        loadBackground(level.background);
      });
  });

  function loadBackground(src) {
    backgroundImg.src = src;
    backgroundImg.onload = () => {
      ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
    };
    backgroundImg.onerror = () => {
      console.error("❌ Failed to load background image:", src);
    };
  }
});

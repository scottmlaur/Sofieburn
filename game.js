document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startBtn");
  const introBtn = document.getElementById("introBtn");
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  const introImage = document.getElementById("introImage");

  let background = new Image();
  background.src = "assets/backgrounds/level1.png"; // Update path as needed

  background.onload = () => {
    console.log("🔥 Background loaded");
  };

  startBtn.addEventListener("click", () => {
    console.log("🔥 Game started");
    introImage.style.display = "none";
    canvas.style.display = "block";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  });

  introBtn.addEventListener("click", () => {
    console.log("🕯️ Intro shown");
    canvas.style.display = "none";
    introImage.style.display = "block";
  });
});

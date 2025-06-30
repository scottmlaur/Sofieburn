document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('startBtn');
  const intro = document.getElementById('intro');
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');

  let backgroundImage = new Image();
  let gameStarted = false;

  startBtn.addEventListener('click', async () => {
    intro.style.display = 'none';
    canvas.style.display = 'block';
    await loadLevelAndStart();
  });

  async function loadLevelAndStart() {
    try {
      const res = await fetch('levels.json');
      const levels = await res.json();
      const level = levels[0];

      backgroundImage.src = level.background;

      backgroundImage.onload = () => {
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        console.log('Game started');
      };

      backgroundImage.onerror = () => {
        console.error("Background image failed to load:", backgroundImage.src);
      };

    } catch (err) {
      console.error("Error loading level or image:", err);
    }
  }
});

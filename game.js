document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('startBtn');
  const intro = document.getElementById('intro');
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');

  if (!startBtn || !intro || !canvas) {
    console.error("❌ Missing elements in DOM. Check your HTML IDs.");
    return;
  }

  startBtn.addEventListener('click', async () => {
    intro.style.display = 'none';
    canvas.style.display = 'block';
    await loadLevel();
  });

  async function loadLevel() {
    try {
      const res = await fetch('levels.json');
      const levels = await res.json();
      const level = levels[0];

      const background = new Image();
      background.src = level.background;

      background.onload = () => {
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        console.log("✅ Game started");
      };

      background.onerror = () => {
        console.error(`❌ Failed to load image: ${background.src}`);
      };

    } catch (err) {
      console.error("❌ Failed to load level data:", err);
    }
  }
});

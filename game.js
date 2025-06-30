document.addEventListener('DOMContentLoaded', () => {
  console.log('🔥 DOM Ready, binding start button');

  const introScreen = document.getElementById('intro-screen');
  const startButton = document.getElementById('startButton');
  const gameCanvas = document.getElementById('gameCanvas');
  const ctx = gameCanvas.getContext('2d');

  if (!introScreen || !startButton || !gameCanvas || !ctx) {
    console.error('❌ Missing elements in DOM. Check your HTML IDs.');
    return;
  }

  startButton.addEventListener('click', () => {
    console.log('🚀 Starting game...');
    introScreen.style.display = 'none';
    gameCanvas.style.display = 'block';

    startGame();
  });

  function startGame() {
    // Placeholder game loop or init logic
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);

    ctx.fillStyle = 'white';
    ctx.font = '28px sans-serif';
    ctx.fillText('SofieBurn is Lit 🕯️', 250, 300);
  }
});

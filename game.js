window.addEventListener('DOMContentLoaded', () => {
  console.log('🕯️ DOM fully loaded, trying to bind start button...');
  
  const startButton = document.getElementById('startButton');
  if (!startButton) {
    console.error('❌ Could not find #startButton in DOM.');
    return;
  }

  startButton.addEventListener('click', () => {
    console.log('🟢 Start button clicked.');
    
    const intro = document.getElementById('intro-screen');
    const canvas = document.getElementById('gameCanvas');
    if (!intro || !canvas) {
      console.error('❌ Missing #intro-screen or #gameCanvas.');
      return;
    }

    intro.style.display = 'none';
    canvas.style.display = 'block';

    if (typeof startGame === 'function') {
      console.log('🚀 Starting game...');
      startGame();
    } else {
      console.warn('⚠️ startGame() is not defined.');
    }
  });
});

window.addEventListener('DOMContentLoaded', () => {
  console.log('🕯️ DOM Ready, binding start button');
  const startButton = document.getElementById('startButton');
  if (startButton) {
    startButton.addEventListener('click', () => {
      console.log('🔥 Starting game...');
      document.getElementById('intro-screen').style.display = 'none';
      document.getElementById('gameCanvas').style.display = 'block';
      startGame(); // This assumes startGame is defined elsewhere and handles init
    });
  } else {
    console.error('Start button not found in DOM');
  }
});

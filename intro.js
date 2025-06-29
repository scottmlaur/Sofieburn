document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('start-btn');
  const introScreen = document.getElementById('intro-screen');

  if (startButton && introScreen) {
    startButton.addEventListener('click', () => {
      introScreen.style.display = 'none';

      // Call the game start logic (this must be defined in main.js or game.js)
      if (typeof startGame === 'function') {
        startGame();
      } else {
        console.warn('startGame() is not defined.');
      }
    });
  } else {
    console.error('Intro screen or start button not found.');
  }
});

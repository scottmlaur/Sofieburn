let candle;

window.addEventListener('DOMContentLoaded', () => {
  console.log('🕯️ DOM Ready, binding start button');
  candle = document.getElementById('introImage'); // ✅ Fix: properly assign the candle element
  const startButton = document.getElementById('startButton');
  startButton.addEventListener('click', startGame);
});

fetch('./flappy-level.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to load flappy-level.json');
    }
    return response.json();
  })
  .then(levelData => {
    console.log('📜 Detailed level loaded:', levelData);
    // your existing logic using levelData continues here...
  })
  .catch(error => {
    console.error('❌ Failed to load flappy-level.json:', error);
  });

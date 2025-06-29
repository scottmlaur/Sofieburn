window.onload = function () {
  const introContainer = document.createElement('div');
  introContainer.id = 'intro';
  introContainer.style.display = 'flex';
  introContainer.style.flexDirection = 'column';
  introContainer.style.alignItems = 'center';
  introContainer.style.justifyContent = 'center';
  introContainer.style.height = '100vh';
  introContainer.style.backgroundColor = '#000';

  const candle = document.createElement('img');
  candle.src = 'assets/sofie_intro.png';
  candle.alt = 'Candle';
  candle.style.width = '64px';
  candle.style.height = '64px';
  candle.style.marginBottom = '20px';

  const startButton = document.createElement('button');
  startButton.innerText = 'Start Game';
  startButton.id = 'start-btn';
  startButton.style.padding = '10px 20px';
  startButton.style.fontSize = '16px';
  startButton.style.cursor = 'pointer';

  introContainer.appendChild(candle);
  introContainer.appendChild(startButton);
  document.body.appendChild(introContainer);

  startButton.addEventListener('click', () => {
    introContainer.remove();
    const script = document.createElement('script');
    script.src = 'game.js';
    document.body.appendChild(script);
  });
};

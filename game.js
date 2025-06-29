window.initGame = function(canvas) {
  const ctx = canvas.getContext('2d');

  // Load Sofie candle image
  const candle = new Image();
  candle.src = 'assets/characters/candle.png'; // Make sure this path is correct

  candle.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(candle, 100, 100); // center position can be adjusted
  };

  candle.onerror = () => {
    console.error("Failed to load candle image at " + candle.src);
  };
};

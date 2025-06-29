// game.js

function startGameLoop() {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');

  let candle = {
    x: 100,
    y: 200,
    width: 32,
    height: 32,
    color: '#FF9900',
    gravity: 0.5,
    velocity: 0
  };

  let pipes = [
    { x: 800, y: 0, width: 60, height: 200 },
    { x: 800, y: 350, width: 60, height: 250 }
  ];

  function update() {
    candle.velocity += candle.gravity;
    candle.y += candle.velocity;

    pipes.forEach(pipe => {
      pipe.x -= 2;
      if (pipe.x + pipe.width < 0) {
        pipe.x = 800;
      }
    });
  }

  function draw() {
    ctx.fillStyle = '#0D0D0D';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw candle
    ctx.fillStyle = candle.color;
    ctx.fillRect(candle.x, candle.y, candle.width, candle.height);

    // Draw pipes
    ctx.fillStyle = '#2A1C17';
    pipes.forEach(pipe => {
      ctx.fillRect(pipe.x, pipe.y, pipe.width, pipe.height);
    });
  }

  function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
  }

  loop();
}

// Attach to global for intro.js
window.initGame = startGameLoop;

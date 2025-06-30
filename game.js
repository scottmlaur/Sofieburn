<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>SofieBurn</title>
  <link rel="stylesheet" href="intro.css" />
</head>
<body>
  <div id="intro-screen">
    <h1>SofieBurn</h1>
    <img src="assets/intro.png" alt="Sofie holding candle" id="intro-image" />
    <button id="start-button">Light the Flame</button>
  </div>

  <canvas id="game-canvas" style="display: none;"></canvas>

  <script src="game.js"></script>
</body>

<body>
  <div id="intro-screen">
    <h1>SofieBurn</h1>
    <img id="introImage" src="assets/intro.png" alt="Sofie holding candle" style="max-width: 400px; height: auto; display: block; margin: 0 auto;" />
    <button id="startButton">Light the Flame</button>
  </div>

  <canvas id="gameCanvas" width="800" height="600" style="display: none;"></canvas>

  <script src="game.js" defer></script>
</body>

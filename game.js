const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

console.log("✅ game.js loaded");
console.log("Canvas present?", !!canvas);

// Core game init — called from intro.js
function initGame() {
  console.log("🚀 initGame() called");

  canvas.style.display = 'block';

  // Draw a big yellow square so we know it's working
  ctx.fillStyle = "#ffaa00";
  ctx.fillRect(100, 100, 200, 200);
}

// Expose to global scope so intro.js can call it
window.initGame = initGame;

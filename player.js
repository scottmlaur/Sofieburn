export class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 32;
    this.height = 48;
    this.speed = 2;
    this.brightening = false;
  }

  update(keys) {
    if (keys["ArrowRight"]) this.x += this.speed;
    if (keys["ArrowLeft"]) this.x -= this.speed;
    if (keys["ArrowUp"]) this.y -= this.speed;
    if (keys["ArrowDown"]) this.y += this.speed;

    this.brightening = keys[" "]; // Spacebar
  }

  draw(ctx) {
    // Candle aura
    if (this.brightening) {
      ctx.beginPath();
      ctx.arc(this.x + this.width / 2, this.y + this.height / 2, 60, 0, 2 * Math.PI);
      ctx.fillStyle = "rgba(255, 165, 0, 0.15)";
      ctx.fill();
    }

    // Draw body
    ctx.fillStyle = "orange";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

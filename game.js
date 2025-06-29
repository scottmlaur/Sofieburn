const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gravity = 0.6;
const jump = -10;

let candle = {
    x: 150,
    y: 150,
    width: 30,
    height: 30,
    velocity: 0
};

let pipes = [];
let pipeGap = 140;
let pipeWidth = 60;
let pipeSpacing = 280;

let background = new Image();
background.src = 'assets/backgrounds/sanctuary_bg.png';

let candleImg = new Image();
candleImg.src = 'assets/characters/candle.png';

function initGame() {
    pipes = [];
    for (let i = 0; i < 3; i++) {
        let pipeX = canvas.width + i * pipeSpacing;
        let pipeY = Math.floor(Math.random() * 200) + 50;
        pipes.push({ x: pipeX, y: pipeY });
    }

    candle.y = 150;
    candle.velocity = 0;

    document.addEventListener('keydown', () => {
        candle.velocity = jump;
    });

    requestAnimationFrame(gameLoop);
}

function drawBackground() {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
}

function drawCandle() {
    ctx.drawImage(candleImg, candle.x, candle.y, candle.width, candle.height);
}

function drawPipes() {
    ctx.fillStyle = '#300';
    pipes.forEach(pipe => {
        // Top pipe
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.y);
        // Bottom pipe
        ctx.fillRect(pipe.x, pipe.y + pipeGap, pipeWidth, canvas.height);
    });
}

function updatePipes() {
    pipes.forEach(pipe => {
        pipe.x -= 2;

        if (pipe.x + pipeWidth < 0) {
            pipe.x = canvas.width;
            pipe.y = Math.floor(Math.random() * 200) + 50;
        }

        // Collision detection
        if (
            candle.x < pipe.x + pipeWidth &&
            candle.x + candle.width > pipe.x &&
            (candle.y < pipe.y || candle.y + candle.height > pipe.y + pipeGap)
        ) {
            alert('Game Over 🕯️');
            initGame();
        }
    });
}

function gameLoop() {
    candle.velocity += gravity;
    candle.y += candle.velocity;

    if (candle.y + candle.height > canvas.height || candle.y < 0) {
        alert('Game Over 🕯️');
        initGame();
        return;
    }

    drawBackground();
    drawPipes();
    drawCandle();
    updatePipes();

    requestAnimationFrame(gameLoop);
}

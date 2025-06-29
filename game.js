const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

const gravity = 0.5;
const flapStrength = -10;
let candleY = canvas.height / 2;
let velocity = 0;
let score = 0;
let gameRunning = true;

const backgroundImg = new Image();
backgroundImg.src = 'assets/backgrounds/sanctuary_bg.png';

const candleImg = new Image();
candleImg.src = 'assets/characters/candle.png';

const pipeWidth = 80;
const pipeGap = 200;
const pipeSpeed = 2;
let pipes = [];

function spawnPipe() {
    const topPipeHeight = Math.floor(Math.random() * (canvas.height - pipeGap - 100)) + 50;
    pipes.push({
        x: canvas.width,
        top: topPipeHeight,
        bottom: topPipeHeight + pipeGap,
    });
}

function resetGame() {
    candleY = canvas.height / 2;
    velocity = 0;
    pipes = [];
    score = 0;
    spawnPipe();
    gameRunning = true;
}

function drawCandle() {
    ctx.drawImage(candleImg, 100, candleY, 40, 60);
}

function drawBackground() {
    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
}

function drawPipes() {
    ctx.fillStyle = '#3c1e1e';
    pipes.forEach(pipe => {
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top);
        ctx.fillRect(pipe.x, pipe.bottom, pipeWidth, canvas.height - pipe.bottom);
    });
}

function updatePipes() {
    pipes.forEach(pipe => {
        pipe.x -= pipeSpeed;
    });

    // Remove offscreen pipes
    if (pipes.length && pipes[0].x + pipeWidth < 0) {
        pipes.shift();
        score++;
    }

    // Add new pipe
    const lastPipe = pipes[pipes.length - 1];
    if (lastPipe && lastPipe.x < canvas.width - 300) {
        spawnPipe();
    }
}

function checkCollision() {
    for (const pipe of pipes) {
        if (
            100 + 40 > pipe.x &&
            100 < pipe.x + pipeWidth &&
            (candleY < pipe.top || candleY + 60 > pipe.bottom)
        ) {
            gameRunning = false;
            setTimeout(() => alert(`Game Over 🕯️`), 100);
        }
    }

    if (candleY + 60 > canvas.height || candleY < 0) {
        gameRunning = false;
        setTimeout(() => alert(`Game Over 🕯️`), 100);
    }
}

function gameLoop() {
    if (!gameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    drawPipes();
    drawCandle();

    velocity += gravity;
    candleY += velocity;

    updatePipes();
    checkCollision();

    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        velocity = flapStrength;
    }
});

function initGame() {
    resetGame();
    gameLoop();
}

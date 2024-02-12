const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const grid = 15;
const paddleHeight = grid * 5;
const maxPaddleY = canvas.offsetHeight - grid - paddleHeight;
let paddleSpeed = 6;
let ballSpeed = 5;
let p = document.querySelector('p');
let lscore = 0;
let rscore = 0;

const leftPaddle = {
    x: grid * 2,
    y: canvas.offsetHeight / 2 - paddleHeight / 2,
    width: grid,
    height: paddleHeight,
    dy: 0,
};
const rightPaddle = {
    x: canvas.offsetWidth - grid * 3,
    y: canvas.offsetHeight / 2 - paddleHeight / 2,
    width: grid,
    height: paddleHeight,
    dy: 0,
};
const ball = {
    x: canvas.offsetWidth / 2,
    y: canvas.offsetHeight / 2,
    width: grid,
    height: grid,
    resetting: false,
    dx: ballSpeed,
    dy: -ballSpeed,
}
const collides = (obj1, obj2) => {
    return obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.height > obj2.y;
}
const loop = () => {
    requestAnimationFrame(loop);
    context.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    if (lscore >= 10 || rscore >= 10) {
        alert('The end');
        lscore = 0;
        rscore = 0;
        p.textContent = 'Счёт 0:0';
    }
    leftPaddle.y += leftPaddle.dy;
    rightPaddle.y += rightPaddle.dy;
    if(leftPaddle.y < grid) leftPaddle.y = grid;
    else if(leftPaddle.y > maxPaddleY) leftPaddle.y = maxPaddleY;
    if(rightPaddle.y < grid) rightPaddle.y = grid;
    else if(rightPaddle.y > maxPaddleY) rightPaddle.y = maxPaddleY;
    context.fillStyle = 'blue';
    context.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
    context.fillStyle = 'red';
    context.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);
    context.fillStyle = 'white';
    ball.x += ball.dx;
    ball.y += ball.dy;
    if(ball.y < grid){
        ball.y = grid;
        ball.dy *= -1;
    }
    else if(ball.y + grid > canvas.offsetHeight - grid){
        ball.y = canvas.offsetHeight - grid * 2;
        ball.dy *= -1;
    }
    if( (ball.x < 0 || ball.x > canvas.offsetWidth) && !ball.resetting ){
        if (ball.x < 0) {
            lscore++;
        }
        else {
            rscore++;
        }
        p.textContent = 'Счёт ' + lscore + ':' + rscore;
        ball.resetting = true;
        setTimeout(() => {
            ball.resetting = false;
            ball.x = canvas.offsetWidth / 2;
            ball.y = canvas.offsetHeight / 2;
        }, 1000)
    }
    if(collides(ball, leftPaddle)){
        ball.dx *= -1;
        ball.x = leftPaddle.x + leftPaddle.width;
    }
    else if(collides(ball, rightPaddle)){
        ball.dx *= -1;
        ball.x = rightPaddle.x - ball.width;
    }

    context.fillRect(ball.x, ball.y, ball.width, ball.height);

    context.fillStyle = 'lightgrey';
    context.fillRect(0, 0, canvas.offsetWidth, grid);
    context.fillRect(0, canvas.offsetHeight - grid, canvas.offsetWidth, canvas.offsetHeight);

    for(let i = grid; i < canvas.offsetHeight - grid; i+= grid * 2){
        context.fillRect(canvas.offsetWidth / 2 - grid / 2, i, grid, grid)
    }
}
document.addEventListener('keydown', (e) => {
    if(e.which === 38){
        rightPaddle.dy = -paddleSpeed;
    }
    else if(e.which === 40){
        rightPaddle.dy = paddleSpeed;
    }
    if(e.which === 87){
        leftPaddle.dy = -paddleSpeed;
    }
    else if(e.which === 83){
        leftPaddle.dy = paddleSpeed;
    }
})
document.addEventListener('keyup', (e) => {
    if(e.which === 38 || e.which === 40){
        rightPaddle.dy = 0;
    }
    if(e.which === 83 || e.which === 87){
        leftPaddle.dy = 0;
    }
})
requestAnimationFrame(loop)
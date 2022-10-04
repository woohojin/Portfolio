const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1600;
canvas.height = 800;

const minWidth = 0;
const maxWidth = 1600;
const minHeight = 0;
const maxHeight = 800;

var ballRadius = 25;
var ballX = 80;
var ballY = 600;

var blockWidth = 100;
var blockHeight = 50;
var blockX = 150;
var blockY = 750;

var block2X = 350;
var block2Y = 700;
var block2Height = 100;

var moveSpeed = 3;
var bounceSpeed = 3.5;

var rightPressed = false;
var leftPressed = false;

var detected = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyUpHandler(e) {
  if (e.keyCode == 37) {
    leftPressed = false;
  } else if (e.keyCode == 39) {
    rightPressed = false;
  }
}

function keyDownHandler(e) {
  if (e.keyCode == 37) {
    leftPressed = true;
  } else if (e.keyCode == 39) {
    rightPressed = true;
  }
}

function ball() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fillStyle = "#FFF36B";
  ctx.stroke();
  ctx.fill();
}

function block() {
  ctx.fillStyle = "black";

  ctx.beginPath();
  ctx.fillRect(blockX, blockY, blockWidth, blockHeight);
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.fillRect(block2X, block2Y, blockWidth, block2Height);
  ctx.stroke();
  ctx.closePath();
}

function bouncing() {
  ballY += bounceSpeed;

  if (
    (ballY >= blockY - ballRadius &&
      ballX >= blockX - ballRadius &&
      ballX - ballRadius <= blockX + blockWidth) ||
    ballY == maxHeight - ballRadius ||
    (ballY >= block2Y - ballRadius &&
      ballX >= block2X - ballRadius &&
      ballX - ballRadius <= block2X + blockWidth) ||
    ballY == maxHeight - ballRadius
  ) {
    bounceSpeed = -bounceSpeed;

    setTimeout(() => {
      bounceSpeed = -bounceSpeed;
    }, 500);
  }
}

function bug() {
  if (ballY > maxHeight) {
    restart();
    alert("Sorry, Bug Occured. Restart the Game.");
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  block();
  ball();
  bouncing();
  bug();

  ctx.beginPath();
  ctx.moveTo(block2X - ballRadius, block2Y + block2Height);
  ctx.lineTo(block2X - ballRadius, block2Y - ballRadius);
  ctx.lineTo(block2X + blockWidth + ballRadius, block2Y - ballRadius);
  ctx.lineTo(block2X + blockWidth + ballRadius, block2Y + block2Height);
  ctx.strokeStyle = "red";
  ctx.stroke();
  ctx.closePath();

  if (rightPressed) {
    ballX += moveSpeed;
  } else if (leftPressed) {
    ballX -= moveSpeed;
  }

  if (ballX > maxWidth - ballRadius) {
    ballX -= moveSpeed;
  } else if (ballX < minWidth + ballRadius) {
    ballX += moveSpeed;
  }

  if (ballY >= blockY - ballRadius && ballX == blockX - ballRadius) {
    ballX -= moveSpeed;
  } else if (
    ballY >= blockY - ballRadius &&
    ballX == blockX + blockWidth + ballRadius
  ) {
    ballX += moveSpeed;
  }

  if (ballY >= block2Y - ballRadius && ballX == block2X - ballRadius) {
  } else if (
    ballY >= block2Y - ballRadius &&
    ballX == block2X + blockWidth + ballRadius
  ) {
    ballX += moveSpeed;
    alert("test2");
  }
}

function restart() {
  ballX = 80;
  ballY = 600;
}

setInterval(draw, 10);

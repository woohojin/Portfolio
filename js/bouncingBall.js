const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1600;
canvas.height = 800;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

var rightPressed = false;
var leftPressed = false;

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

ctx.font = "40px defaultFont";

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

var block3X = 580;
var block3Y = 600;
var block3Height = 200;

var block4X = 800;
var block4Y = 530;
var block4Height = 270;

var block5X = 1050;
var block5Y = 480;
var block5Height = 320;

var block6X = 1300;
var block6Y = 400;
var block6Height = 400;

var doorX = 1300;
var doorY = 300;
var doorRadius = 50;

var moveSpeed = 2.5;
var gravity = 3.5;
var gravity2 = 4;
var ballSpeed = 3.5;

var min = 0;
var sec = 0;
var time = 0;
var tm = "00";
var ts = "00";

var life = 3;

function ball() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fillStyle = "#FFF36B";
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

  ctx.beginPath();
  ctx.fillRect(block3X, block3Y, blockWidth, block3Height);
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.fillRect(block4X, block4Y, blockWidth, block4Height);
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.fillRect(block5X, block5Y, blockWidth, block5Height);
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.fillRect(block6X, block6Y, blockWidth, block6Height);
  ctx.stroke();
  ctx.closePath();
}

function door() {
  ctx.beginPath();
  ctx.arc(doorX + doorRadius, doorY, doorRadius, 0, Math.PI, true);
  ctx.moveTo(doorX, 300);
  ctx.lineTo(doorX, 400);
  ctx.lineTo(doorX + blockWidth, 400);
  ctx.lineTo(doorX + blockWidth, 300);
  ctx.closePath();
  ctx.fillStyle = "#FFFFFF";
  ctx.stroke();
  ctx.fill();
}

function bouncing() {
  ballY += ballSpeed;

  if (
    (ballY >= blockY - ballRadius &&
      ballX >= blockX - ballRadius &&
      ballX - ballRadius <= blockX + blockWidth) ||
    (ballY >= block2Y - ballRadius &&
      ballX >= block2X - ballRadius &&
      ballX - ballRadius <= block2X + blockWidth) ||
    (ballY >= block3Y - ballRadius &&
      ballX >= block3X - ballRadius &&
      ballX - ballRadius <= block3X + blockWidth) ||
    (ballY >= block4Y - ballRadius &&
      ballX >= block4X - ballRadius &&
      ballX - ballRadius <= block4X + blockWidth) ||
    (ballY >= block5Y - ballRadius &&
      ballX >= block5X - ballRadius &&
      ballX - ballRadius <= block5X + blockWidth) ||
    (ballY >= block6Y - ballRadius &&
      ballX >= block6X - ballRadius &&
      ballX - ballRadius <= block6X + blockWidth) ||
    (ballY == maxHeight - ballRadius && ballX < blockX)
  ) {
    ballSpeed = -gravity;

    setTimeout(() => {
      ballSpeed = gravity;
    }, 500);
  }
}

function finish() {
  if (ballX >= doorX) {
    alert("Clear! Clear Time : " + tm + " min " + ts + " sec");
    restart();
  }
}
function respawn() {
  ballX = 80;
  ballY = 600;

  life--;

  if (life < 0) {
    restart();
    alert("Game Over. Restart the Game.");
  }
}
function restart() {
  rightPressed = false;
  leftPressed = false;

  ballX = 80;
  ballY = 600;

  min = 0;
  sec = 0;
  time = 0;
  tm = "00";
  ts = "00";

  life = 3;
}

function bug() {
  if (ballY > maxHeight) {
    restart();
    alert("Sorry, Bug Occured. Restart the Game.");
  }
}

function stopwatch() {
  setInterval(function () {
    time++;

    min = Math.floor(time / 60);
    sec = time % 60;
    min = min % 60;

    tm = min;
    ts = sec;

    if (tm < 10) {
      tm = "0" + min;
    }
    if (ts < 10) {
      ts = "0" + sec;
    }
  }, 1000);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillText(tm, 50, 50);
  ctx.fillText(":", 100, 47);
  ctx.fillText(ts, 115, 50);

  ctx.fillText("Your life : " + life, 1350, 50);
  block();
  door();
  ball();
  bouncing();
  finish();
  bug();

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
    ballX -= moveSpeed;
  } else if (
    ballY >= block2Y - ballRadius &&
    ballX == block2X + blockWidth + ballRadius
  ) {
    ballX += moveSpeed;
  }

  if (ballY >= block3Y - ballRadius && ballX == block3X - ballRadius) {
    ballX -= moveSpeed;
  } else if (
    ballY >= block3Y - ballRadius &&
    ballX == block3X + blockWidth + ballRadius
  ) {
    ballX += moveSpeed;
  }

  if (ballY >= block4Y - ballRadius && ballX == block4X - ballRadius) {
    ballX -= moveSpeed;
  } else if (
    ballY >= block4Y - ballRadius &&
    ballX == block4X + blockWidth + ballRadius
  ) {
    ballX += moveSpeed;
  }

  if (ballY >= block5Y - ballRadius && ballX == block5X - ballRadius) {
    ballX -= moveSpeed;
  } else if (
    ballY >= block5Y - ballRadius &&
    ballX == block5X + blockWidth + ballRadius
  ) {
    ballX += moveSpeed;
  }

  if (ballY >= block6Y - ballRadius && ballX == block6X - ballRadius) {
    ballX -= moveSpeed;
  } else if (
    ballY >= block6Y - ballRadius &&
    ballX == block6X + blockWidth + ballRadius
  ) {
    ballX += moveSpeed;
  }

  if (ballY == maxHeight - ballRadius && ballX > blockX) {
    respawn();
  }
}

setInterval(draw, 10);
stopwatch();

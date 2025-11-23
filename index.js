const user = document.querySelector("#user");
const board = document.querySelector(".board");
const ball = document.querySelector(".ball")

let userPadY = 200;          // starting Y
const speed = 7;           // movement per key press

const boardHeight = board.clientHeight;
const paddleHeight = user.clientHeight

let ballX = 300;
let ballY = 200;

let ballSpeed = 2;
let ballSpeedX = ballSpeed;   // horizontal movement
let ballSpeedY = ballSpeed;   // vertical movement

let keys = {
  up: false,
  down: false
};

document.addEventListener("keydown", (e) => {
  if (e.key === "w" || e.key === "ArrowUp") keys.up = true;
  if (e.key === "s" || e.key === "ArrowDown") keys.down = true;
});

document.addEventListener("keyup", (e) => {
  if (e.key === "w" || e.key === "ArrowUp") keys.up = false;
  if (e.key === "s" || e.key === "ArrowDown") keys.down = false;
});

function updatePaddle() {
  const maxY = boardHeight - paddleHeight - 10;

  if (keys.up) {
    userPadY -= speed;
  }
  if (keys.down) {
    userPadY += speed;
  }

  // clamp
  if (userPadY < 0) userPadY = 0;
  if (userPadY > maxY) userPadY = maxY;

  user.style.top = userPadY + "px";
}


function checkCollision() {
  const paddleRect = user.getBoundingClientRect();
  const ballRect = ball.getBoundingClientRect();

  // simple AABB collision
  return !(
    ballRect.right < paddleRect.left ||
    ballRect.left > paddleRect.right ||
    ballRect.bottom < paddleRect.top ||
    ballRect.top > paddleRect.bottom
  );
}

function gameLoop() {
  // move ball
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // apply movement
  ball.style.left = ballX + "px";
  ball.style.top = ballY + "px";

  // collisions with top/bottom walls
  if (ballY <= 0 || ballY >= board.clientHeight - ball.clientHeight) {
    ballSpeedY *= -1;
  }

  // collision with paddle
  if (checkCollision()) {
    ballSpeedX *= -1; // bounce horizontally
  }

  // collision with left/right walls (optional)
  if (ballX <= 0 || ballX >= board.clientWidth - ball.clientWidth) {
    ballSpeedX *= -1;
  }

  updatePaddle();
  requestAnimationFrame(gameLoop);
}

gameLoop();


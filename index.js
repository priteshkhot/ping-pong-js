// player (user and comp)
const user = document.querySelector("#user");
const comp = document.querySelector("#comp");

const board = document.querySelector(".board");    // game board 
const ball = document.querySelector(".ball");     // ball

// control buttons on screen
const upBtn = document.querySelector(".moveup");
const downBtn = document.querySelector(".movedown");

let userPadY = 200;          // starting Y
const speed = 7;           // movement per key press

const boardHeight = board.clientHeight;
const paddleHeight = user.clientHeight;
// maximum space at top to avoid collision with board
const maxY = boardHeight - paddleHeight - 10;
// for comp, syncing the ball with center of the comp paddle
const ballcompSync = (comp.clientHeight - ball.clientHeight)/2;

// starting position for ball
let ballX = 300;
let ballY = 200;

let ballSpeed = 2;
let ballSpeedX = ballSpeed;   // horizontal movement
let ballSpeedY = ballSpeed;   // vertical movement

// all this to avoid few miliseconds delay from keydown event :<
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

upBtn.addEventListener('pointerdown', (e) => {
  keys.up = true;
  console.log("button pressed");
});

upBtn.addEventListener('pointerup', (e) => {
  keys.up = false;
  console.log("button lifted");
});

downBtn.addEventListener('pointerdown', (e) => {
  keys.down = true;
  console.log("button pressed");
});

downBtn.addEventListener('pointerup', (e) => {
  keys.down = false;
  console.log("button lifted");
});

// move player
function updatePaddle() {
  if (keys.up) {
    userPadY -= speed;
  }
  if (keys.down) {
    userPadY += speed;
  }

  // avoid collision with board boundaries
  if (userPadY < 0) userPadY = 0;
  if (userPadY > maxY) userPadY = maxY;

  user.style.top = userPadY + "px";
}

function checkUserCollision() {
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

// Axis-Aligned Bounding Box collision
function checkCompCollision() {
  const paddleRect = comp.getBoundingClientRect();
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

  // apply movement to ball
  ball.style.left = ballX + "px";
  ball.style.top = ballY + "px";

  // apply movement to opponent (I'll make it a separate function later)
  if (ballY < ballcompSync) {
    comp.style.top = 0 + "px";
  } else if ((ballY - ballcompSync) > maxY) {
    comp.style.top = maxY + "px"
  } else {
    comp.style.top = (ballY - ballcompSync) + "px";
  }

  // for auto-play (testing)
  // user.style.top = window.getComputedStyle(comp).top; 

  // collisions with top/bottom walls
  if (ballY <= 0 || ballY >= board.clientHeight - ball.clientHeight) {
    ballSpeedY *= -1;
  }

  // collision with paddle
  if (checkUserCollision() || checkCompCollision()) {
    ballSpeedX *= -1; // bounce horizontally
  }

  // collision with left/right walls (testing)
  if (ballX <= 0 || ballX >= board.clientWidth - ball.clientWidth) {
    ballSpeedX *= -1;
  }

  updatePaddle();
  requestAnimationFrame(gameLoop);
}

gameLoop();


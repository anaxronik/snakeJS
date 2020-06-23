console.log("working");

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const background = new Image();
background.src = "./images/background.png";

const foodImg = new Image();
foodImg.src = "./images/food.png";

let boxSize = 32;
let score = 0;
let updateDelay = 300;

let food = {
  x: Math.floor(Math.random() * 17 + 1) * boxSize,
  y: Math.floor(Math.random() * 15 + 3) * boxSize,
};

let snake = [];
snake[0] = {
  x: 9 * boxSize,
  y: 10 * boxSize,
};

document.addEventListener("keydown", direction);

let dir;
function direction(event) {
  if (event.key === "ArrowLeft" && dir !== "right") {
    dir = "left";
  }
  if (event.key === "ArrowRight" && dir !== "left") {
    dir = "right";
  }
  if (event.key === "ArrowUp" && dir !== "down") {
    dir = "up";
  }
  if (event.key === "ArrowDown" && dir !== "up") {
    dir = "down";
  }
}

function eatTail(head, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (head.x === arr[i].x && head.y === arr[i].y) {
      gameOver();
    }
  }
}

function drawGame() {
  ctx.drawImage(background, 0, 0);
  ctx.drawImage(foodImg, food.x, food.y);
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "green" : "orange";
    ctx.fillRect(snake[i].x, snake[i].y, boxSize, boxSize);
  }
  ctx.fillStyle = "white";
  ctx.font = "50px Arial";
  ctx.fillText(score, boxSize * 2.5, boxSize * 1.5);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (snakeX === food.x && snakeY === food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * 17 + 1) * boxSize,
      y: Math.floor(Math.random() * 15 + 3) * boxSize,
    };
  } else {
    snake.pop();
  }

  if (
    snakeX < boxSize ||
    snakeX > boxSize * 17 ||
    snakeY < 3 * boxSize ||
    snakeY > boxSize * 17
  ) {
    gameOver();
  }

  if (dir === "left") snakeX -= boxSize;
  if (dir === "right") snakeX += boxSize;
  if (dir === "up") snakeY -= boxSize;
  if (dir === "down") snakeY += boxSize;

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  eatTail(newHead, snake);

  snake.unshift(newHead);
}

function gameOver() {
  clearInterval(game);
  ctx.font = "50px Arial";
  ctx.fillStyle = "red";
  ctx.fillText("GAME OVER", 150, 300);
  ctx.font = "30px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("PLEASE RESTART GAME", 140, 350);
  // window.location.reload(false);
}

let reloadButton = document.getElementById("reload");
function reloadPage() {
  window.location.reload(false);
}
reloadButton.addEventListener("click", reloadPage);

let game = setInterval(drawGame, updateDelay);

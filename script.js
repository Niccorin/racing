const car = document.getElementById("car");
const obstacle = document.getElementById("obstacle");
const scoreText = document.getElementById("score");
const gameOverText = document.getElementById("game-over");

let jumping = false;
let score = 0;
let gameRunning = true;

// ジャンプ処理
function jump() {
  if (jumping || !gameRunning) return;
  jumping = true;
  let jumpHeight = 80;
  car.style.transition = "bottom 0.3s";
  car.style.bottom = jumpHeight + 20 + "px";
  setTimeout(() => {
    car.style.bottom = "20px";
    setTimeout(() => {
      jumping = false;
    }, 300);
  }, 300);
}

// スペースキー or タップでジャンプ
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") jump();
});
document.addEventListener("click", () => jump());

// 障害物の移動と当たり判定
function moveObstacle() {
  let pos = 800;
  let speed = 5;

  const interval = setInterval(() => {
    if (!gameRunning) return clearInterval(interval);

    pos -= speed;
    obstacle.style.left = pos + "px";

    // 当たり判定
    const carRect = car.getBoundingClientRect();
    const obsRect = obstacle.getBoundingClientRect();
    if (
      carRect.left < obsRect.right &&
      carRect.right > obsRect.left &&
      carRect.bottom > obsRect.top &&
      carRect.top < obsRect.bottom
    ) {
      endGame();
      clearInterval(interval);
    }

    // 画面外に出たら再配置
    if (pos < -30) {
      pos = 800 + Math.random() * 300;
      obstacle.style.left = pos + "px";
    }
  }, 20);
}

// スコアカウント
function updateScore() {
  const interval = setInterval(() => {
    if (!gameRunning) return clearInterval(interval);
    score++;
    scoreText.textContent = `スコア: ${score}`;
  }, 100);
}

// ゲームオーバー
function endGame() {
  gameRunning = false;
  gameOverText.style.display = "block";
}

// スタート！
moveObstacle();
updateScore();

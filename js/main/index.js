// Хранит игровые данные
var map = {};
let multiplier = 35;

// Функция отрисовки игрового поля
function draw() {
  const field = $(".field");

  for (let i = 0; i < map.height; i += 1) {
    for (let j = 0; j < map.width; j += 1) {
      const tile = map.gameZone[i][j];
      if (!tile.isEmpty) {
        const cell = $("<div></div>");
        cell.attr("class", "field");
        cell.width(multiplier).height(multiplier);
        cell.offset({ top: multiplier * i, left: multiplier * j });
        tile.draw(cell);
        field.append(cell);
      }
    }
  }
}

// Вывод сообщения об окончании игры
function isGameOver() {
  const player = getObjectsByInstanceOf(map, Player)[0];
  const enemies = getObjectsByInstanceOf(map, Enemy);
  if (enemies.length === 0 || player.health <= 0) {
    const status = enemies.length === 0 ? "Win" : "Lose";
    setTimeout(function () {
      confirm("Game Over: " + status);
      window.location.reload();
    }, 0);
  }
}

// Функция обновления игрового состояния
function update(playerAction) {
  $(".field").empty();
  gameStep(map, playerAction);
  draw();
  isGameOver();
}

// Функция-слушатель нажатий на клавиатуру
document.addEventListener("keypress", (event) => {
  const keyName = event.key.toLocaleLowerCase();

  let playerAction = Action.UNKNOWN;
  switch (keyName) {
    case "w":
    case "ц":
      playerAction = Action.UP;
      break;
    case "d":
    case "в":
      playerAction = Action.RIGHT;
      break;
    case "s":
    case "ы":
      playerAction = Action.DOWN;
      break;
    case "a":
    case "ф":
      playerAction = Action.LEFT;
      break;
    case " ":
      playerAction = Action.ATTACK;
      break;
  }
  update(playerAction);
});

// Изменение размеров окна
window.addEventListener("resize", (event) => {
  const pageWidth = $(window).width();
  const pageHeight = $(window).height();

  const mapWidth = map.width;
  const mapHeight = map.height;

  multiplier = Math.ceil(
    Math.min(pageWidth / mapWidth, pageHeight / mapHeight) * 0.95
  );

  const fieldBox = $(".field-box");

  fieldBox.width(multiplier * mapWidth).height(multiplier * mapHeight);
  fieldBox.css("background-size", `${multiplier}px`);

  $(".field").empty();
  draw();
});

// Функция-инициализатор
window.addEventListener("load", (event) => {
  const initData = Settings;
  map = gameGenerator(initData);
  window.dispatchEvent(new Event("resize"));
});

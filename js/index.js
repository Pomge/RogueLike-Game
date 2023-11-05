// Хранит игровые данные
var gameData = {};
let multiplier = 35;

// "Рисует" объект - стена
// Возвращает модифицированную ячейку
const drawWall = (cell) => {
  cell.addClass("wall");
  return cell;
};

// "Рисует" объект - меч
// Возвращает модифицированную ячейку
const drawSword = (cell) => {
  cell.addClass("sword");
  return cell;
};

// "Рисует" объект - зелье
// Возвращает модифицированную ячейку
const drawPotion = (cell) => {
  cell.addClass("potion");
  return cell;
};

// "Рисует" полоску здоровья
//
// Аргументы {
//    entity - существо
//    cell - ячейка
//    isPlayer - является ли игроком
// }
const drawHealthBar = (entity, cell, isPlayer) => {
  const health = Math.ceil((entity.health / entity.maxHealth) * 100);
  const healthBar = $("<div></div>");
  const className = isPlayer ? "player" : "enemy";
  healthBar.attr("class", className + " health");
  healthBar.css("width", health + "%");

  const healthPoint = $(`<p>${entity.health} HP</p>`);
  healthPoint.attr("class", "healthPoint");

  cell.append(healthPoint);
  cell.append(healthBar);
};

// "Рисует" объект - игрок
// Возвращает модифицированную ячейку
const drawPlayer = (cell) => {
  const player = gameData.player;
  cell.addClass("player");

  if (player.horizontalSpeed > 0) {
    cell.addClass("right");
  } else {
    cell.addClass("left");
  }

  drawHealthBar(player, cell, true);

  return cell;
};

// "Рисует" объект - противник
// Возвращает модифицированную ячейку
const drawEnemy = (cell, enemy) => {
  cell.addClass("enemy");

  switch (enemy.moveType) {
    case EnemyMoveType.HORIZONTAL:
    case EnemyMoveType.VERTICAL:
      cell.addClass("linear");
      break;
    case EnemyMoveType.RANDOM:
      cell.addClass("random");
      break;
    case EnemyMoveType.HUNTER:
      cell.addClass("hunter");
      break;
  }

  if (enemy.horizontalSpeed > 0) {
    cell.addClass("right");
  } else {
    cell.addClass("left");
  }

  drawHealthBar(enemy, cell, false);

  return cell;
};

// Функция отрисовки игрового поля
const draw = () => {
  const field = $(".field");
  const map = gameData.map;

  for (let i = 0; i < map.height; i += 1) {
    for (let j = 0; j < map.width; j += 1) {
      const cell = $("<div></div>");
      cell.attr("class", "field");
      cell.width(multiplier).height(multiplier);
      cell.offset({ top: multiplier * i, left: multiplier * j });

      if (!map.gameZone[i][j]) {
        const swords = gameData.swords;
        const potions = gameData.potions;
        const enemies = gameData.enemies;
        const player = gameData.player;

        if (isContains(i, j, swords) !== -1) {
          drawSword(cell);
        } else if (isContains(i, j, potions) !== -1) {
          drawPotion(cell);
        } else if (player.i === i && player.j === j) {
          drawPlayer(cell);
        } else {
          const enemyIndex = isContains(i, j, enemies);
          const enemy = enemies[enemyIndex];

          if (enemyIndex !== -1) {
            drawEnemy(cell, enemy);
          } else {
            drawWall(cell);
          }
        }

        field.append(cell);
      }
    }
  }
};

// Вывод сообщения об окончании игры
const isGameOver = () => {
  const player = gameData.player;
  const enemies = gameData.enemies;
  if (enemies.length === 0 || player.health <= 0) {
    const status = enemies.length === 0 ? "Win" : "Lose";
    setTimeout(function () {
      confirm("Game Over: " + status);
      window.location.reload();
    }, 1);
  }
};

// Функция обновления игрового состояния
const update = (isPlayerAttacking = false) => {
  $(".field").empty();
  gameData.isPlayerAttacking = isPlayerAttacking;
  gameStep(gameData);
  draw();
  isGameOver();
};

// Функция-слушатель нажатий на клавиатуру
document.addEventListener("keypress", (event) => {
  const keyName = event.key.toLocaleLowerCase();

  gameData.playerDirection = Directions.UNKNOWN;
  switch (keyName) {
    case "w":
    case "ц":
      gameData.playerDirection = Directions.UP;
      break;
    case "d":
    case "в":
      gameData.playerDirection = Directions.RIGHT;
      break;
    case "s":
    case "ы":
      gameData.playerDirection = Directions.DOWN;
      break;
    case "a":
    case "ф":
      gameData.playerDirection = Directions.LEFT;
      break;
    case " ":
      update(true);
      return;
  }
  update();
});

// Изменение размеров окна
window.addEventListener("resize", (event) => {
  const pageWidth = $(window).width();
  const pageHeight = $(window).height();

  multiplier = Math.ceil(
    Math.min(pageWidth / gameData.map.width, pageHeight / gameData.map.height) *
      0.95
  );

  const fieldBox = $(".field-box");
  const mapWidth = gameData.map.width;
  const mapHeight = gameData.map.height;
  fieldBox.width(multiplier * mapWidth).height(multiplier * mapHeight);
  fieldBox.css("background-size", `${multiplier}px`);

  $(".field").empty();
  draw();
});

// Функция-инициализатор
window.addEventListener("load", (event) => {
  const initData = Settings;
  gameData = gameGenerator(initData);
  window.dispatchEvent(new Event("resize"));
});

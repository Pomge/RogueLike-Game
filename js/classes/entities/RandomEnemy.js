function RandomEnemy(i, j, health, power, moveType) {
  Enemy.call(this, i, j, health, power, moveType);
}

RandomEnemy.prototype.__proto__ = Enemy.prototype;

RandomEnemy.prototype.draw = function (cell) {
  this.drawEnemy(cell);
  cell.addClass("random");
};

RandomEnemy.prototype.step = function (map, undefined) {
  const i = this.i;
  const j = this.j;

  let posibleSteps = [];
  if (i - 1 >= 0) {
    if (map.gameZone[i - 1][j].isEmpty) {
      posibleSteps.push(Action.UP);
    }
  }
  if (j + 1 < map.width) {
    if (map.gameZone[i][j + 1].isEmpty) {
      posibleSteps.push(Action.RIGHT);
    }
  }
  if (i + 1 < map.height) {
    if (map.gameZone[i + 1][j].isEmpty) {
      posibleSteps.push(Action.DOWN);
    }
  }
  if (j - 1 >= 0) {
    if (map.gameZone[i][j - 1].isEmpty) {
      posibleSteps.push(Action.LEFT);
    }
  }

  const length = posibleSteps.length;
  const direction = posibleSteps[getRandomIntInRange(0, length - 1)];

  this.changeDirection(direction);

  return direction;
};

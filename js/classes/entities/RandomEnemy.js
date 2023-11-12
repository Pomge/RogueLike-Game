function RandomEnemy(i, j, health, power, moveType) {
  Enemy.call(this, i, j, health, power, moveType);
}

RandomEnemy.prototype.__proto__ = Enemy.prototype;

RandomEnemy.prototype.draw = function (cell) {
  Enemy.prototype.draw.call(this, cell);
  cell.addClass("random");
};

RandomEnemy.prototype.step = function (map, undefined) {
  const i = this.i;
  const j = this.j;

  const gameZone = map.gameZone;
  const width = map.width;
  const height = map.height;

  let posibleSteps = [];
  if (i - 1 >= 0) {
    if (gameZone[i - 1][j].isEmpty) {
      posibleSteps.push(Action.UP);
    }
  } else if (i - 1 === -1) {
    if (gameZone[height - 1][j].isEmpty) {
      posibleSteps.push(Action.UP);
    }
  }

  if (j + 1 < width) {
    if (gameZone[i][j + 1].isEmpty) {
      posibleSteps.push(Action.RIGHT);
    }
  } else if (j + 1 === width) {
    if (gameZone[i][0].isEmpty) {
      posibleSteps.push(Action.RIGHT);
    }
  }

  if (i + 1 < height) {
    if (gameZone[i + 1][j].isEmpty) {
      posibleSteps.push(Action.DOWN);
    }
  } else if (i + 1 === height) {
    if (gameZone[0][j].isEmpty) {
      posibleSteps.push(Action.DOWN);
    }
  }

  if (j - 1 >= 0) {
    if (gameZone[i][j - 1].isEmpty) {
      posibleSteps.push(Action.LEFT);
    }
  } else if (j - 1 === -1) {
    if (gameZone[i][width - 1].isEmpty) {
      posibleSteps.push(Action.LEFT);
    }
  }

  const length = posibleSteps.length;
  const direction = posibleSteps[getRandomIntInRange(0, length - 1)];

  this.changeDirection(direction);

  return direction;
};

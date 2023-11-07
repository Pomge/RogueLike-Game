function LinearEnemy(i, j, health, power, moveType) {
  Enemy.call(this, i, j, health, power, moveType);
  this.speed = Math.random() < 0.5 ? 1 : -1;
}

LinearEnemy.prototype.__proto__ = Enemy.prototype;

LinearEnemy.prototype.draw = function (cell) {
  this.__proto__.__proto__.draw.call(this, cell);
  cell.addClass("linear");
};

LinearEnemy.prototype.step = function (map, undefined) {
  let direction = EnemyMoveType.UNKNOWN;

  const i = this.i;
  const j = this.j;

  if (this.moveType == EnemyMoveType.HORIZONTAL) {
    const finalJndex = mapTeleport(j + this.speed, map.width);
    if (map.gameZone[i][finalJndex].isEmpty) {
      direction = this.speed > 0 ? Action.RIGHT : Action.LEFT;
    } else {
      this.speed *= -1;
    }
  } else {
    const finalIndex = mapTeleport(i + this.speed, map.height);
    if (map.gameZone[finalIndex][j].isEmpty) {
      direction = this.speed > 0 ? Action.DOWN : Action.UP;
    } else {
      this.speed *= -1;
    }
  }

  this.direction = this.speed;

  return direction;
};

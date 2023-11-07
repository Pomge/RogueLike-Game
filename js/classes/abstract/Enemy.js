function Enemy(i, j, health, power, moveType) {
  Entity.call(this, i, j, health, power);
  this.moveType = moveType;
  this.isAttacking = false;
}

Enemy.prototype.__proto__ = Entity.prototype;

Enemy.prototype.drawEnemy = function (cell) {
  cell.addClass("enemy");
  this.drawEntity(cell);
  this.drawHealthBar(cell);

  if (this.isAttacking) {
    cell.addClass("attack");
  }
};

Enemy.prototype.drawHealthBar = function (cell) {
  const healthPercent = Math.ceil((this.health / this.maxHealth) * 100);
  const healthBar = $("<div></div>");
  healthBar.attr("class", "enemy health");
  healthBar.css("width", healthPercent + "%");

  const healthPoint = $(`<p>${this.health} HP</p>`);
  healthPoint.attr("class", "healthPoint");

  cell.append(healthPoint);
  cell.append(healthBar);
};

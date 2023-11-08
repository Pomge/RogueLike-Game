function Player(i, j, health, power) {
  Entity.call(this, i, j, health, power);
}

Player.prototype.__proto__ = Entity.prototype;

Player.prototype.draw = function (cell) {
  this.__proto__.__proto__.draw.call(this, cell);

  cell.addClass("player");
  this.drawHealthBar(cell);
};

Player.prototype.drawHealthBar = function (cell) {
  const healthPercent = Math.ceil((this.health / this.maxHealth) * 100);
  const healthBar = $("<div></div>");

  healthBar.attr("class", "player health");
  healthBar.css("width", healthPercent + "%");

  cell.append(healthBar);
};

Player.prototype.drinkPotion = function (potion) {
  if (this.health < this.maxHealth) {
    this.health += potion.buff;
  }
};

Player.prototype.takeSword = function (sword) {
  this.power += sword.buff;
};

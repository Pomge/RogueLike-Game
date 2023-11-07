// Передвигает сущность по карте
//
// Аргументы {
//    map - карта
//    direction - направление передвижения
//    entity - сущность
//    isPlayer - совершается ли передвижение игроком
// }
function moveEntity(map, direction, entity, isPlayer) {
  const { indexDiff, jndexDiff } = getIndexJndex(direction);

  const entity_i = entity.i;
  const entity_j = entity.j;

  let finalIndex = mapTeleport(entity_i + indexDiff, map.height);
  let finalJndex = mapTeleport(entity_j + jndexDiff, map.width);

  let nextCell = map.gameZone[finalIndex][finalJndex];

  if (isPlayer) {
    entity.changeDirection(direction);
    if (nextCell.__proto__ === Potion.prototype) {
      entity.drinkPotion(nextCell);
      nextCell = new Tile(nextCell.i, nextCell.j, true);
    } else if (nextCell.__proto__ === Sword.prototype) {
      entity.takeSword(nextCell);
      nextCell = new Tile(nextCell.i, nextCell.j, true);
    }
  }

  if (nextCell.isEmpty) {
    map.gameZone[finalIndex][finalJndex] = entity;
    entity.i = finalIndex;
    entity.j = finalJndex;

    map.gameZone[entity_i][entity_j] = nextCell;
    nextCell.i = entity_i;
    nextCell.j = entity_j;
  }
}

// Вызывает функцию передвижения для каждого из врагов
//
// Аргументы {
//    map - карта
//    enemies - список противников
//    player - игрок
// }
function moveEnemies(map, enemies, player) {
  for (let i = 0; i < enemies.length; i += 1) {
    const enemy = enemies[i];
    const direction = enemy.step(map, player);
    moveEntity(map, direction, enemy, false);
  }
}

// Считает атаки
//
// Аргументы {
//    map - карта
//    player - игрок
//    enemies - список противников
//    isPlayerAttacking - совершает ли игрок атаку
// }
function calculateAttacks(map, player, enemies, isPlayerAttacking) {
  const player_i = player.i;
  const player_j = player.j;

  let deadEnemies = [];
  for (let i = 0; i < enemies.length; i += 1) {
    const enemy = enemies[i];
    const enemy_i = enemy.i;
    const enemy_j = enemy.j;

    const isAttackZone =
      Math.abs(enemy_i - player_i) <= 1 && Math.abs(enemy_j - player_j) <= 1;
    enemy.isAttacking = isAttackZone;

    if (isAttackZone) {
      if (isPlayerAttacking) {
        enemy.health -= player.power;
      }
      if (enemy.health <= 0) {
        deadEnemies.push(enemy);
      } else {
        player.health -= enemy.power;
      }
    }
  }

  for (let i = deadEnemies.length - 1; i >= 0; i -= 1) {
    const enemy = deadEnemies[i];
    const enemy_i = enemy.i;
    const enemy_j = enemy.j;

    map.gameZone[enemy_i][enemy_j] = new Tile(enemy_i, enemy_i, true);
  }
}

// Основаня функция-обработчик игровых механик
const gameStep = (map, playerAction) => {
  const player = getObjectsByInstanceOf(map, Player)[0];
  let enemies = getObjectsByInstanceOf(map, Enemy);

  moveEnemies(map, enemies, player);

  if (playerAction !== Action.ATTACK) {
    moveEntity(map, playerAction, player, true);
  }

  calculateAttacks(map, player, enemies, playerAction === Action.ATTACK);
};

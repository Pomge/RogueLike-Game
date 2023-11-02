// Просчитывает аттаки на текущем шаге
//
// Аргументы {
//    map - карта
//    player - игрок
//    enemies - список противников
//    isPlayerAttacking - совершает ли игрок атаку
// }
const calculateAttacks = (map, player, enemies, isPlayerAttacking) => {
  const player_i = player.i;
  const player_j = player.j;

  let toRemove = [];
  for (let i = 0; i < enemies.length; i += 1) {
    const enemy = enemies[i];
    const enemy_i = enemy.i;
    const enemy_j = enemy.j;

    if (
      Math.abs(enemy_i - player_i) <= 1 &&
      Math.abs(enemy_j - player_j) <= 1
    ) {
      let isEnemyAlive = true;
      if (isPlayerAttacking) {
        enemy.health -= player.power;

        if (enemy.health <= 0) {
          isEnemyAlive = false;
          toRemove.push(i);

          map.gameZone[enemy_i][enemy_j] = true;
        }
      }

      if (isEnemyAlive) {
        player.health -= enemy.power;
      }
    }
  }

  for (let i = toRemove.length - 1; i >= 0; i -= 1) {
    enemies.splice(toRemove[i], 1);
  }
};

// Просчитывает линейный тип движения для противника для следующего шага
//
// Аргументы {
//    enemy - противник
// }
//
// Возвращаемое значение {
//    direction - новое направление движения
// }
const linearStep = (enemy) => {
  let horizontalSpeed = enemy.horizontalSpeed;
  let verticalSpeed = enemy.verticalSpeed;
  let direction = -1;

  if (enemy.moveType == EnemyMoveType.HORIZONTAL) {
    direction = horizontalSpeed > 0 ? Directions.RIGHT : Directions.LEFT;
  } else {
    direction = verticalSpeed > 0 ? Directions.DOWN : Directions.UP;
  }

  return direction;
};

// Просчитывает случайный тип движения для противника для следующего шага
//
// Аргументы {
//    map - карта
//    enemy - противник
// }
//
// Возвращаемое значение {
//    direction - новое направление движения
// }
const randomStep = (map, enemy) => {
  const i = enemy.i;
  const j = enemy.j;

  let posibleSteps = [];
  if (i - 1 >= 0) {
    if (map.gameZone[i - 1][j]) {
      posibleSteps.push(Directions.UP);
    }
  }
  if (j + 1 < map.width) {
    if (map.gameZone[i][j + 1]) {
      posibleSteps.push(Directions.RIGHT);
    }
  }
  if (i + 1 < map.height) {
    if (map.gameZone[i + 1][j]) {
      posibleSteps.push(Directions.DOWN);
    }
  }
  if (j - 1 >= 0) {
    if (map.gameZone[i][j - 1]) {
      posibleSteps.push(Directions.LEFT);
    }
  }

  const length = posibleSteps.length;
  const direction = posibleSteps[getRandomIntInRange(0, length - 1)];

  return direction;
};

// Просчитывает охотничий (преследование игрока) тип движения для противника для следующего шага
//
// Аргументы {
//    map - карта
//    enemy - противник
//    player - игрок
// }
//
// Возвращаемое значение {
//    direction - новое направление движения
// }
const hunterStep = (map, enemy, player) => {
  let queue = [];

  let matrix = Array(map.height)
    .fill()
    .map(() => Array(map.width).fill(false));

  for (let i = 0; i < map.height; i += 1) {
    for (let j = 0; j < map.width; j += 1) {
      matrix[i][j] = map.gameZone[i][j];
    }
  }

  matrix[enemy.i][enemy.j] = false;
  queue.push([{ i: enemy.i, j: enemy.j }]);

  while (queue.length > 0) {
    let path = queue.shift();
    let position = path[path.length - 1];
    let direction = [
      [position.i + 1, position.j + 0],
      [position.i + 0, position.j + 1],
      [position.i - 1, position.j + 0],
      [position.i + 0, position.j - 1],
    ];

    for (let i = 0; i < direction.length; i += 1) {
      if (direction[i][0] === player.i && direction[i][1] === player.j) {
        let direction = -1;
        if (path.length > 1) {
          const firstStep = path[1];
          direction = getDirectionCode(
            firstStep.i - enemy.i,
            firstStep.j - enemy.j
          );

          if (direction === Directions.UNKNOWN) {
            if (firstStep.i === map.height - 1 && enemy.i === 0) {
              direction = Directions.UP;
            }
            if (firstStep.j === 0 && enemy.j === map.width - 1) {
              direction = Directions.RIGHT;
            }
            if (firstStep.i === 0 && enemy.i === map.height - 1) {
              direction = Directions.DOWN;
            }
            if (firstStep.j === map.width - 1 && enemy.j === 0) {
              direction = Directions.LEFT;
            }
          }
        }
        return direction;
      }

      direction[i][0] = mapTeleport(direction[i][0], map.height);
      direction[i][1] = mapTeleport(direction[i][1], map.width);

      if (matrix[direction[i][0]][direction[i][1]] === false) {
        continue;
      }

      matrix[direction[i][0]][direction[i][1]] = false;
      queue.push(path.concat({ i: direction[i][0], j: direction[i][1] }));
    }
  }
};

// Просчитывает передвижения противников для следующего шага
//
// Аргументы {
//    map - карта
//    enemies - список противников
//    player - игрок
//    swords - список мечей
//    potions - список зелий
// }
const calculateEnemyMoves = (map, enemies, player, swords, potions) => {
  for (let i = 0; i < enemies.length; i += 1) {
    const enemy = enemies[i];

    let direction = -1;
    switch (enemy.moveType) {
      case EnemyMoveType.HORIZONTAL:
      case EnemyMoveType.VERTICAL:
        direction = linearStep(enemy);
        break;
      case EnemyMoveType.RANDOM:
        direction = randomStep(map, enemy);
        break;
      case EnemyMoveType.HUNTER:
        direction = hunterStep(map, enemy, player);
        break;
    }
    moveEntity(map, direction, enemy, false, swords, potions);
  }
};

// Делает шаг для существа согласно разнице по строке и столбцу
//
// Аргументы {
//    indexDiff - разница по строке
//    jndexDiff - разница по столбцу
//    map - карта
//    entity - существо
//    isPlayer - является ли существо игроком
//    swords - список мечей
//    potions - список зелий
// }
const makeStep = (
  indexDiff,
  jndexDiff,
  map,
  entity,
  isPlayer,
  swords,
  potions
) => {
  const i = entity.i;
  const j = entity.j;

  let finalIndex = mapTeleport(i + indexDiff, map.height);
  let finalJndex = mapTeleport(j + jndexDiff, map.width);

  const isCellFree = map.gameZone[finalIndex][finalJndex];

  let swordIndex = -1;
  let potionIndex = -1;
  if (isPlayer) {
    swordIndex = isContains(finalIndex, finalJndex, swords);
    potionIndex = isContains(finalIndex, finalJndex, potions);

    if (swordIndex !== -1) {
      const sword = swords[swordIndex];
      entity.power += sword.power;
      swords.splice(swordIndex, 1);
    } else if (potionIndex !== -1) {
      if (entity.health !== entity.maxHealth) {
        const potion = potions[potionIndex];
        entity.health += potion.power;
      }
      potions.splice(potionIndex, 1);
    }
  }

  if (isCellFree || swordIndex !== -1 || potionIndex !== -1) {
    entity.i = finalIndex;
    entity.j = finalJndex;
    map.gameZone[i][j] = true;
    map.gameZone[finalIndex][finalJndex] = false;
  } else {
    entity.horizontalSpeed *= -1;
    entity.verticalSpeed *= -1;
  }
};

// Перемещает существо согласно направлению для следующего шага
//
// Аргументы {
//    map - карта
//    direction - код направления движения
//    entity - существо
//    isPlayer - является ли существо игроком
//    swords - список мечей
//    potions - список зелий
// }
const moveEntity = (map, direction, entity, isPlayer, swords, potions) => {
  if (
    (direction === Directions.RIGHT && entity.horizontalSpeed === -1) ||
    (direction === Directions.LEFT && entity.horizontalSpeed === 1)
  ) {
    entity.horizontalSpeed *= -1;
  }

  const { indexDiff, jndexDiff } = getIndexJndex(direction);
  makeStep(indexDiff, jndexDiff, map, entity, isPlayer, swords, potions);
};

// Игровой шаг
//
// Аргументы {
//    gameData - игровые данные
// }
const gameStep = (gameData) => {
  calculateEnemyMoves(
    gameData.map,
    gameData.enemies,
    gameData.player,
    gameData.swords,
    gameData.potions
  );
  if (gameData.playerMove !== Directions.UNKNOWN) {
    moveEntity(
      gameData.map,
      gameData.playerDirection,
      gameData.player,
      true,
      gameData.swords,
      gameData.potions
    );
  }
  calculateAttacks(
    gameData.map,
    gameData.player,
    gameData.enemies,
    gameData.isPlayerAttacking
  );
};

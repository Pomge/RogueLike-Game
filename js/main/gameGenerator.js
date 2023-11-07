// Возвращает массив пустых ячеек
//
// Аргументы {
//    map - карта
// }
// Возвращаемое значение {
//    freeCells - список пустых ячеек
// }
function getFreeCells(map) {
  let freeCells = [];

  for (let i = 0; i < map.height; i += 1) {
    for (let j = 0; j < map.width; j += 1) {
      if (map.gameZone[i][j].isEmpty) {
        const resultItem = { i, j };
        freeCells.push(resultItem);
      }
    }
  }

  return freeCells;
}

// Проверяет матрицу на наличие пустых ячеек
//
// Аргументы {
//    matrix - матрица
//    width - ширина матрицы
//    height - высота матрицы
// }
// Возвращаемое значение {
//    boolean - существуют ли пустые ячейки
// }
function isHaveFreeCells(matrix, width, height) {
  for (let i = 0; i < height; i += 1) {
    for (let j = 0; j < width; j += 1) {
      if (matrix[i][j]) {
        return true;
      }
    }
  }

  return false;
}

// Возвращает массив пустых ячеек, которые входят в заданные границы
//
// Аргументы {
//    matrix - матрица
//    borders - границы
// }
// Возвращаемое значение {
//    freeCells - список пустых ячеек
// }
function getFreeCellsByBorders(matrix, borders) {
  let freeCells = [];

  for (
    let i = borders.minVerticalBorder;
    i <= borders.maxVerticalBorder;
    i += 1
  ) {
    for (
      let j = borders.minHorizontalBorder;
      j <= borders.maxHorizontalBorder;
      j += 1
    ) {
      if (matrix[i][j]) {
        freeCells.push({ i, j });
      }
    }
  }

  return freeCells;
}

// Создает и возвращает игровую зону
function createGameZone(width, height) {
  let gameZone = [];
  for (let i = 0; i < height; i += 1) {
    gameZone[i] = [];
    for (let j = 0; j < width; j += 1) {
      gameZone[i][j] = new Tile(i, j, false);
    }
  }

  return { gameZone, width, height };
}

// Создает комнаты и возвращает минимальную и максимальную границы для генерации проходов
//
// Аргументы {
//    map - карта
//    minRoomCount - минимальное число случайно сгенерированных комнат
//    maxRoomCount - максимальное число случайно сгенерированных комнат
//    minRoomSize - минимальный размер комнаты по длине/ширине
//    maxRoomSize - максимальный размер комнаты по длине/ширине
// }
//
// Возвращаемое значение {
//    minVerticalBorder - крайняя верхняя граница
//    maxVerticalBorder - крайняя нижняя граница
//    minHorizontalBorder - крайняя левая граница
//    maxHorizontalBorder - крайняя правая граница
// }
function generateRooms(
  map,
  minRoomCount,
  maxRoomCount,
  minRoomSize,
  maxRoomSize
) {
  const roomCount = getRandomIntInRange(minRoomCount, maxRoomCount);

  let minVerticalBorder = map.height;
  let maxVerticalBorder = 0;
  let minHorizontalBorder = map.width;
  let maxHorizontalBorder = 0;

  for (let roomIndex = 0; roomIndex < roomCount; roomIndex += 1) {
    const randomWidth = getRandomIntInRange(minRoomSize, maxRoomSize);
    const randomHeight = getRandomIntInRange(minRoomSize, maxRoomSize);

    const startIndex = getRandomIntInRange(0, map.height - randomHeight);
    const startJndex = getRandomIntInRange(0, map.width - randomWidth);

    const endIndex = startIndex + randomHeight;
    const endJndex = startJndex + randomWidth;

    for (let i = startIndex; i < endIndex; i += 1) {
      for (let j = startJndex; j < endJndex; j += 1) {
        map.gameZone[i][j].isEmpty = true;
      }
    }

    if (startIndex < minVerticalBorder) {
      minVerticalBorder = startIndex;
    }
    if (endIndex > maxVerticalBorder) {
      maxVerticalBorder = endIndex;
    }
    if (startJndex < minHorizontalBorder) {
      minHorizontalBorder = startJndex;
    }
    if (endJndex > maxHorizontalBorder) {
      maxHorizontalBorder = endJndex;
    }
  }

  minVerticalBorder += minRoomSize;
  minHorizontalBorder += minRoomSize;
  maxVerticalBorder -= minRoomSize;
  maxHorizontalBorder -= minRoomSize;

  const borders = {
    minVerticalBorder,
    maxVerticalBorder,
    minHorizontalBorder,
    maxHorizontalBorder,
  };

  return borders;
}

// Генерирует и возвращает случайный индекс в диапазоне ['min', 'max'],
// который отсутствует в списке использованных
function getRandomIndex(min, max, list) {
  while (true) {
    const randomIndex = getRandomIntInRange(min, max);
    if (list.indexOf(randomIndex) === -1) {
      list.push(randomIndex);
      return randomIndex;
    }
    list.push(randomIndex);
  }
}

// Генерирует проходы
//
// Аргументы {
//    map - карта
//    minWaysCount - минимальное число случайно сгенерированных комнат
//    maxWaysCount - максимальное число случайно сгенерированных комнат
//    borders - границы генерации
// }
function generateWays(map, minWaysCount, maxWaysCount, borders) {
  const waysCountHorizontal = getRandomIntInRange(minWaysCount, maxWaysCount);
  const waysCountVertical = getRandomIntInRange(minWaysCount, maxWaysCount);

  const usedVerticalIndexes = [];
  for (let i = 0; i < waysCountHorizontal; i += 1) {
    const randomVerticalIndex = getRandomIndex(
      borders.minVerticalBorder,
      borders.maxVerticalBorder,
      usedVerticalIndexes
    );

    for (let j = 0; j < map.width; j += 1) {
      map.gameZone[randomVerticalIndex][j].isEmpty = true;
    }
  }

  const usedHorizontalIndexes = [];
  for (let i = 0; i < waysCountVertical; i += 1) {
    const randomHorizontalIndex = getRandomIndex(
      borders.minHorizontalBorder,
      borders.maxHorizontalBorder,
      usedHorizontalIndexes
    );

    for (let i = 0; i < map.height; i += 1) {
      map.gameZone[i][randomHorizontalIndex].isEmpty = true;
    }
  }
}

// Создает шаги для волнового алгоритма
//
// Аргументы {
//    matrix - матрица
//    index - текущий индекс строки
//    jndex - текущий индекс столбца
//    list - список для заполнения
//    width - ширина матрицы
//    height - высота матрицы
// }
function collectSteps(matrix, width, height, index, jndex, list) {
  if (index + 1 < height) {
    if (matrix[index + 1][jndex]) {
      list.push({ i: index + 1, j: jndex });
      matrix[index + 1][jndex] = false;
    }
  }
  if (jndex + 1 < width) {
    if (matrix[index][jndex + 1]) {
      list.push({ i: index, j: jndex + 1 });
      matrix[index][jndex + 1] = false;
    }
  }
  if (index - 1 >= 0) {
    if (matrix[index - 1][jndex]) {
      list.push({ i: index - 1, j: jndex });
      matrix[index - 1][jndex] = false;
    }
  }
  if (jndex - 1 >= 0) {
    if (matrix[index][jndex - 1]) {
      list.push({ i: index, j: jndex - 1 });
      matrix[index][jndex - 1] = false;
    }
  }
  matrix[index][jndex] = false;
}

// Проверяет сгенерированную карту на наличие недостижимых зон
//
// Аргументы {
//    map - карта
//    borders - границы
// }
//
// Возвращаемое значение {
//    true/false - есть ли пустоты в сгенерированной карте
// }
function isMapHaveEmptySpaces(map, borders) {
  const width = map.width;
  const height = map.height;

  let matrix = copyGameZone(map);

  const freeCells = getFreeCellsByBorders(matrix, borders);
  const anyFreeCell = freeCells[Math.ceil(freeCells.length / 2)];
  const firstStep_i = anyFreeCell.i;
  const firstStep_j = anyFreeCell.j;

  let steps = [];
  collectSteps(matrix, width, height, firstStep_i, firstStep_j, steps);

  while (steps.length != 0) {
    let newSteps = [];
    for (let i = 0; i < steps.length; i += 1) {
      const move = steps[i];
      const index = move.i;
      const jndex = move.j;

      collectSteps(matrix, width, height, index, jndex, newSteps);
    }
    steps = newSteps;
  }

  return isHaveFreeCells(matrix, width, height);
}

// Создает сущность на карте в заданной клетке с заданными свойствами
//
// Аргументы {
//    map - карта
//    cell - ячейка
//    values - значения
// }
function spawnEntity(map, cell, values) {
  const i = cell.i;
  const j = cell.j;

  const className = values[0];
  const health = values[1];
  const power = values[2];
  const moveType = values[3];

  map.gameZone[i][j] = new className(i, j, health, power, moveType);
}

// Создает предмет на карте в заданной клетке с заданными свойствами
//
// Аргументы {
//    map - карта
//    cell - ячейка
//    values - значения
// }
function spawnItem(map, cell, values) {
  const i = cell.i;
  const j = cell.j;

  const className = values[0];
  const buff = values[1];

  map.gameZone[i][j] = new className(i, j, buff);
}

// Вызывает функции на создание предметов на карте в заданном количестве
//
// Аргументы {
//    map - карта
//    count - количество
//    callbackFunction - функция создания объекта на карте
//    ...values - свойства предмета
// }
function spawnObjects(map, count, callbackFunction, ...values) {
  for (let i = 0; i < count; i += 1) {
    const freeCells = getFreeCells(map);
    const randomIndex = getRandomIntInRange(0, freeCells.length - 1);
    const cell = freeCells[randomIndex];
    callbackFunction(map, cell, values);
  }
}

// Основаня функция-генератор карты
//
// Аргументы {
//    initData - настройки игры (см. Settings.js)
// }
//
// Возвращаемое значение {
//    map - матрица объектов
// }
function gameGenerator(initData) {
  let map = {};
  let borders = {};
  do {
    map = createGameZone(initData.width, initData.height);
    borders = generateRooms(
      map,
      initData.minRoomCount,
      initData.maxRoomCount,
      initData.minRoomSize,
      initData.maxRoomSize
    );
    generateWays(map, initData.minWaysCount, initData.maxWaysCount, borders);
  } while (isMapHaveEmptySpaces(map, borders));

  spawnObjects(map, initData.swordCount, spawnItem, Sword, initData.swordBuff);
  spawnObjects(
    map,
    initData.potionCount,
    spawnItem,
    Potion,
    initData.potionBuff
  );
  spawnObjects(
    map,
    1,
    spawnEntity,
    Player,
    initData.playerHealth,
    initData.playerPower
  );

  let enemiesSpawner = [];
  const maxEnemyCount = initData.enemyCount;

  let sum = 0;
  const moveTypesLength = Object.keys(EnemyMoveType).length - 1;
  for (let i = 0; i < moveTypesLength; i += 1) {
    let randomCount = 0;
    if (i !== moveTypesLength - 1) {
      const range = moveTypesLength - i - 1;
      randomCount = getRandomIntInRange(1, maxEnemyCount - range - sum);
    } else {
      randomCount = maxEnemyCount - sum;
    }

    let enemy = {};
    enemy.count = randomCount;
    enemy.moveType = getEnemyMoveType(i);

    switch (enemy.moveType) {
      case EnemyMoveType.HORIZONTAL:
      case EnemyMoveType.VERTICAL:
        enemy.class_ = LinearEnemy;
        break;
      case EnemyMoveType.RANDOM:
        enemy.class_ = RandomEnemy;
        break;
      case EnemyMoveType.HUNTER:
        enemy.class_ = HunterEnemy;
        break;
    }
    enemiesSpawner.push(enemy);

    sum += randomCount;
  }

  for (let i = 0; i < enemiesSpawner.length; i += 1) {
    const enemySpawner = enemiesSpawner[i];
    spawnObjects(
      map,
      enemySpawner.count,
      spawnEntity,
      enemySpawner.class_,
      initData.enemyHealth,
      initData.enemyPower,
      enemySpawner.moveType
    );
  }

  return map;
}

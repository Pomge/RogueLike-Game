import { getRandomIntInRange } from "./staticFunctions.js";
import { getEnemyMoveType } from "./EnemyMoveType.js";

// Возвращает массив пустых ячеек
//
// Аргументы {
//    map - карта
// }
const getFreeCells = (map) => {
  let freeCells = [];

  for (let i = 0; i < map.height; i += 1) {
    for (let j = 0; j < map.width; j += 1) {
      if (map.gameZone[i][j] === true) {
        const resultItem = { i, j };
        freeCells.push(resultItem);
      }
    }
  }

  return freeCells;
};

// Создает и возвращает игровую зону
const createGameZone = (width, height) => {
  const gameZone = Array(height)
    .fill()
    .map(() => Array(width).fill(false));

  const map = { gameZone, width, height };
  return map;
};

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
const generateRooms = (
  map,
  minRoomCount,
  maxRoomCount,
  minRoomSize,
  maxRoomSize
) => {
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
        map.gameZone[i][j] = true;
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
};

// Генерирует и возвращает случайный индекс в диапазоне ['min', 'max'],
// который отсутствует в списке использованных
const getRandomIndex = (min, max, list) => {
  while (true) {
    const randomIndex = getRandomIntInRange(min, max);
    if (list.indexOf(randomIndex) === -1) {
      list.push(randomIndex);
      return randomIndex;
    }
    list.push(randomIndex);
  }
};

// Генерирует проходы
//
// Аргументы {
//    map - карта
//    minWaysCount - минимальное число случайно сгенерированных комнат
//    maxWaysCount - максимальное число случайно сгенерированных комнат
//    borders - границы генерации
// }
const generateWays = (map, minWaysCount, maxWaysCount, borders) => {
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
      map.gameZone[randomVerticalIndex][j] = true;
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
      map.gameZone[i][randomHorizontalIndex] = true;
    }
  }
};

// Размещает на карте объекты указанного количества
//
// Аргументы {
//    map - карта
//    count - количетсво
// }
//
// Возвращаемое значение {
//    items - список сгенерированных объектов
// }
const spawn = (map, count) => {
  let items = [];

  for (let i = 0; i < count; i += 1) {
    const freeCells = getFreeCells(map);
    const randomIndex = getRandomIntInRange(0, freeCells.length - 1);
    const item = freeCells[randomIndex];
    items.push(item);

    const i = item.i;
    const j = item.j;

    map.gameZone[i][j] = false;
  }

  return items;
};

// Наполняет существ новыми данными
//
// Аргументы {
//    entities - список существ
//    health - значение здоровья
//    power - значение силы
// }
const expandEntities = (entities, health, power) => {
  for (let i = 0; i < entities.length; i += 1) {
    const entity = entities[i];
    entity.health = health;
    entity.maxHealth = health;
    entity.power = power;
  }
};

// Модифицирует противников: устанавливает тип движения и задает им скорости
//
// Аргументы {
//    entities - список существ
// }
const modifyEnemies = (enemies) => {
  for (let i = 0; i < enemies.length; i += 1) {
    const enemy = enemies[i];
    enemy.moveType = getEnemyMoveType(getRandomIntInRange(0, 3));
    enemy.horizontalSpeed = Math.random() < 0.5 ? 1 : -1;
    enemy.verticalSpeed = Math.random() < 0.5 ? 1 : -1;
  }
};

// Генерирует игровые данные
//
// Аргументы {
//    initData - данные из файла 'settings.json'
// }
//
// Возвращаемое значение {
//    gameData - игровые данные {
//        map - карта
//        swords - список сгенерированных мечей
//        potions - список сгенерированных зелий
//        player - игрок
//        enemies - список противников 
//    }
// }
const gameGenerator = (initData) => {
  const map = createGameZone(initData.width, initData.height);
  const borders = generateRooms(
    map,
    initData.minRoomCount,
    initData.maxRoomCount,
    initData.minRoomSize,
    initData.maxRoomSize
  );
  generateWays(map, initData.minWaysCount, initData.maxWaysCount, borders);

  const swords = spawn(map, initData.swordCount);
  const potions = spawn(map, initData.potionCount);
  const player = spawn(map, 1);
  const enemies = spawn(map, initData.enemyCount);

  expandEntities(swords, 0, initData.swordBuff);
  expandEntities(potions, 0, initData.potionBuff);
  expandEntities(player, initData.playerHealth, initData.playerPower);
  expandEntities(enemies, initData.enemyHealth, initData.enemyPower);

  player[0].horizontalSpeed = 1;
  modifyEnemies(enemies);

  const gameData = { map, swords, potions, player: player[0], enemies };
  return gameData;
};

export default gameGenerator;

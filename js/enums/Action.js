function Enum(object) {
  const newObject = {};

  for (const property in object) {
    if (object.hasOwnProperty(property)) {
      newObject[property] = Symbol(object[property]);
    }
  }

  return Object.freeze(newObject);
}

// Перечисление возможных кодов направлений движения
// НЕИЗВЕСТНО: -1
// ВВЕРХ: 0
// ВПРАВО: 1
// ВНИЗ: 2
// ВЛЕВО: 3
const Action = Enum({
  UNKNOWN: -1,
  UP: 0,
  RIGHT: 1,
  DOWN: 2,
  LEFT: 3,
  ATTACK: 4,
});

// Возвращает код напрвления по изменению координат
function getDirectionCode(indexDiff, jndexDiff) {
  if (indexDiff === -1 && jndexDiff === 0) {
    return Action.UP;
  }
  if (indexDiff === 0 && jndexDiff === 1) {
    return Action.RIGHT;
  }
  if (indexDiff === 1 && jndexDiff === 0) {
    return Action.DOWN;
  }
  if (indexDiff === 0 && jndexDiff === -1) {
    return Action.LEFT;
  }
  return Action.UNKNOWN;
}

// Возвращает координаты по коду направления
function getIndexJndex(direction) {
  switch (direction) {
    case Action.UP:
      return { indexDiff: -1, jndexDiff: 0 };
    case Action.RIGHT:
      return { indexDiff: 0, jndexDiff: 1 };
    case Action.DOWN:
      return { indexDiff: 1, jndexDiff: 0 };
    case Action.LEFT:
      return { indexDiff: 0, jndexDiff: -1 };
    default:
      return { indexDiff: 0, jndexDiff: 0 };
  }
}

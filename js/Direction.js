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
// ВВЕРХ: 0
// ВПРАВО: 1
// ВНИЗ: 2
// ВЛЕВО: 3
// НЕИЗВЕСТНО: -1
const Directions = Enum({
  UP: 0,
  RIGHT: 1,
  DOWN: 2,
  LEFT: 3,
  UNKNOWN: -1,
});

// Возвращает код напрвления по изменению координат
const getDirectionCode = (indexDiff, jndexDiff) => {
  if (indexDiff === -1 && jndexDiff === 0) {
    return Directions.UP;
  }
  if (indexDiff === 0 && jndexDiff === 1) {
    return Directions.RIGHT;
  }
  if (indexDiff === 1 && jndexDiff === 0) {
    return Directions.DOWN;
  }
  if (indexDiff === 0 && jndexDiff === -1) {
    return Directions.LEFT;
  }
  return Directions.UNKNOWN;
};

// Возвращает координаты по коду направления
const getIndexJndex = (direction) => {
  switch (direction) {
    case Directions.UP:
      return { indexDiff: -1, jndexDiff: 0 };
    case Directions.RIGHT:
      return { indexDiff: 0, jndexDiff: 1 };
    case Directions.DOWN:
      return { indexDiff: 1, jndexDiff: 0 };
    case Directions.LEFT:
      return { indexDiff: 0, jndexDiff: -1 };
    default:
      return { indexDiff: 0, jndexDiff: 0 };
  }
};

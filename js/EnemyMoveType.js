function Enum(object) {
  const newObject = {};

  for (const property in object) {
    if (object.hasOwnProperty(property)) {
      newObject[property] = Symbol(object[property]);
    }
  }

  return Object.freeze(newObject);
}

// Перечисление возможных типов движений противников
// ГОРИЗОНТАЛЬНО: 0
// ВЕРТИКАЛЬНО: 1
// СЛУЧАЙНО: 2
// ОХОТНИК: 3 (преследование игрока)
// НЕИЗВЕСТНО: -1
export const EnemyMoveType = Enum({
  HORIZONTAL: 0,
  VERTICAL: 1,
  RANDOM: 2,
  HUNTER: 3,
  UNKNOWN: -1,
});

// Преобразует целочисленное значение к типу движения противника
export const getEnemyMoveType = (moveType) => {
  switch (moveType) {
    case 0:
      return EnemyMoveType.HORIZONTAL;
    case 1:
      return EnemyMoveType.VERTICAL;
    case 2:
      return EnemyMoveType.RANDOM;
    case 3:
      return EnemyMoveType.HUNTER;
    default:
      return EnemyMoveType.UNKNOWN;
  }
};

export default EnemyMoveType;

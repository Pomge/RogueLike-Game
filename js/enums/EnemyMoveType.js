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
// НЕИЗВЕСТНО: -1
// ГОРИЗОНТАЛЬНО: 0
// ВЕРТИКАЛЬНО: 1
// СЛУЧАЙНО: 2
// ОХОТНИК: 3 (преследование игрока)
const EnemyMoveType = Enum({
  UNKNOWN: -1,
  HORIZONTAL: 0,
  VERTICAL: 1,
  RANDOM: 2,
  HUNTER: 3,
});

// Преобразует целочисленное значение к типу движения противника
function getEnemyMoveType(moveType) {
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
}

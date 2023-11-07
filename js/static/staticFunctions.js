// Возвращает список объектов, которые наследются от 'class_'
function getObjectsByInstanceOf(map, class_) {
  let result = [];

  for (let i = 0; i < map.height; i += 1) {
    for (let j = 0; j < map.width; j += 1) {
      const object = map.gameZone[i][j];
      if (object instanceof class_) {
        result.push(object);
      }
    }
  }

  return result;
}

// Возвращает случайное целочисленное число в диапазоне ['min', 'max']
function getRandomIntInRange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Возвращает новую координату, при попытке выйти за пределы карты
// Образуя, таким образом, перемещение через 'проходы'
function mapTeleport(index, size) {
  if (index < 0) {
    index = size - 1;
  }
  if (index >= size) {
    index = 0;
  }

  return index;
}

// Копирует матрицу игровой зоны в 'matrix' и возвращает ее
function copyGameZone(map) {
  let matrix = [];
  for (let i = 0; i < map.height; i += 1) {
    matrix[i] = [];
    for (let j = 0; j < map.width; j += 1) {
      const isEmpty = map.gameZone[i][j].isEmpty;
      matrix[i][j] = isEmpty;
    }
  }

  return matrix;
}

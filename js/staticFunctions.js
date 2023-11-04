// Возвращает индекс элемента из массива 'array',
// если элемент имеет 'i' и 'j' равные переданным в функцию,
// иначе возвращает -1
const isContains = (i, j, array) => {
  for (let index = 0; index < array.length; index += 1) {
    if (array[index].i === i && array[index].j === j) {
      return index;
    }
  }
  return -1;
};

// Возвращает случайное целочисленное число в диапазоне ['min', 'max']
const getRandomIntInRange = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Возвращает новую координату, при попытке выйти за пределы карты
// Образуя, таким образом, перемещение через 'проходы'
const mapTeleport = (index, size) => {
  if (index < 0) {
    index = size - 1;
  }
  if (index >= size) {
    index = 0;
  }

  return index;
};

// Копирует матрицу игровой зоны в 'matrix' и возвращает ее
const copyGameZone = (map) => {
  let matrix = Array(map.height)
    .fill()
    .map(() => Array(map.width).fill(false));

  for (let i = 0; i < map.height; i += 1) {
    for (let j = 0; j < map.width; j += 1) {
      matrix[i][j] = map.gameZone[i][j];
    }
  }
  return matrix;
};

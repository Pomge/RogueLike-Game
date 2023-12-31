# RogueLike-Game
[RogueLike-Game on JavaScript using jQuery](https://pomge.github.io/RogueLike-Game/)

# Описание
Пошаговая игра "РОГАЛИК", написанная на JavaScript с использованием jQuery.

# Скриншоты
![1](https://github.com/Pomge/RogueLike-Game/assets/33260275/db6508cf-7cfb-45ad-8dd3-37a35eae848a)
![2](https://github.com/Pomge/RogueLike-Game/assets/33260275/3ca4102b-03e3-4ec9-b83c-d9b7f5cd32fd)
![3](https://github.com/Pomge/RogueLike-Game/assets/33260275/8fbaa7bd-1a71-4936-8e6e-34e9dc91293a)

# Враги
Атакуют игрока каждый раз, когда он приближается на расстояние равное радиусу 1 квадрата.
![attackZone](https://github.com/Pomge/RogueLike-Game/assets/33260275/265e2174-a5e7-4fbd-b70c-44cb66494bd0)

## Линейное передвижение
![enemyLinearRight](https://github.com/Pomge/RogueLike-Game/assets/33260275/f5220b60-9494-4a97-9b9c-799357cb8daa)

Перемещается линейно по вертикали или горизонтали. При встрече препятствия - разворачивается и следует в другую сторону.

## Случайное передвижение
![enemyRandomRight](https://github.com/Pomge/RogueLike-Game/assets/33260275/6f515969-32ca-459a-9e4c-b5cde0b6458c)

Перемещается случайным образом на каждом ходе.

## Преследование игрока
![enemyHunterRight](https://github.com/Pomge/RogueLike-Game/assets/33260275/e1a90452-a4a7-48bf-8f22-67e9caf2e217)

Преследует игрока, используя поиск кратчайшего пути по алгоритму поиска в ширину.

# Предметы
## Меч
![sword](https://github.com/Pomge/RogueLike-Game/assets/33260275/57b8f776-7c53-47a4-b028-4de93ebf9ca4)

Увеличивает силу игрока.

Является препятствием для других существ.

## Зелье
![potion](https://github.com/Pomge/RogueLike-Game/assets/33260275/d6d4698f-5750-4564-b80d-791b02d2389b)

Востанавливает здоровье игрока. Максимальное лечение ограничено максимальным здоровьем игрока.

Является препятствием для других существ.

# Игрок
![playerRight](https://github.com/Pomge/RogueLike-Game/assets/33260275/17533a76-6914-4101-aeea-8c3ec38c5f88)

Игрок имеет показатель силы и здоровья. Максимальное здоровье ограничено.

Управление перемещением по карте - WASD, SPACE - атака в радиусе 1 квадрата.

# Диаграмма классов
![diagram](https://github.com/Pomge/RogueLike-Game/assets/33260275/335f2213-8031-4f6e-b81c-0c953cdd8ac2)

# Настройки
Для настроек игры используейте [файл настроек игры](https://github.com/Pomge/RogueLike-Game/blob/main/js/Settings.js).

`width` - ширина игрового поля <br/>
`height` - высота игрового поля <br/>
`minRoomCount` - минимальное число случайно сгенерированных комнат <br/>
`maxRoomCount` - максимальное число случайно сгенерированных комнат <br/>
`minRoomSize` - минимальный размер комнаты по длине/ширине <br/>
`maxRoomSize` - максимальный размер комнаты по длине/ширине <br/>
`minWaysCount` - минимальное количество вертикальных/горизонтальных проходов <br/>
`maxWaysCount` - максимальное количество вертикальных/горизонтальных проходов <br/>
`swordCount` - число мечей, которые будут сгенерированы на карте <br/>
`swordBuff` - число силы, которое прибавится игроку при подборе меча <br/>
`potionCount` - число зелий, которые будут сгенерированы на карте <br/>
`potionBuff` - число здоровья, которое прибавится игроку при подборе зелья <br/>
`playerPower` - начальное значение силы игрока <br/>
`playerHealth` - начальное и максимальное значение здоровья игрока <br/>
`enemyHealth` - число здоровья противников <br/>
`enemyPower` - число силы противников <br/>
`enemyCount` - число противников, которые будут сгенерированы на карте

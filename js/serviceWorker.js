const staticCacheName = "rogue-like-static";

const assetsUrls = [
  "/public/static/images/webp/background.webp",
  "/public/static/images/png/background.png",
  "/public/static/images/jpeg/background.jpg",

  "/public/static/images/webp/enemyHunterLeft.webp",
  "/public/static/images/png/enemyHunterLeft.png",
  "/public/static/images/jpeg/enemyHunterLeft.jpg",

  "/public/static/images/webp/enemyHunterRight.webp",
  "/public/static/images/png/enemyHunterRight.png",
  "/public/static/images/jpeg/enemyHunterRight.jpg",

  "/public/static/images/webp/enemyLinearLeft.webp",
  "/public/static/images/png/enemyLinearLeft.png",
  "/public/static/images/jpeg/enemyLinearLeft.jpg",

  "/public/static/images/webp/enemyLinearRight.webp",
  "/public/static/images/png/enemyLinearRight.png",
  "/public/static/images/jpeg/enemyLinearRight.jpg",

  "/public/static/images/webp/enemyRandomLeft.webp",
  "/public/static/images/png/enemyRandomLeft.png",
  "/public/static/images/jpeg/enemyRandomLeft.jpg",

  "/public/static/images/webp/enemyRandomRight.webp",
  "/public/static/images/png/enemyRandomRight.png",
  "/public/static/images/jpeg/enemyRandomRight.jpg",

  "/public/static/images/webp/playerLeft.webp",
  "/public/static/images/png/playerLeft.png",
  "/public/static/images/jpeg/playerLeft.jpg",

  "/public/static/images/webp/playerRight.webp",
  "/public/static/images/png/playerRight.png",
  "/public/static/images/jpeg/playerRight.jpg",

  "/public/static/images/webp/potion.webp",
  "/public/static/images/png/potion.png",
  "/public/static/images/jpeg/potion.jpg",

  "/public/static/images/webp/sword.webp",
  "/public/static/images/png/sword.png",
  "/public/static/images/jpeg/sword.jpg",

  "/css/reset.css",
  "/css/styles.css",

  "/index.html",

  "/js/min/jquery-3.7.1.min.js",
  "/js/min/enums.min.js",
  "/js/min/abstract.min.js",
  "/js/min/entities.min.js",
  "/js/min/items.min.js",
  "/js/min/static.min.js",
  "/js/min/main.min.js",
];

async function addResourcesToCache(resources) {
  const cache = await caches.open(staticCacheName);
  await cache.addAll(resources);
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  return cached ?? (await fetch(request));
}

self.addEventListener("install", (event) => {
  event.waitUntil(addResourcesToCache(assetsUrls));
});

self.addEventListener("activate", async (event) => {
  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames
      .filter((cacheName) => cacheName !== staticCacheName)
      .map((cacheName) => caches.delete(cacheName))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(cacheFirst(event.request));
});

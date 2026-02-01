const CACHE_NAME = "vape-sublimados-v1";
const STATIC_ASSETS = [
  "/vapesublimados/",
  "/vapesublimados/index.html",
  "/vapesublimados/style.css",
  "/vapesublimados/main.js",
  "/vapesublimados/assets/img/logo.png",
  "/vapesublimados/assets/img/favicon.png",
  "/vapesublimados/assets/img/og-image.png",
  "/vapesublimados/assets/img/whatsapp.logo.png",
  "/vapesublimados/assets/img/productos/tazas.jpeg",
  "/vapesublimados/assets/img/productos/remeras.jpeg",
  "/vapesublimados/assets/img/productos/botella.jpeg"
];

// ================================
// INSTALL
// ================================
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// ================================
// ACTIVATE
// ================================
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// ================================
// FETCH
// ================================
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

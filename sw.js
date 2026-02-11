const CACHE_NAME = "vape-sublimados-v1";

const STATIC_ASSETS = [
  "index.html",
  "style.css",
  "main.js",
  "manifest.json",
  "assets/img/logo1.png",
  "assets/img/favicon.png",
  "assets/img/og-image.png",
  "assets/img/whatsapp.logo.png",
  "assets/img/productos/tazas.jpeg",
  "assets/img/productos/remeras.jpeg",
  "assets/img/productos/botella.jpeg"
];

// ================================
// INSTALL
// ================================
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("📦 Cacheando assets");
      return cache.addAll(STATIC_ASSETS);
    })
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
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
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

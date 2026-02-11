const CACHE_NAME = "vape-sublimados-v3";

const STATIC_ASSETS = [
  "/vapesublimados/",
  "/vapesublimados/index.html",
  "/vapesublimados/style.css",
  "/vapesublimados/manifest.json",
  "/vapesublimados/assets/img/logo1.png",
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
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// ================================
// FETCH (Network First Strategy)
// ================================
self.addEventListener("fetch", event => {
  // No cacheamos main.js, porque lo versionamos en el HTML
  if (event.request.url.includes("main.js")) {
    event.respondWith(fetch(event.request));
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Guardamos en caché solo los assets estáticos
        if (STATIC_ASSETS.some(asset => event.request.url.includes(asset))) {
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, response.clone()));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});

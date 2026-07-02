const CACHE_NAME = 'enlace-consecuente-v1';
const ARCHIVOS_CACHE = [
  './',
  './index.html',
  './manifest-enlace.json',
  'https://i.imgur.com/Bp36iz0.jpeg'
];

// Instalación: guarda archivos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ARCHIVOS_CACHE))
      .then(() => self.skipWaiting())
  );
});

// Activación: limpia versiones viejas
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// Sirve contenido desde caché o red
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(respuesta => respuesta || fetch(event.request))
  );
});

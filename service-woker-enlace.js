const CACHE_NOMBRE = 'enlace-consecuente-v1';
const RECURSOS = [
  './',
  './index.html',
  './manifest-enlace.json',
  'https://i.imgur.com/Bp36iz0.jpeg'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NOMBRE).then(cache => cache.addAll(RECURSOS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NOMBRE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});
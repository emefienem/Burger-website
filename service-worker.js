// service-worker.js
const CACHE_NAME = 'burger-website';
const urlsToCache = [
  '/index.html',
  '/menu.html',
  '/shop.html',
  '/contact.html',
  '/cart.html',
  '/about.html',
  'offline.html',
  '/styles.css',
  '/script.js',
  'images/offline-logo.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch(() => {
        return caches.match('offline.html')
      });
    })
  );
});

// Service worker of the hosted (GitHub Pages) build: keeps the app usable without internet.
// Network first: online, the newest version is used and cached; offline, the cached copy opens.
// Requests to other sites (exchange rates, stocks, trivia) are left alone.
const CACHE = 'controle-clinico-v1';
const PAGE = './index.html';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.add(PAGE))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key.startsWith('controle-clinico-') && key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
  const cacheKey = request.mode === 'navigate' ? PAGE : request;
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) {
          const copy = response.clone();
          event.waitUntil(caches.open(CACHE).then((cache) => cache.put(cacheKey, copy)));
        }
        return response;
      })
      .catch(() => caches.match(cacheKey).then((cached) => cached ?? Response.error())),
  );
});

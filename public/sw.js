self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const dest = req.destination;
  const isDoc = req.mode === 'navigate' || dest === 'document' || dest === '';
  const isAsset = ['script', 'style', 'font'].includes(dest);
  const isImage = dest === 'image';

  // Never cache HTML navigations: let Next.js handle it
  if (isDoc) {
    event.respondWith(fetch(req));
    return;
  }

  // Cache-first for static assets and images
  if (isAsset || isImage) {
    event.respondWith(
      caches.open('supiga-static-v1').then(async (cache) => {
        const cached = await cache.match(req);
        if (cached) return cached;
        try {
          const res = await fetch(req);
          cache.put(req, res.clone());
          return res;
        } catch (e) {
          return cached || Response.error();
        }
      })
    );
    return;
  }

  // Network-first for other GET requests
  event.respondWith(
    caches.open('supiga-dynamic-v1').then(async (cache) => {
      try {
        const res = await fetch(req);
        cache.put(req, res.clone());
        return res;
      } catch (e) {
        const cached = await cache.match(req);
        return cached || Response.error();
      }
    })
  );
});



const staticCache = 'Static-cache-v1';
const dynamicCache = 'Dynamic-cache-v1';
const cacheSizeLimit = 15;

const assets = [
  "/",
  "/index.html",
  "/pages/fallback.html",
  "/js/app.js",
  "/js/ui.js",
  "/js/materialize.min.js",
  "/css/materialize.min.css",
  "/css/app.css",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
];

self.addEventListener('install', event => {
  console.log('SW: Event fired: ${event.type}');
  event.waitUntil(
    caches.open(staticCache)
      .then(cache => {
        console.log('SW: Precaching Static Assets');
        cache.addAll(assets);
      })
  );
});

self.addEventListener('activate', event => {
  console.log('SW: Event fired: ${event.type}');
  event.waitUntil(
    caches.keys()
      .then(keys => {
        return Promise.all(
          keys
            .filter(key => key !== staticCache && key !== dynamicCache)
            .map(key => caches.delete(key))
        );
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cacheRes => {
        return cacheRes || fetch(event.request)
          .then(fetchRes => {
            return caches.open(dynamicCache)
              .then(cache => {
                cache.put(event.request.url, fetchRes.clone());
                limitCacheSize(dynamicCache, cacheSizeLimit);
                return fetchRes;
              });
          })
          .catch(() => {
            if (event.request.url.includes('.html')) {
              return caches.match('/pages/fallback.html');
            }
          });
      })
  );
});

// Cache size limit
const limitCacheSize = (cacheName, size) => {
  caches.open(cacheName)
    .then(cache => {
      cache.keys()
        .then(keys => {
          if (keys.length > size) {
            cache.delete(keys[0]).then(() => limitCacheSize(cacheName, size));
          }
        });
    });
};

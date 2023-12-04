const staticCache = "Static-cache-v1";
const dynamicCache = "Dynamic-cache-v1";

const assets = [
  "file:///C:/Users/Natsu/Desktop/School/Mobile%20Web%20Development/FFXIV/FFXIV/index.html",
  "file:///C:/Users/Natsu/Desktop/School/Mobile%20Web%20Development/FFXIV/FFXIV/pages/fallback.html",
  "file:///C:/Users/Natsu/Desktop/School/Mobile%20Web%20Development/FFXIV/FFXIV/js/app.js",
  "file:///C:/Users/Natsu/Desktop/School/Mobile%20Web%20Development/FFXIV/FFXIV/js/ui.js",
  "file:///C:/Users/Natsu/Desktop/School/Mobile%20Web%20Development/FFXIV/FFXIV/js/materialize.min.js",
  "file:///C:/Users/Natsu/Desktop/School/Mobile%20Web%20Development/FFXIV/FFXIV/css/materialize.min.css",
  "file:///C:/Users/Natsu/Desktop/School/Mobile%20Web%20Development/FFXIV/FFXIV/css/app.css",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
];

//Cache size limit
const limitCacheSize = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

self.addEventListener("install", function (event) {
  console.log(`SW: Event fired: ${event.type}`);
  event.waitUntil(
    caches.open(staticCache).then(function (cache) {
      console.log("SW: Precaching App shell");
      cache.addAll(assets);
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== staticCache && key !== dynamicCache)
          .map((key) => caches.delete(key))
      );
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        return (
          response ||
          fetch(event.request).then((fetchRes) => {
            return caches.open(dynamicCache).then((cache) => {
              cache.put(event.request.url, fetchRes.clone());
              limitCacheSize(dynamicCache, 3);
              return fetchRes;
            });
          })
        );
      })
      .catch(() => caches.match("file:///C:/Users/Natsu/Desktop/School/Mobile%20Web%20Development/FFXIV/FFXIV/pages.fallback.html"))
  );
});

const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./data.js",
  "./manifest.webmanifest",
  "./icon.svg",
  "./dostoievski.jpg",
  "./plaza-sennaya.jpg",
  "./san-petersburgo.jpg",
  "./frase-1.mp3.ogg",
  "./frase-2.mp3.ogg",
  "./frase-3.mp3.ogg",
  "./frase-4.mp3.ogg",
  "./frase-5.mp3.ogg",
  "./frase-6.mp3.ogg",
  "./frase-7.mp3.ogg",
  "./frase-8.mp3.ogg"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open("crimen-y-castigo-v1").then(function (cache) {
      return cache.addAll(APP_SHELL);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", function (event) {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then(function (cached) {
      if (cached) return cached;

      return fetch(event.request).then(function (response) {
        const responseClone = response.clone();
        if (response.ok && event.request.url.startsWith(self.location.origin)) {
          caches.open("crimen-y-castigo-v1").then(function (cache) {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      }).catch(function () {
        return caches.match("./index.html");
      });
    })
  );
});

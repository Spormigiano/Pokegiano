const CACHE_NAME = "unity-pwa-cache-v1";
const urlsToCache = [
    "/",
    "/index.html",
    "/Build/Pokegiano.loader.js",  // Adaptez ces chemins aux fichiers exportés
    "/Build/Pokegiano.wasm",
    "/Build/Pokegiano.data"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

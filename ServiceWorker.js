const cacheName = "Spormigiano-Pokegiano-1.0.2";
const contentToCache = [
    "Build/1eb105a8b50965ce8bddb2354897ca80.loader.js",
    "Build/c12c7b1fda820d27fcd26334fc58e132.framework.js",
    "Build/d2106b019ddcbc650ce466545f5cad09.data",
    "Build/c222ea3be058a5f54344eb5ce9c6cea1.wasm",
    "TemplateData/style.css",
    "./index.html",
    "./manifest.webmanifest",
    "./icon-192x192.png",
    "./icon-512x512.png"
];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});

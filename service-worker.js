
// =====================================
// CHAKIYA SCHOOL WEBSITE - SERVICE WORKER
// =====================================

const CACHE_NAME = "uhs-chakiya-v2";

const APP_FILES = [
    "/",
    "/index.html",
    "/style.css",
    "/uhs-design-refresh.css",
    "/school-logo.png"
];


// INSTALL SERVICE WORKER
self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(APP_FILES);
        })
    );

    self.skipWaiting();
});


// ACTIVATE SERVICE WORKER
self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames
                    .filter(function (cacheName) {
                        return cacheName !== CACHE_NAME;
                    })
                    .map(function (cacheName) {
                        return caches.delete(cacheName);
                    })
            );
        })
    );

    self.clients.claim();
});


// HANDLE PAGE NAVIGATION
self.addEventListener("fetch", function (event) {
    const request = event.request;
    const url = new URL(request.url);

    if (
        request.method !== "GET" ||
        url.origin !== self.location.origin
    ) {
        return;
    }

    if (request.mode === "navigate") {
        event.respondWith(
            fetch(request).catch(function () {
                return caches.match("/index.html");
            })
        );
    }
});

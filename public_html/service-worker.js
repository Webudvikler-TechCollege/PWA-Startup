'use strict';

self.addEventListener("install", function(e) {
    console.log("Service Worker Installed");
    importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js');
    e.waitUntil(
        caches.open('pwastartup').then(function(cache) {
            return cache.addAll([
                '/',
                '/index.html'
            ]);
        })
    );
});

/**
 * SW Activate
 */
self.addEventListener("activate", function(event) {
});


self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches.open('pwastartup').then(function(cache) {
            return cache.match(event.request).then(function(response) {
                return response || fetch(event.request).then(function(response) {
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
});

/*
self.addEventListener('install', (evt) => {
  console.log('[ServiceWorker] Install');
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  console.log('[ServiceWorker] Activate');
  // CODELAB: Remove previous cached data from disk.
  self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
  console.log('[ServiceWorker] Fetch', evt.request.url);

});
*/
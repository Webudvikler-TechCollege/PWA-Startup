'use strict';

// Opdater cache navn når cachen ændres
const CACHE_NAME = 'static-cache-v1';

// Liste over filer der skal caches
const FILES_TO_CACHE = [
    "index.html"
];

self.addEventListener('install', (evt) => {
  console.log('[ServiceWorker] Install');
  //self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  console.log('[ServiceWorker] Activate');
  // CODELAB: Remove previous cached data from disk.

  //self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
  console.log('[ServiceWorker] Fetch', evt.request.url);

});
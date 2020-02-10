/**
 * Service Worker 
 * Alle funktioner i denne fil bliver kørt i baggrunden
 * @self objektet refererer til dit browservindue
 */

// Tjek self objekt
//console.log(self);

 // Installerer serviceworker
self.addEventListener("install", function(e) {
    console.log("Service Worker Installed");
    // Åbner cachen og tilføjer filer under cachenavnet pwastartup
    e.waitUntil(
        caches.open('pwastartup').then(function(cache) {
            return cache.addAll([
                '/',
                '/index.html'
            ]);
        })
    );
});

// Aktiver serviceworker
self.addEventListener("activate", function(event) {
    console.log("Service Worker Aktiveret");
});

// Lyt på requests til browseren
self.addEventListener("fetch", function(event) {
    // Tjek event
    // console.log(event);
    event.respondWith(
        // Kigger i cache og leder efter et match
        caches.open('pwastartup').then(function(cache) {
            // Returnerer hvis der er et match i cachen - ellers kør request med fetch
            return cache.match(event.request).then(function(response) {
                return response || fetch(event.request).then(function(response) {
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
});
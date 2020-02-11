# Guide til opsætning af Progressive Web App 

Følgende guide vil hjælpe dig med at opsætte en Progressive Web App. For at vi kan lave en progressive web app er der nogle kriterier som skal være opfyldt og disse er listet herunder.

* Sitet skal køre over *_HTTPS_*
* Sitet skal være *_RESPONSIVT_* og virke på mobil og tablets
* Sitet skal kunne installeres og dermed køre med et *_WEB APP MANIFEST_*
* Sitet skal virke offline og dermed køre med en *_SERVICEWORKER_*

Før vi går i gang skal du oprette en projektmappe - du kan kalde den for pwa_startup eller hvad du nu selv synes. 

Hvis du vil køre din app op imod skolens server er det en god ide at have den samme mappe struktur og derfor skal du så lave en *public_html* i din projektmappe.

1. Opret projektmappe i din stifinder. Du kan kalde den for pwa_startup eller lignende.

2. Åbn denne mappe i VS Code

3. Hvis du vil køre din app op imod skolens server er det en god ide at have den samme mappe struktur og derfor skal du så lave en *public_html* i din projektmappe.

3. Opret filen *index.html* i roden af din *public_html* mappe og indsæt følgende html skelet i filen.
```html
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Min første progressive web app">
    <title>Min PWA side</title>
  </head>
<body>
    <main>
      <h1>Min PWA side</h1>
    </main>
</body>
</html>
```

4. Opret filen *manifest.json* på roden af din *public_html* mappe og indsæt følgende kode:
```json
{
    "name": "Progressive Web App Startup",
    "short_name": "PWA Startup",
    "start_url": "./index.html",
    "display": "standalone",
    "background_color": "#123456",
    "theme_color": "#123456",
    "icons": [{
        "src": "/sti/til/dit/ikon",
        "sizes": "100x100",
        "type": "image/png"
    }]
}
```
Der skal sandsynligvis skrives nogle flere ikoner ind i dit manifest. Du kan læse mere om hvordan du laver og forbereder dine logoer på følgende links:
* [https://realfavicongenerator.net/](https://realfavicongenerator.net/)
* [https://css-tricks.com/maskable-icons-android-adaptive-icons-for-your-pwa/](https://css-tricks.com/maskable-icons-android-adaptive-icons-for-your-pwa/)

5. Lav en reference til dit manifest fra *&lt;head&gt;* tagget i din *index.html* fil:
```html
<link rel="manifest" href="/manifest.json">
```
6. Opret filen *service-worker.js* i roden af din *public_html* mappe. Indsæt følgende i filen:
```javascript
// Installerer serviceworker
self.addEventListener("install", function(e) {
    console.log("Service Worker Installed");
    // Åbner cachen og tilføjer filer under cachenavnet pwastartup
    e.waitUntil(
        caches.open('pwastartup').then(function(cache) {
            return cache.addAll([
                //Her kan du indsætte de filer du vil cache
                '/',
                '/index.html'
            ]);
        })
    );
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
```
7. Når du har oprettet din serviceworker skal du installere den. Det gøres ved hjælp af javascript og derfor skal du lave fil til dine scripts. Opret derfor en *assets* mappe i roden af din *public_html* mappe. I denne mappe kan du oprette to nye mapper: *js* og *css*.

8. Opret filen *scripts.js* i *js* mappen og indsæt følgende:
```javascript
// Tjekker om browseren tillader en serviceworker 
// og registrerer den når siden indlæses
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
        .then((reg) => {
          console.log('Service worker er registreret.');
        });
  });
}
```
## Reflektion
Prøv eventuelt at gennemgå guiden hvor du  øver dig i at forklare de enkelte trin for dig selv eller en klassekammerat/ven. 

Skriv eventuelt ned hvilke dele kan du forstår, kan forklare og anvende. 

Skriv også ned hvis der er ord eller begreber som du ikke forstår.
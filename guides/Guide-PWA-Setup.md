# Guide til opsætning af en Progressive Web App 

Følgende guide vil hjælpe dig med at opsætte en Progressive Web App. For at vi kan lave en progressive web app er der nogle kriterier som skal være opfyldt og disse er listet herunder.

* Sitet skal køre over *_HTTPS_*. Dette skal opsættes på din *server*.
* Sitet skal være *_RESPONSIVT_* og virke på mobil og tablets. Her kan du bruge *prekompileret CSS*.
* Sitet skal kunne installeres og dermed køre med et *_WEB APP MANIFEST_*. Dette gør du med en *manifest.json* fil.
* Sitet skal virke offline og dermed køre med en *_SERVICEWORKER_*. Her skal du bruge en *serviceworker.js* fil.

Før vi går i gang skal du oprette en projektmappe - du kan kalde den for pwa_startup eller hvad du nu selv synes. 

Hvis du vil køre din app op imod skolens server er det en god ide at have den samme mappe struktur og derfor skal du så lave en *public_html* i din projektmappe.
___
1. Opret projektmappe i din stifinder. Du kan kalde den for pwa_startup eller lignende.
___
2. Åbn denne mappe i VS Code
___
3. Hvis du vil køre din app op imod skolens server er det en god ide at have den samme mappe struktur og derfor skal du så lave en *public_html* i din projektmappe.
___
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
___
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
* [Favicon generator](https://realfavicongenerator.net/)
* [Awesome fifs til meta og manifest](https://github.com/gokulkrishh/awesome-meta-and-manifest)
___
5. Lav en reference til dit manifest fra *&lt;head&gt;* tagget i din *index.html* fil:
```html
<link rel="manifest" href="/manifest.json">
```
___
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
```
___
7. Når du har oprettet din serviceworker skal du installere den. Det gøres ved hjælp af javascript og derfor skal du lave fil til dine scripts. Opret derfor en *assets* mappe i roden af din *public_html* mappe. I denne mappe kan du oprette to nye mapper: *js* og *css*.
___
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
___
9. Referer til en reference til dit script fra *&lt;head&gt;* tagget i din *index.html* fil:
```html
<script src="/assets/js/scripts.js"></script>
```
___
10. Nu kan du oprette dine *SASS* og *CSS* filer i css mappen og linke til dem i din *index.html* fil.
___
11. Test om din progressive app virker med *__Audits__*.
  
      Audits betyder revision eller kontrol og med dette værktøj kan du kontrollere, identificere og fikse almindelige problemer, som har betydning for din sides ydeevne, tilgængelighed og bruger oplevelse. Alt i alt er værktøjet en genial mentor at have ved hånden når vi bygger både sider og pwa'er.
  - Indlæs siden
  - Åbn devtools (browserens udvikler værktøj)
    - MAC: Cmd + Shift + J
    - WIN: Ctrl + Shift + J
  - Klik på *Audits* i menuen
  - Vælg device (Mobile/Desktop)
  - Vælg de *audits* du vil kontrollere.
  - Vælg *throttling*. (Begrænsning af forbindelse og CPU)
  - Vælg *Clear Storage* (Nulstiller din cache)
  - Klik på *Run audits*

  Nu får du resultatet af din kontrol og her gælder det om at få så høje tal som muligt for at give din side den  bedste ydeevne. Der skal også gerne være et V i PWA cirklen for at dit site kører rigtigt som en Progressiv Web App.

  Heldigvis har værktøjet nogle gode og præcise fejlmeddelser og links til sider, der forklarer hvordan du kan rette disse. Derfor kan du lære rigtig meget af at bruge dette værktøj hyppigt - både til Progressive Web App og almindelige websites.
___

## Reflektion
Prøv eventuelt at gennemgå guiden hvor du  øver dig i at forklare de enkelte trin for dig selv eller en klassekammerat/ven. 

Skriv eventuelt ned hvilke dele kan du forstår, kan forklare og anvende. 

Skriv også ned hvis der er ord eller begreber som du ikke forstår.
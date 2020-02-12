# Guide til opsætning af tilføjelse af App til hjemmeskærm

Følgende guide vil vise dig hvordan du kan opsætte din App's UI til at give brugerne mulighed for at tilføje app'en til deres hjemmeskærm.

Guiden tager udgangspunkt i at du har gennemført Guide-PWA-Setup og at du har åbnet dette projekt i VS Code.

## Målsætning

Målet er at lavet et banner i vores UI som kan trigge browseren til at tilføje vores site til hjemmeskærm. Til at gøre dette skal vi bruge:
* Et UI banner i HTML/CSS med en OK og en Annuller knap.
* Et javascript der lytter på om appen allerede er installeret
* Et javascript der kan håndtere installationen

### iOS Mobiler
Det følgende script virker på mobiler som kører Android men ikke på iphones.. 

På en iphone skal man åbne siden i Safari, trykke på Action ikonet og vælge "Tilføj til hjemmeskærm".

### Script
___
1. Start med at lave noget UI til dit banner - eksempelvis under footeren  på din *index.html* side. 
```html
<section id="a2hs-banner">
    <h2>Tilføj til hjemmeskærm</h2>
    <div class="grid">
      <div class="div1">
        <img alt="PWA Startup Ikon" src="/assets/images/icons/favicon-32x32.png" />
      </div>
      <div class="div2">
        <strong>PWA Start</strong><br>
        Min første App
      </div>
      <div class="div3">
        <button type="button" id="btnadd">Ok</button>
        <button type="button" id="btndismiss">Annuller</button>
      </div>
    </div>
</section>
```
___
2. Banneret er nu altid synligt på dit site. Start med at sætte en *display:none* på banneret i dit CSS.
___
3. Opret en javascript fil i din *js* mappe. Kald den eventuelt for *add2homescreen.js*.
___
3. I javascript filen skal vi først sætte en variabel til at registrere vores prompt plus en variabel til vores banner objekt:
```javascript
// Sætter variabler til registrering af prompt og UI banner
let browserPrompt;
let a2hsBanner = document.getElementById('a2hs-banner');
```
___
4. Chrome browseren har et stadie der kaldes *beforeinstallprompt*. PÅ denne kan vi måle om vores app er installeret eller ej. Hvis det ikke er installeret skal vi gøre vores banner synligt. Hvis det er installeret vil browseren ikke bevæge sig ind i nedenstående scope.
```javascript
// Lytter på beforeinstallprompt eventet
window.addEventListener('beforeinstallprompt', (e) => {
    // Tjek at vi rammer scopet
    console.log('Før installation af prompt');
    // Gem event så vi kan kalde det senere
    deferredPrompt = e;
    // Opdater UI sæt banner til synlig
    a2hsBanner.style.display = 'block';
 });
```
___
5. Vi skal indsætte et script der kan lytte på click event på OK knappen i vores UI banner. Hvis der kommer et click event skal browseren kalde prompten der kan tilføje appen til hjemmeskærmen:
```javascript
// Lytter på et event fra OK knap
document.getElementById('btnadd').addEventListener('click', (e) => {
  // Skjul UI når bruger klikker
  a2hsBanner.style.display = 'none';
  // Vis browser prompt
  deferredPrompt.prompt();
  // Vent til at bruger besvarer prompten
  deferredPrompt.userChoice 
    .then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('Bruger har accepteret A2HS prompten');
      } else {
        console.log('Bruger har afvist A2HS prompten');
      }
      deferredPrompt = null;
    });
});
```
___
6. Vi skal også indsætte et script der kan lytte på vores Annuller knap og derefter skjule banneret. Her kan du selv prøve dig frem ved at kigge på den foregående funktionalitet.
___

## Reflektion
Prøv eventuelt at gennemgå guiden hvor du  øver dig i at forklare de enkelte trin for dig selv eller en klassekammerat/ven. 

Skriv eventuelt ned hvilke dele kan du forstår, kan forklare og anvende. 

Skriv også ned hvis der er ord eller begreber som du ikke forstår.
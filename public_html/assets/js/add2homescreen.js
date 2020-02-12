/**
 *  Script til Add To Home Screen funktion
 *  Heinz K, Feb 20
 */

// Sætter variabler
let deferredPrompt;
let a2hsBanner = document.getElementById('a2hs-banner');

/**
 * Hvis PWA kriterier for tilføjelse til startskærm er opfyldt, 
 * udløser Chrome en beforeinstallprompt hændelse, som du kan 
 * bruge til at indikere, at din app kan 'installeres' og derefter 
 * bede brugeren om at installere den.
 */
window.addEventListener('beforeinstallprompt', (e) => {
    // Tjek at vi rammer scopet
    console.log('Før installation af prompt');
    // Gem event så vi kan kalde det senere
    deferredPrompt = e;
    // Opdater UI sæt banner til synlig
    a2hsBanner.style.display = 'block';
 });

 /**
 * Funktion til besked
 */

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

// Lytter på et event fra Cancel knap
document.getElementById('btndismiss').addEventListener('click', (e) => {
  // Skjul UI når bruger klikker
  a2hsBanner.style.display = 'none';
});


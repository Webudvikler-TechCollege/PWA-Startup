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

// Script til Add To Home Screen funktion

// Sætter variabel til prompt
let deferredPrompt;

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
    // Opdater UI - kald funktion der giver brugeren 
    // en besked om at de kan tilføje til hjemmeskærm
    showInstallPromotion();
});

/**
 * Funktion til besked
 */
function showInstallPromotion() {
  // Bygger UI til besked
  let htmlprompt = `
    <section class="installprompt">
      <h2>Tilføj til hjemmeskærm</h2>
      <div class="grid">
        <div class="div1">
          <img src="/assets/images/icons/favicon-32x32.png" />
        </div>
        <div class="div2">
          <strong>PWA Start</strong><br>
          Min første App :)
        </div>
        <div class="div3">
          <button type="button" id="btnadd">Ok</button>
          <button type="button" id="btndismiss">Cancel</button>
        </div>
      </div>
    </section>
  `;
  // Indsætter UI på siden
  document.getElementById('prompt-placeholder').innerHTML = htmlprompt;

  // Lytter på et event fra OK knap
  document.getElementById('btnadd').addEventListener('click', (e) => {
    // Skjul UI når bruger klikker
    document.getElementById('prompt-placeholder').style.display = 'none';
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
    document.getElementById('prompt-placeholder').style.display = 'none';
  });
  
}


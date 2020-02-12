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
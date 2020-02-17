// Hent browser language
console.log(`Sprog: ${navigator.language}`);

// Hent geolocations latitude og longitude
navigator.geolocation.getCurrentPosition((position) => {
    console.log(`Latitude: ${position.coords.latitude}`);
    console.log(`Longtitude: ${position.coords.longitude}`);
});
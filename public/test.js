document.addEventListener("DOMContentLoaded", function(){
    
    window.map = document.getElementById("map")
    
});



function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
}







function search(searchWord) {
    map.src = 'https://maps.google.com/maps?q='+searchWord+'&t=k&z=9&ie=UTF8&iwloc=&output=embed'
};
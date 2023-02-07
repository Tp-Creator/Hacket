document.addEventListener("DOMContentLoaded", function(){
    
    window.map = document.getElementById("map")
    
    
    window.x = document.getElementById("demo");
    
    
    let data = document.getElementById("data");
    
    
    ourData(function(){
        console.log(window.d);
        allData = window.d
        
        // data.innerHTML = window.d.timeSeries[7].parameters[14].values[0];
        for(i = 0; i < window.d.timeSeries.length; i++){
            for(j = 0; j < window.d.timeSeries[i].parameters.length; j++){
                if(window.d.timeSeries[i].parameters[j].name == "ws"){
                    a = document.createElement("p");
                    a.innerHTML = window.d.timeSeries[i].validTime + ": " + window.d.timeSeries[i].parameters[j].values[0];
                    document.body.appendChild(a);
                }
            }
        }        
        
    })
    
    
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


function ourData(callback=function(){}){
    const Http = new XMLHttpRequest();
    const url='https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/17.943668/lat/59.43172/data.json';
    Http.open("GET", url);
    Http.send();
    Http.onreadystatechange = function(){
        if(Http.readyState === 4 && Http.status === 200) {
            var response = JSON.parse(Http.responseText);
            // console.log(response);
            window.d = response;
            callback()
            return response;
        };
    };
};
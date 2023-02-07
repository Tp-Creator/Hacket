document.addEventListener("DOMContentLoaded", function(){

    let data = document.getElementById("data");


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


})
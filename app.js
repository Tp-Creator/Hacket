const { default: axios } = require('axios');
const express = require('express');
const path = require('path');

const app = express();

const PARAMETERS = ["ws", "t", "tcc_mean"]

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.json());
app.use(express.urlencoded());
   

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/test', (req, res) => {
    res.render('test');
})

app.post('/submit', async (req, res) => {
    const lat = req.body.lat;
    const lon = req.body.lon;
    const area = req.body.area;
    const effect = req.body.effect;
    const WEATHER_API = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${lon}/lat/${lat}/data.json`;
    const DAYTIME = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&date=2023-01-11&formatted=0`;
    const result = await axios.get(WEATHER_API);
    const response = []
    for(let d of result.data.timeSeries) {
        response.push({ date: d.validTime, data: d.parameters.filter(x => PARAMETERS.includes(x.name)) });
    }


    sunresults = await axios.get(DAYTIME);
    sunresponse = (sunresults.data.results.day_length/3600)-1.5

    // console.log(sunresponse);

    let windspeed = 0 
    for(let hrs = 0; hrs < 24; hrs++){

        let data = response[hrs].data

        for(let i = 0; i < data.length; i++){

            if(data[i].name == "ws"){
            
                windspeed += data[i].values[0];
            
            }
        }
    }

    windspeed = (Math.round((windspeed/24)*100))/100;

    const solarPrice = parseInt(area) * 3250;


    let solarEnergy = parseInt(area) * parseInt(effect) * sunresponse;
    solarEnergy = Math.round(solarEnergy);

    res.send("Energi med solceller idag: " + solarEnergy.toString() + " kWh " + solarPrice.toString() + " kr " + windspeed + " m/s");
});

// app.get('/main', (req, res) => {
//     res.sendFile(path.join(__dirname + 'public/main.html'));
// });
app.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'test.html'));
});


app.listen(8080, () => {
    console.log("Server listening on port 8080.");
});
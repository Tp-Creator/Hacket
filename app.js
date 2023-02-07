const { default: axios } = require('axios');
const express = require('express');
const path = require('path');

const app = express();

const PARAMETERS = ["ws", "t"]

app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded());
   

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/submit', async (req, res) => {
    const lat = req.body.lat;
    const lon = req.body.lon;
    const WEATHER_API = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${lon}/lat/${lat}/data.json`;
    const result = await axios.get(WEATHER_API);
    const response = []
    for(let d of result.data.timeSeries) {
        response.push({ date: d.validTime, data: d.parameters.filter(x => PARAMETERS.includes(x.name)) });
    }
    res.send(response);
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
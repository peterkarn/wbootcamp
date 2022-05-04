const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: false
}));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.get('/', (req, res) => {
   res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => { //при запросе от клиента
  const lat = req.body.lat;
  const lon = req.body.lon;
  const apiKEy = '46e13cd7810304844662e5af11ac506b';
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKEy}&units=metric`;

  https.get(url, response => { //cходи не урлу п получи ответ response
    response.on('data', data => { //когда response по событию data когда получишь data
      const weatherData = JSON.parse(data);
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const link = `http://openweathermap.org/img/w/${icon}.png`;
      const temp = weatherData.main.temp;
      
      res.write(`<p>Weather description: ${weatherDescription}</p>`);
      res.write(`<h1>The temerature is ${temp}</h1>`);
      res.write(`<p>Weather icon: <br> <img src="${link}"></p>`);
      res.send();
    });
  })
});






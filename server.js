'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

//enviroment variable defined in .env as 3000
const PORT = process.env.PORT || 3000;

console.log(process.env.TEST);

//if front end is in same directory, front end is in public file and following line is needed
//app.use(express.static('./public'));

app.get('/isitworking', (request, response) => {
  response.send('yes');
});

app.get('/TEST', (request, response) => {
  try {
    let testData = require('./data/geo.json');
    response.send(testData);
  } catch (error) {
    console.log('there was en error');
    response.status(500).send('sorry, error');
  }
});

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));

app.get('/location', (request, response) => {
  let jsonInfo = require('./data/geo.json');
  let someLocation = new GeoObject(jsonInfo.results[0].address_components[0].long_name, jsonInfo.results[0].formatted_address, jsonInfo.results[0].geometry.location.lat, jsonInfo.results[0].geometry.location.lng);
  response.send(someLocation);
});

function GeoObject(query, address, latitude, longitude){
  this.formatted_query = query;
  this.formatted_address = address;
  this.latitude = latitude;
  this.longitude = longitude;
}

app.get('/weather', (request, response) => {
  let jsonInfo = require('./data/darksky.json');
  let someLocation = new WeatherObject(jsonInfo.hourly.summary, jsonInfo.currently.time);
  response.send(someLocation);
});

function WeatherObject(forecast, time){
  this.summary = forecast;
  this.day = time;
}

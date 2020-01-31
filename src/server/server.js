const express = require('express')
const https = require('https')
const request = require('request');
const app = express()
const port = 3001
var keys = require('./keys'); // get file with all api keys
var firebase = require("firebase/app");
var bodyParser = require('body-parser')

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");
require('firebase/database');


const firebaseConfig = {
    apiKey: "AIzaSyDTrW7v8-3KL-_ScJSGQ5Oo_8k1-OIYozk",
    authDomain: "hemaa-club-finder.firebaseapp.com",
    databaseURL: "https://hemaa-club-finder.firebaseio.com",
    projectId: "hemaa-club-finder",
    storageBucket: "hemaa-club-finder.appspot.com",
    messagingSenderId: "801602412728",
    appId: "1:801602412728:web:5819f173fa2064ae3cd44d",
    measurementId: "G-HXKD4SJ6TX"
  };

firebase.initializeApp(firebaseConfig);

app.use(bodyParser.json())

app.post('/locations/addLocation', function (req, res) {
    console.log(req.body);

    firebase.database().ref('locations/' + req.body.city.replace(/\s/g, '_') + "~~" + req.body.name.replace(/\s/g, '_')).set(req.body)
    .then(result => {
    console.log(req.body)
    res.sendStatus(200);
    })
    .catch(function (error) {
    console.log(error);
    res.sendStatus(400);
    })
})

// configure our app to handle CORS requests
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Cache-Control, Origin, X-Requested-With,Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true)
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    };
});

app.get('/', (req, res) => res.send('Hello World!'))

/**
 * Route converts address into lat and long coordinates
 */
app.get('/location/getCoords/address/:address', function (req, res) {
    var location = null;

    request('https://maps.googleapis.com/maps/api/geocode/json?address=' + req.params.address + '&key=' + keys.GEOCODE_API_KEY, function(err, result, body) {
        var results = JSON.parse(body).results[0];
        location = results.geometry.location;
        res.send(location);
    });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
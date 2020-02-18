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
//Added by Ben
var firebase = require('firebase');
var firebaseui = require('firebaseui');

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

//initialize firebaseUI by Ben
var ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.start('#firebaseui-auth-container', {
    signInOptions: [
        {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            requireDisplayName: false
        }
    ]
});

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

app.post('/organizations/addOrganization', (req, res) => {
    console.log(req.body);
    var userid;
    var user;

    firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password)
    .then(() => {
        user = firebase.auth().currentUser.uid;
        console.log('////////')
        console.log(user);

        firebase.database().ref('organizations/' + user).set(
            {
                name: req.body.name, 
                email: req.body.email,
                address: req.body.address, 
                country: req.body.country,
                city: req.body.city,
                state: req.body.state,
                zip: req.body.zip,
                website: req.body.website,
                phone: req.body.phone,
                description: req.body.description,
                username: req.body.username
            }
            )
          .then(result => {
          console.log(req.body)
          res.sendStatus(200);
          })
          .catch(function (error) {
          console.log(error);
          res.sendStatus(400);
          })

    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        res.send({error : error.code, message: error.message})
        console.log(errorMessage);
      });

      //console.log(userid);
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
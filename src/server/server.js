const express = require('express')
const https = require('https')
const request = require('request');
const app = express()
const port = 3001
var keys = require('./keys'); // get file with all api keys
var firebase = require("firebase/app");
var bodyParser = require('body-parser');

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");
require('firebase/database');
//Added by Ben
var firebase = require('firebase');

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
var database = firebase.database();

app.use(bodyParser.json());

// configure our app to handle CORS requests
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS, POST, EDIT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Cache-Control, Origin, X-Requested-With,Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true)
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    }
    else {
        next();
    };
});

app.get('/locations/getLocations', function (req, res) {
    var ref = firebase.database().ref('locations');
    var locations = [];
    ref.once('value').then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            locations.push({name: childSnapshot.val()["name"],
                address: childSnapshot.val()["address"],
                website: childSnapshot.val()["website"],
                weapons: childSnapshot.val()["weapons"],
                email: childSnapshot.val()["email"],
                contact: childSnapshot.val()["contact"],
                phone: childSnapshot.val()["phone"],
                description: childSnapshot.val()["description"],
                lat: childSnapshot.val()["lat"],
                lng: childSnapshot.val()["lng"],
                color: childSnapshot.val()["color"],
                orgEmail: childSnapshot.val()["orgEmail"]});
        });
        res.send(locations);
    });
});

app.get('/locations/getLocations/:email', function (req, res) {
    var ref = firebase.database().ref('locations');
    var locations = [];
    ref.orderByChild("orgEmail").equalTo(req.params.email).once('value').then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            locations.push({name: childSnapshot.val()["name"],
                address: childSnapshot.val()["address"],
                website: childSnapshot.val()["website"],
                weapons: childSnapshot.val()["weapons"],
                email: childSnapshot.val()["email"],
                contact: childSnapshot.val()["contact"],
                phone: childSnapshot.val()["phone"],
                description: childSnapshot.val()["description"],
                lat: childSnapshot.val()["lat"],
                lng: childSnapshot.val()["lng"],
                color: childSnapshot.val()["color"],
                orgEmail: childSnapshot.val()["orgEmail"]});
        });
        res.send(locations);
    })
});


app.post('/locations/addLocation', function (req, res) {
    //console.log(req.body);
    firebase.database().ref('locations/' + req.body.lat.toString().replace(".", '_') + "," + req.body.lng.toString().replace(".", '_')).set(req.body)
    .then(result => {
    //console.log(req.body)
    res.sendStatus(200);
    })
    .catch(function (error) {
    //console.log(error);
    res.sendStatus(400);
    })
})

app.post('/locations/editLocation', function(req, res) {
    //console.log(req.body);
    firebase.database().ref('locations/' + req.body.lat.toString().replace(".", '_') + "," + req.body.lng.toString().replace(".", '_')).set(req.body)
    .then(result => {
    //console.log(req.body)
    res.sendStatus(200);
    })
    .catch(function (error) {
    //console.log(error);
    res.sendStatus(400);
    })
});


app.delete('/locations/removeLocation', function(req, res) {
    firebase.database().ref('locations/' + req.body.lat.toString().replace(".", '_') + "," + req.body.lng.toString().replace(".", '_')).remove()
        .then(() => {
            res.sendStatus(200);
        }).catch((error) => {
            res.sendStatus(400);
    });

});

/////////////////////////////////////////////////////////
app.get('/organizations/getOrganizations', function (req, res) {
    var ref = firebase.database().ref('organizations');
    var organizations = [];
    ref.once('value').then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            organizations.push({
                name: childSnapshot.val()["name"],
                address: childSnapshot.val()["address"],
                country: childSnapshot.val()["country"],
                city: childSnapshot.val()["city"],
                state: childSnapshot.val()["state"],
                zip: childSnapshot.val()["zip"],
                description: childSnapshot.val()["description"],
                website: childSnapshot.val()["website"],
                email: childSnapshot.val()["email"],
                username: childSnapshot.val()["username"],
            });
        });
        res.send(organizations);
    });
});

app.get('/organizations/checkforAdmin/:uid', function (req, res) {
    var ref = firebase.database().ref('organizations/' + req.params.uid);
    ref.once('value').then(function(snapshot) {
        if (snapshot.val() == null) {
            res.send("false");
        } else {
            res.send(snapshot.val()["admin"]);
        }
    })
})

app.post('/organizations/addOrganization', function (req, res) {
    //console.log(req.body);
    firebase.database().ref('organization/' + req.body.id).set(req.body)
    .then(result => {
    //console.log(req.body)
    res.sendStatus(200);
    })
    .catch(function (error) {
    //console.log(error);
    res.sendStatus(400);
    })
})

app.post('/locations/editLocation', function(req, res) {
    //console.log(req.body);
    firebase.database().ref('locations/' + req.body.lat.toString().replace(".", '_') + "," + req.body.lng.toString().replace(".", '_')).set(req.body)
    .then(result => {
    //console.log(req.body)
    res.sendStatus(200);
    })
    .catch(function (error) {
    //console.log(error);
    res.sendStatus(400);
    })
});


app.delete('/locations/removeLocation', function(req, res) {
    firebase.database().ref('locations/' + req.body.lat.toString().replace(".", '_') + "," + req.body.lng.toString().replace(".", '_')).remove()
        .then(() => {
            res.sendStatus(200);
        }).catch((error) => {
            res.sendStatus(400);
    });

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
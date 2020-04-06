const express = require('express')
const https = require('https')
const request = require('request');
const app = express()
const port = 3001
const axios = require("axios");
var keys = require('./keys'); // get file with all api keys
var firebase = require("firebase/app");
var bodyParser = require('body-parser');

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");
require('firebase/database');
require('firebase-admin');
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

app.get('/locations/getLocations/currCoords/:lat/:lng', function(req, res) {
    var ref = firebase.database().ref('locations');
    var locations = [];
    ref.once('value').then(async function(snapshot) {
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
        res.send(await getDistances(locations, req.params.lat, req.params.lng));
    });
});

app.get('/locations/getLocations/currCoords/:lat/:lng/:email', function (req, res) {
    var ref = firebase.database().ref('locations');
    var locations = [];
    ref.orderByChild("orgEmail").equalTo(req.params.email).once('value').then(async function(snapshot) {
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
        res.send(await getDistances(locations, req.params.lat, req.params.lng));
    })
});


app.post('/locations/addLocation', function (req, res) {
    //console.log(req.body);
    firebase.database().ref('locations/' + req.body.lat.toString().replace(".", '_') + "," + req.body.lng.toString().replace(".", '_')).set(req.body)
    .then(result => {
    res.sendStatus(200);
    })
    .catch(function (error) {
    res.sendStatus(400);
    })
})

app.post('/locations/editLocation', function(req, res) {
    firebase.database().ref('locations/' + req.body.lat.toString().replace(".", '_') + "," + req.body.lng.toString().replace(".", '_')).set(req.body)
    .then(result => {
    res.sendStatus(200);
    })
    .catch(function (error) {
    res.sendStatus(400);
    })
});

app.delete('/organizations/eraseLocations', function(req, res) {
    var updates = {};
    var ref = firebase.database().ref('locations');
    ref.orderByChild("orgEmail").equalTo(req.body.email).once('value').then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            updates['/' + childSnapshot.key + '/'] = null;
        });
        ref.update(updates);
    });
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
app.get('/organizations/getOrganization/:uid', function(req, res) {
    var ref;
    try {
        ref = firebase.database().ref('organizations/'+req.params.uid);
    } catch(TypeError) {
        console.log("User has not been set yet");
    }
    ref.once('value').then(function(snapshot) {
        var organization = {
            name: snapshot.val()["name"],
            website: snapshot.val()["website"],
            email: snapshot.val()["email"],
            username: snapshot.val()["username"],
        }
        res.send(organization);
    });
})
app.get('/organizations/getOrganizations', function (req, res) {
    var ref = firebase.database().ref('organizations');
    var organizations = [];
    ref.once('value').then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            if (childSnapshot.val()["admin"] == "False") {
                    organizations.push({
                        name: childSnapshot.val()["name"],
                        website: childSnapshot.val()["website"],
                        email: childSnapshot.val()["email"],
                        username: childSnapshot.val()["username"],
                        id: childSnapshot.key
                });
            }
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

    firebase.database().ref('organizations/' + req.body.id).set(req.body)
    .then(result => {
    res.sendStatus(200);
    })
    .catch(function (error) {
    res.sendStatus(400);
    })
})

app.post('/organizations/editOrganization', function(req, res) {
    firebase.database().ref('organizations/' + req.body.id).set(req.body)
    .then(result => {
    res.sendStatus(200);
    })
    .catch(function (error) {
    res.sendStatus(400);
    })
});


app.delete('/organizations/removeOrganization', function(req, res) {
    firebase.database().ref('organizations/' + req.body.id).remove()
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

});

app.get('/organizations/newOrg', function (req, res) {
    firebase.admin.auth().createUser({
        email: req.body.email,
        password: req.body.password
    }).then(function(createdUser) {
        res.send(createdUser.uid);
    }).catch(function(error) {
        res.sendStatus(400);
    });
});

async function getDistances(markers, lat, lng) {
    var newMarkers;
    var origins = lat + "," + lng + "&";
    var destinations = "destinations=";

    markers.forEach(marker => {
        destinations += marker.lat + "%2C" + marker.lng + "%7C";
    });
    destinations = destinations.substr(0, destinations.length - 3);

    await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=' + origins + destinations + "&key=" + keys.GEOCODE_API_KEY)
        .then(res => {
            var results = res.data;
            for (var i=0; i < markers.length; i++) {
                if (results.rows[0].elements[i].status == 'OK') {
                    markers[i].distance = results.rows[0].elements[i].distance.text;
                } else {
                    markers[i].distance = "N/A"
                }
            }

            markers.sort(function (a, b) {
                if (a.distance == "N/A") { return 10000;}
                if (b.distance == "N/A") {return -10000;}
                return parseFloat(a.distance.replace(',', '')) - parseFloat(b.distance.replace(',', ''));
            });

            newMarkers = markers;
        }).catch(err => {
            newMarkers = markers;
        });
    return newMarkers;
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
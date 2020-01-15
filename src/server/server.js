const express = require('express')
const https = require('https')
const request = require('request');
const app = express()
const port = 3001
var keys = require('./keys'); // get file with all api keys

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
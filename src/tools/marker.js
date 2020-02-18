import config from './config.js';
import axios from 'axios';

export async function addLocation(marker) {
    var req = config.SERVER_URL + "/locations/addLocation";
    await axios.post(req, marker)
        .then(res => {
            console.log(res);
        })
        .catch(function (error) {
            console.log(error);
        })
        return null;
}

export function editLocation(oldMarker, marker) {
    let test = config.SERVER_URL + "/locations/editLocation";
    removeLocation(oldMarker);
    axios.post(test,  marker)
        .then(test => { console.log("Edit Complete")
        })
        .catch(function(error) {
            console.log("Ya done goofed -> " + error);
        })
    return null;
}

export function removeLocation(marker) {
    var req = config.SERVER_URL + "/locations/removeLocation";
    axios.delete(req, {data: marker})
        .then( res => {
            console.log("Successfully removed...");
        })
        .catch( function(error) {
            console.log(error);
        })
    return null;
}

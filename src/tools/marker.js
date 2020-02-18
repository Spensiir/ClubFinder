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
        console.log("to change something");
}

export function editLocation(marker) {
    
    let test = config.SERVER_URL + "/locations/editLocation";
    axios.edit(test, {data: marker})
        .then(test => { console.log("Edit Complete")
        })
        .catch(function(error) {
            console.log("Ya done goofed -> " + error);
        })
        
    return null;
}


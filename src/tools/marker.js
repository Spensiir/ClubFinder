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
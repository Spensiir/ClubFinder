import {config} from './config.js';
import axios from 'axios';

export async function getCoords(loc) {
    var locString = loc.address + ", " + loc.city + ", " + loc.state;
    locString = locString.split(" ").join("+");

    var req = config.SERVER_URL + "/location/getCoords/address/" + locString ;
    console.log(req);

    let coords;
    await axios.get(req)
        .then(res => {
            coords = res.data;
        })
        .catch(function (error) {
            console.log(error);
            coords = {lat: null, lng: null};
        })

    console.log(coords);
    return coords;
}
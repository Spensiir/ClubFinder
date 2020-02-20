import {config} from '../tools/config.js';
import axios from 'axios';
import {userManager} from "./UserManager.js";

class LocationManager {
    locations;

    constructor() {
        this.locations = this.updateLocations();
    }

    async addLocation(marker) {
        var req = config.SERVER_URL + "/locations/addLocation";
        await axios.post(req, marker)
            .then(res => {
                console.log(res);
            })
            .catch(function (error) {
                console.log(error);
            });
        this.updateLocations();
        return null;
    }

    async editLocation(oldMarker, marker) {
        this.removeLocation(oldMarker);
        await this.addLocation(marker);
        return null;
    }

    removeLocation(marker) {
        var req = config.SERVER_URL + "/locations/removeLocation";
        axios.delete(req, {data: marker})
            .then(res => {
                console.log("Successfully removed...");
            })
            .catch(function (error) {
                console.log(error);
            });
        this.updateLocations();
        return null;
    }

    getLocations() {
        return this.locations;
    }

    updateLocations() {
        var req = config.SERVER_URL + "/locations/getLocations";
        var newLocations;
        var currUser = userManager.getUser();

        // if a user is signed in then append the user id to the request
        if (currUser) {
            req += "/" + currUser.uid;
        }

        axios.get(req)
            .then(function (res) {
                newLocations = res;
            }).catch(function (error) {
                newLocations = []; // if an error occurs the no locations will appear
                console.log(error);
            });
        this.locations = newLocations;
    }
}

let locationManager = new LocationManager();
export default locationManager;


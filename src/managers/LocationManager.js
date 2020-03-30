import {config} from '../tools/config.js';
import axios from 'axios';

class LocationManager {
    locations;

    constructor() {
        this.locations = [];
    }

    async addLocation(marker) {
        var req = config.SERVER_URL + "/locations/addLocation";
        await axios.post(req, marker)
            .then(() => {
                console.log("Successfully added...");
            })
            .catch(function (error) {
                console.log(error);
            });
        return null;
    }

    async editLocation(oldMarker, marker) {
        await this.removeLocation(oldMarker);
        await this.addLocation(marker);
        return null;
    }

    async removeLocation(marker) {
        var req = config.SERVER_URL + "/locations/removeLocation";
        await axios.delete(req, {data: marker})
            .then(res => {
                console.log("Successfully removed...");
            })
            .catch(function (error) {
                console.log(error);
            });
        return null;
    }

    async getLocations() {
        if (await this.locations) {
            return this.locations;
        } else {
            return [];
        }
    }

    async updateLocations(userManager, isAdmin, lat, lng) {
        var req = config.SERVER_URL + "/locations/getLocations/currCoords/" + lat + '/' + lng;
        let newLocations;
        var currUser = userManager.getUser();

        // if a user is signed in then append the user id to the request
        if (currUser && !isAdmin) {
            req += "/" + currUser.email;
        }

        console.log(req);
        await axios.get(req)
            .then(res => {
                newLocations = res.data;
            }).catch(function (error) {
                newLocations = []; // if an error occurs the no locations will appear
                console.log(error);
            });

        this.locations = newLocations;
        return newLocations;
    }

    async getClickedLocations(email) {
        var req = config.SERVER_URL + "/locations/getLocations";
        let newLocations;

        req += "/" + email;

        await axios.get(req)
            .then(res => {
                newLocations = res.data;
            }).catch(function (error) {
                newLocations = []; // if an error occurs the no locations will appear
                console.log(error);
            });
        return newLocations;
    }
}

let locationManager = new LocationManager();
export default locationManager;


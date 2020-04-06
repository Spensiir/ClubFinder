import {config} from '../tools/config.js';
import axios from 'axios';
import { userManager } from './UserManager.js';
import locationManager from "../managers/LocationManager.js"
import SimpleMap from "../components/Map";

 //TODO: finish implementing updateOrganizations()
class OrganizationManager {
    organizations;

    constructor() {
        this.organizations = [];
    }

    async addOrganization(organization) {
        var req = config.SERVER_URL + "/organizations/addOrganization";
        await axios.post(req, organization)
        .catch(function (error) {
            console.log(error);
        });
        this.organizations = await this.updateOrganizations();
        return null;
    }

    async editOrganization(oldOrganization, newOrganization) {
        oldOrganization.id = newOrganization.id;
        //await this.removeOrganization(oldOrganization);
        await this.addOrganization(newOrganization);
        return null;
    }

    async removeOrganization(organization) {
        var req = config.SERVER_URL + "/organizations/removeOrganization";
        axios.delete(req, {data: organization})
            .then(res => {
                console.log("Successfully removed...");
            })
            .catch(function (error) {
                console.log(error);
            });
        this.organizations = await this.updateOrganizations();
        return null;
    }

    async eraseOrganization(organization) {
        console.log(organization)
        await this.removeOrganization(organization);
        var req = config.SERVER_URL + "/organizations/eraseLocations";
        //removing org locations
        axios.delete(req, {data: organization})
            .then(res => {
                console.log("Successfully removed locations...");
            })
            .catch(function (error) {
                console.log(error);
            });
        return null;
    }

    async getOrganizations() {
        console.log("location manager: line 45");
        if (await this.organizations) {
            return this.organizations;
        } else {
            return [];
        }
    }

    async getOrganization(uid) {
        var organization;
        var req = config.SERVER_URL + "/organizations/getOrganization/" + uid;
        await axios.get(req)
            .then(res => {
                organization = res.data;
            })
            .catch(function (error) {
                organization = "";
            });
        return organization;
    }

    async updateOrganizations() {
        var req = config.SERVER_URL + "/organizations/getOrganizations";
        let newOrganizations;

        await axios.get(req)
            .then(res => {
                newOrganizations = res.data;
            }).catch(function (error) {
                newOrganizations = []; // if an error occurs the no locations will appear
                console.log(error);
            });
        return newOrganizations;
    }
}

export let organizationManager = new OrganizationManager();
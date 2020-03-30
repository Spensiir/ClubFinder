import {config} from '../tools/config.js';
import axios from 'axios';
import { userManager } from './UserManager.js';

 //TODO: finish implementing updateOrganizations()
class OrganizationManager {
    organizations;

    constructor() {
        this.organizations = [];
    }

    async addOrganization(organization) {
        var req = config.SERVER_URL + "/organizations/addOrganization";
        var uid = userManager.fireAdminCreateUser(organization);
        organization.id = uid;
        await axios.post(req, organization)
        .catch(function (error) {
            console.log(error);
        });
        this.organizations = await this.updateOrganizations();
        return null;
    }

    async editOrganization(oldOrganization, newOrganization) {
        await this.removeOrganization(oldOrganization);
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

    async getOrganizations() {
        console.log("location manger: line 45");
        if (await this.organizations) {
            return this.organizations;
        } else {
            return [];
        }
    }

    async updateOrganizations() {
        var req = config.SERVER_URL + "/organizations/getOrganizations";
        let newOrganizations;
        var currUser = userManager.getUser();

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

let organizationManager = new OrganizationManager();
export default organizationManager;
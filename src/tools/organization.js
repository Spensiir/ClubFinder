import config from './config.js';
import axios from 'axios';

export async function addOrganization(organization) {
    var req = config.SERVER_URL + "/organizations/addOrganization";
    await axios.post(req, organization)
        .then(res => {
            console.log(res);
        })
        .catch(function (error) {
            console.log(error);
        })
        return null;
}
import {firebase, admin} from '../tools/config.js';
import {config} from '../tools/config.js';
import axios from 'axios';

class UserManager {
    user;
    constructor() {
        this.user = null;
    }
    async fireSignIn(email, password) {
        var confirmed;
        var errorMessage;
        var adminStr;
        await firebase.auth().signInWithEmailAndPassword(email, password).then(async ()=> {
            this.user = firebase.auth().currentUser;
            confirmed = true;
            adminStr = "false";
            var req = config.SERVER_URL + "/organizations/checkforAdmin";
            if (this.user) {
                req += "/" + this.user.uid;
            }
            await axios.get(req)
            .then(res => {
                adminStr = res.data;
            }).catch(function (error) {
                adminStr = "false"; // if an error occurs then no locations will appear
                console.log(error);
            });
        }
            ).catch(function (error) {
            // Handle Errors here.
            errorMessage = error.message;
            console.log(errorMessage);
            confirmed = false;
            });
        return [confirmed, errorMessage, adminStr];
    }

    async fireCreateUser(organization) {
        var user;
        var confirmed;
        var err; 
        await firebase.auth().createUserWithEmailAndPassword(organization.email, organization.password)
        .then(() => {
            user = firebase.auth().currentUser.uid;

            firebase.database().ref('organizations/' + user).set(
                {
                    name: organization.name, 
                    email: organization.email,
                    website: organization.website,
                    username: organization.username,
                    admin: "False"
                }
                )
            .then(result => {
            console.log(organization)
            })
            .catch(function (error) {
            console.log(error);
            });
            confirmed = true;
            err = "Ok.";
        }).catch(function(error) {
            // Handle Errors here.
            var errorMessage = error.message;
            //res.send({error : error.code, message: error.message})
            console.log(errorMessage);
            confirmed = false;
            err = errorMessage;
        });
        return [confirmed, err, "false"];
    }

    async fireAdminCreateUser(user) {
        admin.auth().createUser({
            email: user.email,
            password: user.password
        }).then(function(createdUser){
            return createdUser.uid;
        }).catch(function(error){
            console.log("Error creating new user", error);
        });
    }

    async fireSignOut() {
        var confirmed;
        await firebase.auth().signOut().then(() => {
            confirmed = true;
            this.user = firebase.auth().currentUser;
        }).catch((error) => {
            console.log(error.errorMessage);
            confirmed = false;
        });
        return confirmed;
    }

    getUser() {
        return this.user;
    }

    setUser(user) {
        this.user = user;
    }
}

export let userManager = new UserManager();

import {firebaseConfig} from '../tools/config.js';

var firebase = require("firebase/app");
require("firebase/auth");
firebase.initializeApp(firebaseConfig);

class UserManager {
    user;
    constructor() {
        this.user = null;
    }
    async fireSignIn(email, password) {
        var confirmed;
        var errorMessage;
        await firebase.auth().signInWithEmailAndPassword(email, password).then(()=> {
            this.user = firebase.auth().currentUser;
            confirmed = true;
        }
            ).catch(function (error) {
            // Handle Errors here.
            errorMessage = error.message;
            console.log(errorMessage);
            confirmed = false;
            });
        return [confirmed, errorMessage];
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
                    address: organization.address, 
                    country: organization.country,
                    city: organization.city,
                    state: organization.state,
                    zip: organization.zip,
                    website: organization.website,
                    phone: organization.phone,
                    description: organization.description,
                    username: organization.username
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
        return [confirmed, err];
    }

    async fireAdminCreateUser(user) {
        admin.auth().createUser({
            email: user.email,
            password: user.password
        }) .then(function(createdUser){
            return createdUser.uid;
        }) .catch(function(error){
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

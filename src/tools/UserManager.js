var firebase = require("firebase/app");
var bodyParser = require('body-parser')

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");
require('firebase/database');
//Added by Ben
var firebase = require('firebase');
//var firebaseui = require('firebaseui');

const firebaseConfig = {
    apiKey: "AIzaSyDTrW7v8-3KL-_ScJSGQ5Oo_8k1-OIYozk",
    authDomain: "hemaa-club-finder.firebaseapp.com",
    databaseURL: "https://hemaa-club-finder.firebaseio.com",
    projectId: "hemaa-club-finder",
    storageBucket: "hemaa-club-finder.appspot.com",
    messagingSenderId: "801602412728",
    appId: "1:801602412728:web:5819f173fa2064ae3cd44d",
    measurementId: "G-HXKD4SJ6TX"
};

firebase.initializeApp(firebaseConfig);

class UserManager {
    user;
    constructor() {
        this.user = null;
    }
    
    async fireSignIn(email, password) {
        var confirmed;
        await firebase.auth().signInWithEmailAndPassword(email, password).then(()=> {
            this.user = firebase.auth().currentUser;
            console.log("yerrrr");
            confirmed = true;
        }
            ).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
            confirmed = false;
            });
        return confirmed;
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
            var errorCode = error.code;
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
            //console.log('////////')
            //console.log(user);

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
            //res.sendStatus(200);
            })
            .catch(function (error) {
            console.log(error);
            //res.sendStatus(400);
            })
            confirmed = true;
            err = "Ok.";
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            //res.send({error : error.code, message: error.message})
            console.log(errorMessage);
            confirmed = false;
            err = errorMessage;
        });
        return [confirmed, err];
    }

    get getUser() {
            return this.user;
    }

    set setUser(user) {
        this.user = user;
    }
}

var userManager = new UserManager();

export default userManager

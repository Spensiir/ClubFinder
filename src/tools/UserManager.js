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

    get getUser() {
            return this.user;
    }

    set setUser(user) {
        this.user = user;
    }
}

var userManager = new UserManager();

export default userManager

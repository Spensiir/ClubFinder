## Install Guide HEMAA Club Finder 1.0

### Pre-requisites
##### Setting up a server
In order to run the application on a website, you must first have a server to run the application. 
Cloud server can be purchased from Amazon Web Services (https://aws.amazon.com/ec2/?hp=tile&so-exp=below) 
or Google Cloud Platform (https://cloud.google.com/compute). After obtaining a server, you have to register your domain
name with your server. You can follow these instructions
based off your chosen cloud platform (for Google Cloud Platform see https://cloud.google.com/dns/docs/quickstart and
for Amazon Web Services see https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-to-ec2-instance.html).

##### Installing NodeJS on the server
This application utilizes NodeJS. To install NodeJS on your server, you can download the
software from the following website: https://nodejs.org/en/ .

##### Installing Nodemon on the server
To install Nodemon on your server, you can follow the instructions at the following 
website: https://www.npmjs.com/package/nodemon .

### Download 
On your server's command line, enter the following:
```shell 
git clone https://github.com/Spensiir/ClubFinder.git
```

### Dependencies
##### Installing dependencies
After cloning the github repository, run the following commands:

```shell
cd /club-finder
npm install
```
##### Installing Firebase Dependency
```shell
npm install --save firebase
```
##### Obtaining API Keys
API keys are needed for Google Firebase, Google Maps API, and Google Geocoding API 
(see https://cloud.google.com/docs/authentication/api-keys).

### Running Application
To start the application on the server, enter the following commands:
```shell 
cd [PATH OF club-finder DIRECTORY]/club-finder
npm start
```
*** The code above starts the client-side of the application ****

In order to run the server-side, you must first create a file titled 'config.js'
in the /club-finder/src/tools directory. In the file, you should paste the 
following code and enter all API keys and additional configurations for your 
application.

```js
const config = {
    API_KEY : "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", //API key for Google Maps API (see https://developers.google.com/maps/documentation/javascript/get-api-key)
    SERVER_URL : "http://exampleserver.com:XXXX" // url of host server
};

var firebaseConfig = {
  apiKey: "api-key",
  authDomain: "project-id.firebaseapp.com",
  databaseURL: "https://project-id.firebaseio.com",
  projectId: "project-id",
  storageBucket: "project-id.appspot.com",
  messagingSenderId: "sender-id",
  appId: "app-id",
  measurementId: "G-measurement-id",
}; // firebase security configurations specified in firebase console
// for more info see https://firebase.google.com/docs/web/setup#config-object

var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");
require('firebase/database');

firebase = require('firebase');
firebase = firebase.initializeApp(firebaseConfig);

export {config, firebaseConfig, firebase};
```
One more file must be edited in order for the software to run without errors. Please enter the API key for
the Google Geocoding API in the keys.js file located in /club-finder/src/server/keys.js.
```js
module.exports= {
    'GEOCODE_API_KEY' : 'XXXXXXXXXXXXXXXXXXXXXXXXXX' // Google Geocode API key
};
```
After adding the config.js and editing the keys.js file, you are now ready to to start the server
using the following commands:

```shell
cd /club-finder/src/server
nodemon server.js
```
The users of your application can now access the web application at the 
domain name you registered your server under.

## Release Notes Version 1.0

##### New Features
* Users can now see clubs closest to their location using a sorted list
* Users can click on clubs to view club details and contact information
* Users with accounts can now reset their passwords
* Users can search clubs by entering club names or addresses in search bar

##### Bug Fixes
* Fixed address formatting when adding new clubs
* Fixed country selection so users can add their country to addresses
* Removed admins from being displayed in the list of organizations
* Fixed editing a club so it edits the proper club

##### Known Bugs
* Map can be moved out of bounds






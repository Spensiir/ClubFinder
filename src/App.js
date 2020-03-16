import React from 'react';
import "./css/app.css"
import "./css/navigationBar.css";
import SimpleMap from "./components/Map";
import Signin from './components/Signin.js';
import OrgRegistration from './components/OrgRegistration.js';
import Directory from './components/Directory.js';
import locationManager from "./managers/LocationManager.js"
import {userManager} from "./managers/UserManager";

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      logButton:
      <div className="App-header2">
      <button onClick={openSignin}>Sign In</button>
      <button style={{borderRight:"thin solid gray"}} onClick={openRegister}>Register</button>
      </div>,
      username:"user",
        markers : [],
        selected : null,
        isAdmin : null
      };
    this.usernameCallback = this.usernameCallback.bind(this);
    this.onClickSubmit = this.onClickSubmit.bind(this);
    this.onClickRegister = this.onClickRegister.bind(this);
    this.selectedCallback = this.selectedCallback.bind(this);
    this.setAdmin = this.setAdmin.bind(this);
  }

  async componentDidMount() {
    this.setState({
        markers: await locationManager.updateLocations()
    });
  }

  onClickSubmit = async () => {
    openSignin();
  };

  onClickRegister = () => {
    openRegister();
  };

  onClickSignOut = async () => {
    await userManager.fireSignOut();
    this.setState({
        markers: await locationManager.updateLocations()
    });

    this.setState(
      {
        username: "user",
        logButton: 
        <div className="App-header2">
          <button onClick={openSignin}>Sign In</button>
          <button style={{borderRight:"thin solid gray"}} onClick={openRegister}>Register</button>
        </div>});
  };

  setAdmin = (isAdminStr) => {
    if(isAdminStr === false) {
      this.setState({
        isAdmin: false
      });
    } else {
      this.setState({
        isAdmin: true
      });
    }
  };


  usernameCallback = async (usernameData) => {
    this.setState({
        markers: await locationManager.updateLocations()
    });
    this.setState({username: usernameData}, async () => this.setState(
      { logButton:
        <div className="App-header2">
        <button className="signout" onClick={this.onClickSignOut}>Sign Out</button>
        </div>}));
  };

selectedCallback = (markerFromMap) => {
    if (markerFromMap) {
      markerFromMap.color = "yellow";
    }  
    this.setState({selected : markerFromMap});
};

  render() {
    
    var signedIn;
    var adminSignedIn;
    var notOrg;
    if (this.state.username !== "user" && this.state.isAdmin) {
      signedIn = "none";
      adminSignedIn = "block";
      notOrg = "block";
    } else if (this.state.username !== "user") {
      signedIn = "block";
      adminSignedIn = "none";
      notOrg = "none";
    } else {
      signedIn = "none";
      adminSignedIn = "none";
      notOrg = "block";
    }

    return (
      <div className="App">   
        <div className="shadow" id="shadow"/>
          <div className="App-header">
            <h1>HEMAA Club Finder</h1>
            <h2 style={{display : signedIn}}>Welcome, {this.state.username}</h2>
          </div>
          {this.state.logButton}
          <div className="topnav" id="topNav" style={{display : signedIn}}>
          </div>
          <div className="topnav" id="topNav2" style={{display : adminSignedIn}}>
            <button onClick={openRegister}>Add Organization</button>
          </div>
          <Signin setAdmin={this.setAdmin.bind(this)} callbackFromApp={this.usernameCallback} onClickSubmit={this.onClickSubmit} onClickSignOut = {this.onClickSignOut}/>
          <Directory currMarkers={this.state.markers} updateSelected={this.selectedCallback.bind(this)} currSelect={this.state.selected} callbackFromApp={this.usernameCallback}/>
          <SimpleMap currMarkers={this.state.markers} updateSelected={this.selectedCallback.bind(this)} currSelect={this.state.selected}/>
          <OrgRegistration callbackFromApp={this.usernameCallback}/>
      </div>
    )
  };
}

function openSignin() {
  document.getElementById("SigninForm").style.display = "block";
  document.getElementById("shadow").style.display = "block";
  document.getElementById("details").style.display = "none";
}

function openRegister() {
  document.getElementById("OrgForm").style.display = "block";
  document.getElementById("shadow").style.display = "block";
  document.getElementById("details").style.display = "none";
}

export default App;

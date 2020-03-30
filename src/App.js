import React from 'react';
import "./css/app.css"
import "./css/navigationBar.css";
import AddForm from './components/AddForm.js';
import EditForm from "./components/EditForm.js";
import SimpleMap from "./components/Map";
import Signin from './components/Signin.js';
import OrgRegistration from './components/OrgRegistration.js';
import Directory from './components/Directory.js';
import locationManager from "./managers/LocationManager.js"
import {userManager} from "./managers/UserManager";
import Profile from './components/Profile.js';
import { organizationManager } from './managers/OrganizationManager';

var checkMove = 0;

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      logButton:
      <div className="App-header2" id="mainHeader2">
      <button id="signInButton" onClick={this.openSignin}><b>Sign In</b></button>
      <button id="registerButton" style={{borderRight:"thin solid gray"}} onClick={this.openRegister}><b>Register</b></button>
      </div>,
      username:"user",
        markers : [],
        organizations : [],
        selected : null,
        isAdmin : null,
        user : userManager.getUser(),
        organization : organizationManager.getOrganization(),
      };
    this.usernameCallback = this.usernameCallback.bind(this);
    this.onClickSubmit = this.onClickSubmit.bind(this);
    this.onClickRegister = this.onClickRegister.bind(this);
    this.markerCallback = this.markerCallback.bind(this);
    this.removeMarker = this.removeMarker.bind(this);
    this.selectedCallback = this.selectedCallback.bind(this);
    this.editMarkerCallback = this.editMarkerCallback.bind(this);
    this.setAdmin = this.setAdmin.bind(this);
    this.editOrganizationCallback = this.editOrganizationCallback.bind(this);
  }

  async componentDidMount() {
    this.setState({
        markers: await locationManager.updateLocations(),
        organizations: await organizationManager.updateOrganizations()
    });
  }

  onClickSubmit = async () => {
    this.openSignin();
    this.closeEverything();
  };

  onClickRegister = () => {
    this.openRegister();
    this.closeEverything();
  };

  onClickSignOut = async () => {
    await userManager.fireSignOut();
    this.setState({
        markers: await locationManager.updateLocations()
    });

    this.closeEverything();
    this.signOutClosing();
    this.setState(
      {
        username: "user",
        logButton: 
        <div className="App-header2" id="mainHeader2">
          <button id="signInButton" onClick={this.openSignin}><b>Sign In</b></button>
          <button id="registerButton" style={{borderRight:"thin solid gray"}} onClick={this.openRegister}><b>Register</b></button>
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

  usernameCallback = async (username, password) => {
    var confirmed = await userManager.fireSignIn(username, password);
        if (confirmed[0]) {
            window.currUser = username;
            this.setAdmin(confirmed[2]);
            this.onClickSubmit();
        } else {
            return confirmed;
        }
    this.setState({
        markers: await locationManager.updateLocations(),
        user: userManager.getUser(),
        organizations: await organizationManager.updateOrganizations(),
    });
    console.log("*" + this.state.user.email);
    console.log("*" + this.state.organization.website);

    this.setState({username: username}, async () => this.setState(
      { logButton:
        <div className="App-header2" id="mainHeader2">
        <button id="signoutButton" className="signout" onClick={this.onClickSignOut}><b>Sign Out</b></button>
        <button id="profileButton" style={{borderRight:"thin solid gray"}} onClick={this.openProfile}><b>Profile</b></button>
        </div>}));
        return confirmed;
  };

  markerCallback = async (markerFromForm) => {
    await locationManager.addLocation(markerFromForm);
    this.setState({markers : await locationManager.updateLocations(), selected: markerFromForm });
  };

  editMarkerCallback = async (markerFromForm) => {
    await locationManager.editLocation(this.state.selected, markerFromForm);
    this.setState({markers : await locationManager.updateLocations(), selected: markerFromForm });
  };

  editOrganizationCallback = async (orgFromForm) => {
    await organizationManager.editOrganization(this.state.organization, orgFromForm);
    this.setState({organization : orgFromForm});
  }

  organizationCallback = async (orgClicked) => {
    console.log(orgClicked);
    var newlocs = await locationManager.getClickedLocations(orgClicked)
    console.log(newlocs);
    this.setState({
      markers: newlocs
    })
    
  }

  selectedCallback = (markerFromMap) => {
    if (markerFromMap) {
      markerFromMap.color = "yellow";
    }  
    this.setState({selected : markerFromMap});
  };

  async removeMarker() {
    await locationManager.removeLocation(this.state.selected);
    this.setState({markers : await locationManager.updateLocations(), selected: null});
  };

  render() {
    var signedIn;
    var adminSignedIn;
    if (this.state.username !== "user" && this.state.isAdmin) {
      signedIn = "none";
      adminSignedIn = "block";
    } else if (this.state.username !== "user") {
      signedIn = "block";
      adminSignedIn = "none";
    } else {
      signedIn = "none";
      adminSignedIn = "none";
    }

    return (
      <div>
        <div className="shadow" id="shadow"/>
          <div className="App-header" id="mainHeader">
            <h1 id="title">HEMAA Club Finder</h1>
            <h2 id="welcome" style={{display : signedIn}}>Welcome, {this.state.username}</h2>
            <button onClick={e => moveDirectory()} id="mover" className="btn2"><i className="fas fa-caret-left" id="arrow"></i></button>
          </div>
          {this.state.logButton}
          <div className="topnav" id="topNav" style={{display : signedIn}}>
          </div>
          <div className="topnav" id="topNav2" style={{display : adminSignedIn}}>
            <button onClick={e => this.openRegister}>Add Organization</button>
          </div>
          <OrgRegistration callbackFromApp={this.usernameCallback}/>
          <Signin setAdmin={this.setAdmin.bind(this)} callbackFromApp={this.usernameCallback} onClickSubmit={this.onClickSubmit} onClickSignOut = {this.onClickSignOut}/>
          <Directory organizations={this.state.organizations} currMarkers={this.state.markers} updateSelected={this.selectedCallback.bind(this)} currSelect={this.state.selected} updateMarkers={this.organizationCallback.bind(this)}/>
          <SimpleMap currMarkers={this.state.markers} updateSelected={this.selectedCallback.bind(this)} currSelect={this.state.selected}/>
          <Profile currentUser = {this.state.user} currentOrg = {this.state.organization} updateOrg = {this.editOrganizationCallback.bind(this)} />
          <AddForm updateMarkers={this.markerCallback.bind(this)}/>
          <EditForm updateMarkers={this.editMarkerCallback.bind(this)} initialSelect={this.state.selected} />
      </div>
    )
  };

  closeEverything () {
    document.getElementById("details").style.display = "none";
    this.setState({selected: null});
  }

  openSignin() {
    document.getElementById("SigninForm").style.display = "block";
    document.getElementById("shadow").style.display = "block";
  }

  openRegister() {
    document.getElementById("OrgForm").style.display = "block";
    document.getElementById("shadow").style.display = "block";
  }

  openProfile() {
    document.getElementById("ProfileForm").style.display = "block";
    document.getElementById("shadow").style.display = "block";
}

  openAdminRegistration() {
    document.getElementById("AdminForm").style.display = "block";
    document.getElementById("shadow").style.display = "block";
}

  signOutClosing() {
    document.getElementById("nonOrgButtons").style.display = "inline";
    document.getElementById("orgButtons").style.display = "none";
    document.getElementById("addPlus").style.display = "none";
    document.getElementById("clubs").className = "btn1 active";
    document.getElementById("orgs").className = "btn1";
  }
}

function moveDirectory() {
  if (checkMove === 0) {
    document.getElementById("mainHeader").style.marginLeft = "-380px";
    document.getElementById("mainHeader2").style.marginLeft = "-380px";
    document.getElementById("searchInput").style.marginLeft = "-380px";
    document.getElementById("UL").style.marginLeft = "-380px";
    document.getElementById("UL2").style.marginLeft = "-380px";
    document.getElementById("clubs").style.marginLeft = "-380px";
    document.getElementById("clubs2").style.marginLeft = "-380px";
    document.getElementById("mover").style.marginLeft = "30px";
    document.getElementById("details").style.marginLeft = "-350px";
    checkMove = 1;
  } else {
    document.getElementById("mainHeader").style.marginLeft = "0px";
    document.getElementById("mainHeader2").style.marginLeft = "0px";
    document.getElementById("searchInput").style.marginLeft = "0px";
    document.getElementById("UL").style.marginLeft = "0px";
    document.getElementById("UL2").style.marginLeft = "0px";
    document.getElementById("clubs").style.marginLeft = "0px";
    document.getElementById("clubs2").style.marginLeft = "0px";
    document.getElementById("mover").style.marginLeft = "0px";
    document.getElementById("details").style.marginLeft = "0px";
    checkMove = 0;
  }
}

export default App;

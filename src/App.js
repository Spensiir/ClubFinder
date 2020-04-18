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
import { moveDirectory } from './tools/moveDirectory'

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
        selected : null,
        isAdmin : null,
        user : null,
        organization : null,
        organizations: [],
        adminSelectedOrg : null
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
    this.eraseOrganizationCallback = this.eraseOrganizationCallback.bind(this);
  }

  async componentDidMount() {
    await navigator.geolocation.getCurrentPosition(async position => {
        this.setState({currLat: position.coords.latitude, currLng: position.coords.longitude});
        this.setState({
            markers: await locationManager.updateLocations(null, this.state.isAdmin, this.state.currLat, this.state.currLng),
            organizations : await organizationManager.updateOrganizations()
        });
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

  updateAdminSelectedOrg(organization){
    console.log(organization.email)
    this.setState({adminSelectedOrg: organization});
  }

  equalMarkers(markers1, markers2) {
    if (markers1 === null && markers2 !== null) {
        return false;
    }
    if (markers1 !== null && markers2 === null) {
        return false;
    }

    if (markers1 === null && markers2 === null) {
        return true;
    }
    if (markers1.length !== markers2.length) {
        return false;
    }

    for (let i=0; i < markers1.length; i++) {
        if (markers1[i].name !== markers2[i].name) return false;
        if (markers1[i].city !== markers2[i].city) return false;
        if (markers1[i].address !== markers2[i].address) return false;
        if (markers1[i].contact !== markers2[i].contact) return false;
        if (markers1[i].color !== markers2[i].color) return false;
        if (markers1[i].description !== markers2[i].description) return false;
        if (markers1[i].email !== markers2[i].email) return false;
        if (markers1[i].lat !== markers2[i].lat) return false;
        if (markers1[i].lng !== markers2[i].lng) return false;
        if (markers1[i].orgEmail !== markers2[i].orgEmail) return false;
        if (markers1[i].phone !== markers2[i].phone) return false;
        if (markers1[i].state !== markers2[i].state) return false;
        if (markers1[i].weapons !== markers2[i].weapons) return false;
        if (markers1[i].website!== markers2[i].website) return false;
        if (markers1[i].zip !== markers2[i].zip) return false;
    }
    return true;
    }

    equalOrgs(orgs1, orgs2) {
      if (orgs1 === null && orgs2 !== null) {
          return false;
      }
      if (orgs1 !== null && orgs2 === null) {
          return false;
      }
  
      if (orgs1 === null && orgs2 === null) {
          return true;
      }
      if (orgs1.length !== orgs2.length) {
          return false;
      }
  
      for (let i=0; i < orgs1.length; i++) {
          if (orgs1[i].name !== orgs2[i].name) return false;
          if (orgs1[i].username !== orgs2[i].username) return false;
          if (orgs1[i].id !== orgs2[i].id) return false;
          if (orgs1[i].email !== orgs2[i].email) return false;
          if (orgs1[i].website !== orgs2[i].website) return false;
      }
      return true;
      }

  onClickSignOut = async () => {
    await userManager.fireSignOut();
    this.setState({
        markers: await locationManager.updateLocations(null, this.state.isAdmin, this.state.currLat, this.state.currLng),
        isAdmin : false
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
          if(isAdminStr === "True") {
              this.setState({
                  isAdmin: true
              });
          } else {
              this.setState({
                  isAdmin: false
              });
          }
      };

  usernameCallback = async (usernameData) => {
    this.setState({
        markers: await locationManager.updateLocations(userManager.getUser().email, this.state.isAdmin, this.state.currLat, this.state.currLng),
        user: userManager.getUser(),
        organization: await organizationManager.getOrganization(userManager.getUser().uid),
        organizations: await organizationManager.updateOrganizations()
    });
    if (!this.state.isAdmin) {
      this.setState({username: usernameData}, async () => this.setState(
        { logButton:
          <div className="App-header2" id="mainHeader2">
          <button id="signoutButton" className="signout" onClick={this.onClickSignOut}><b>Sign Out</b></button>
          <button id="profileButton" style={{borderRight:"thin solid gray"}} onClick={this.openProfile}><b>Profile</b></button>
          </div>}));
    } else {
      this.setState({username: usernameData}, async () => this.setState(
        { logButton:
          <div className="App-header2" id="mainHeader2">
          <button id="signoutButton" className="signout" onClick={this.onClickSignOut}><b>Sign Out</b></button>
          </div>}));
    }
  };

  markerCallback = async (markerFromForm) => {
    await locationManager.addLocation(markerFromForm);
    this.setState({markers : await locationManager.updateLocations(userManager.getUser().email, this.state.isAdmin, this.state.currLat, this.state.currLng), selected: markerFromForm });
  };

  editMarkerCallback = async (markerFromForm) => {
    await locationManager.editLocation(this.state.selected, markerFromForm);
    this.setState({markers : await locationManager.updateLocations(userManager.getUser().email, this.state.isAdmin, this.state.currLat, this.state.currLng), selected: markerFromForm });
    this.selectedCallback(markerFromForm);
};

  organizationCallback = async (email) => {       
    this.setState({markers : await locationManager.updateLocations(email, this.state.isAdmin, this.state.currLat, this.state.currLng)});    
    this.toggleResetLocations(); 
  }

  editOrganizationCallback = async (orgFromForm) => {
    if (this.state.isAdmin) {
      await organizationManager.editOrganization(this.state.adminSelectedOrg, orgFromForm);
      this.setState({organizations: await organizationManager.updateOrganizations()});
    } else {
      await organizationManager.editOrganization(this.state.organization, orgFromForm);
      this.setState({organization : orgFromForm, organizations: await organizationManager.updateOrganizations()});
    }
  };

  eraseOrganizationCallback = async (org) => {
    await organizationManager.eraseOrganization(org);
    this.setState({
      organizations: await organizationManager.updateOrganizations(),
      markers: await locationManager.updateLocations(null, this.state.isAdmin, this.state.currLat, this.state.currLng),
      selected : null
    });
  };

  resetLocations = async() => {
    this.setState({
      markers: await locationManager.updateLocations(null, this.state.isAdmin, this.state.currLat, this.state.currLng)
    });
    this.toggleResetLocations();
  }
  selectedCallback = (markerFromMap) => {
    if (markerFromMap) {
      markerFromMap.color = "yellow";
    }  
    this.setState({selected : markerFromMap});
  };

  async removeMarker() {
    await locationManager.removeLocation(this.state.selected);
    this.setState({markers : await locationManager.updateLocations(userManager.getUser().email, this.state.isAdmin, this.state.currLat, this.state.currLng), selected: null});
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
            <button onClick={e => moveDirectory()} id="mover" className="btn2"><i className="fas fa-caret-left" style={{transition:"0.5s"}} id="arrow"></i></button>
          </div>
          {this.state.logButton}
          <div className="topnav" id="topNav" style={{display : signedIn}}>
          </div>
          <div className="topnav" id="topNav2" style={{display : adminSignedIn}}>
          </div>
          <OrgRegistration userManager={userManager} setAdmin={this.setAdmin.bind(this)} callbackFromApp={this.usernameCallback}/>
          <Signin setAdmin={this.setAdmin.bind(this)} callbackFromApp={this.usernameCallback} onClickSubmit={this.onClickSubmit} onClickSignOut = {this.onClickSignOut}/>
          <Directory isAdmin={this.state.isAdmin} eraseOrganization={this.eraseOrganizationCallback.bind(this)} equalOrgs={this.equalOrgs.bind(this)} updateAdminSelectedOrg={this.updateAdminSelectedOrg.bind(this)} openProfile={this.openProfile.bind(this)} isAdmin={this.state.isAdmin} equalMarkers={this.equalMarkers.bind(this)} updateMarkers={this.organizationCallback.bind(this)} organizations={this.state.organizations} currMarkers={this.state.markers} updateSelected={this.selectedCallback.bind(this)} currSelect={this.state.selected}/>
          <SimpleMap resetLocations = {this.resetLocations.bind(this)} equalMarkers={this.equalMarkers.bind(this)} removeMarker={this.removeMarker.bind(this)} currMarkers={this.state.markers} updateSelected={this.selectedCallback.bind(this)} currSelect={this.state.selected}/>
          <Profile adminSelectedOrg={this.state.adminSelectedOrg} isAdmin={this.state.isAdmin} currentUser={this.state.user} currentOrg={this.state.organization} updateOrg={this.editOrganizationCallback.bind(this)}/>
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

  toggleResetLocations() {
    if (document.getElementById("resetLocations").style.display == "block") {
        document.getElementById("resetLocations").style.display = "none";
    }
    else if (document.getElementById("resetLocations").style.display == "none") {
        document.getElementById("resetLocations").style.display = "block";
    }
  }
}

export default App;

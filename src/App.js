import React from 'react';
import "./css/app.css"
import AddForm from "./components/AddForm";
import EditForm from "./components/EditForm";
import SimpleMap from "./components/Map";
import Signin from './components/Signin.js';
import OrgRegistration from './components/OrgRegistration.js';
import AdminRegistration from './components/AdminRegistration.js';
import SearchBar from './components/SearchBar.js';
import locationManager from "./managers/LocationManager.js"
import {userManager} from "./managers/UserManager";

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      username:"user",
      logButton: 
        <div className="sign-in">
          <label>Sign in to add new club listing</label>
          <button onClick={openSignin}>Sign In</button>
          <button onClick={openRegister}>Register</button>
        </div>,
        markers : [],
        selected : null
      };
    this.usernameCallback = this.usernameCallback.bind(this);
    this.onClickSubmit = this.onClickSubmit.bind(this);
    this.onClickRegister = this.onClickRegister.bind(this);
    this.markerCallback = this.markerCallback.bind(this);
    this.removeMarker = this.removeMarker.bind(this);
    this.selectedCallback = this.selectedCallback.bind(this);
    this.editMarkerCallback = this.editMarkerCallback.bind(this);
  }

  async componentDidMount() {
    this.setState({
        markers: await locationManager.updateLocations()
    });
  }

  onClickSubmit = async () => {
    openSignin();
    this.setState(
        {logButton:
              <div className="sign-in">
                <label>Welcome, {this.state.username}</label>
                <button onClick={this.onClickSignOut}>Sign out</button>
              </div>});
  };

  onClickRegister = () => {
    openRegister();
    this.setState(
      {logButton: 
      <div className="sign-in">
        <label>Welcome, {this.state.username}</label>
        <button onClick={this.onClickSignOut}>Sign out</button>
      </div>});
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
        <div className="sign-in">
          <label>Sign in to add new club listing</label>
          <button onClick={openSignin}>Sign In</button>
          <button onClick={openRegister}>Register</button>
      </div>});
  };

  usernameCallback = async (usernameData) => {
    this.setState({
        markers: await locationManager.updateLocations()
    });
    this.setState({username: usernameData}, async () => this.setState(
      { logButton:
      <div className="sign-in">
        <label>Welcome, {this.state.username}</label>
        <button onClick={this.onClickSignOut}>Sign out</button>
      </div>}));
  };

  markerCallback = async (markerFromForm) => {
    await locationManager.addLocation(markerFromForm);
    this.setState({markers : await locationManager.updateLocations(), selected: markerFromForm });
};


editMarkerCallback = async (markerFromForm) => {
    await locationManager.editLocation(this.state.selected, markerFromForm);
    this.setState({markers : await locationManager.updateLocations(), selected: markerFromForm });
};

selectedCallback = (markerFromMap) => {
    this.setState({selected : markerFromMap});
};

async removeMarker() {
    await locationManager.removeLocation(this.state.selected);
    this.setState({markers : await locationManager.updateLocations(), selected: null});

};

  render() {
    var editDisabled = false;
    if (this.state.selected !== null) {
        editDisabled = true;
    }
    
    var signedIn = "none";
    if (this.state.username !== "user") {
      signedIn = "block";
    }

    return (
      <div className="App">   
        <div className="shadow" id="shadow"/>
          <header className="App-header">
            <div className="title">
              <h1>HEMAA Club Finder</h1>
            </div>
            {this.state.logButton}
          </header>   
          <div className="management" style={{display : signedIn}}>
            <button onClick={openAdminRegistration}>Register Admin</button>
            <button onClick={openAddForm}>Add</button>
            <button disabled={!editDisabled} onClick={openEditForm}>Edit</button>
            <button onClick={this.removeMarker}>Remove</button>
          </div>
          <Signin callbackFromApp={this.usernameCallback} onClickSubmit={this.onClickSubmit} onClickSignOut = {this.onClickSignOut}/>
          <SimpleMap currMarkers={this.state.markers} updateSelected={this.selectedCallback.bind(this)} initialSelect={this.state.selected}/>
          <AddForm updateMarkers={this.markerCallback.bind(this)}/>
          <EditForm updateMarkers={this.editMarkerCallback.bind(this)} initialSelect={this.state.selected} />
          <OrgRegistration callbackFromApp={this.usernameCallback}/>
          <AdminRegistration callbackFromApp={this.usernameCallback}/>
          <SearchBar/>
      </div>
    )};
}

function openSignin() {
  document.getElementById("SigninForm").style.display = "block";
  document.getElementById("shadow").style.display = "block";
}

function openRegister() {
  document.getElementById("OrgForm").style.display = "block";
  document.getElementById("shadow").style.display = "block";
}

function openAdminRegistration() {
  document.getElementById("AdminForm").style.display = "block";
  document.getElementById("shadow").style.display = "block";
}

function openAddForm() {
  document.getElementById("AddFormDiv").style.display = "block";
  document.getElementById("shadow").style.display = "block";
}

function openEditForm() {
  document.getElementById("EditFormDiv").style.display = "block";
  document.getElementById("shadow").style.display = "block";
}

export default App;

import React from 'react';
import Header from './components/Header.js';
import "./css/app.css"
import AddForm from "./components/AddForm";
import EditForm from "./components/EditForm";
import SimpleMap from "./components/Map";
import Signin from './components/Signin.js';
import OrgRegistration from './components/OrgRegistration.js';
import {addOrganization} from './tools/organization.js'
import userManager from "./tools/UserManager.js"
import { addLocation, editLocation, removeLocation } from './tools/marker.js';



class App extends React.Component {
  constructor (props) {
    super(props)
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

  onClickSubmit = () => {
    openSignin();
    this.setState(
      {logButton: 
      <div className="sign-in">
        <label>Welcome, {this.state.username}</label>
        <button onClick={this.onClickSignOut}>Sign out</button>
      </div>});
  }

  onClickRegister = () => {
    openRegister();
    this.setState(
      {logButton: 
      <div className="sign-in">
        <label>Welcome, {this.state.username}</label>
        <button onClick={this.onClickSignOut}>Sign out</button>
      </div>});
  }

  onClickSignOut = () => {
    console.log("here");
    this.setState(
      {
        username: "user",
        logButton: 
        <div className="sign-in">
          <label>Sign in to add new club listing</label>
          <button onClick={openSignin}>Sign In</button>
          <button onClick={openRegister}>Register</button>
      </div>});
  }

  usernameCallback = (usernameData) => {
    this.setState({username: usernameData}, () => this.setState(
      {logButton: 
      <div className="sign-in">
        <label>Welcome, {this.state.username}</label>
        <button onClick={this.onClickSignOut}>Sign out</button>
      </div>}));
    
  }

  markerCallback = async (markerFromForm) => {
    let newMarkers = this.state.markers;
    console.log(addLocation);
    await addLocation(markerFromForm).then( res => {
      console.log(res);
    });
    newMarkers.push(markerFromForm);
    this.setState({markers : newMarkers, selected: markerFromForm });
};


editMarkerCallback = async (markerFromForm) => {
    this.removeMarker();
    await this.markerCallback(markerFromForm);
    console.log([markerFromForm.lat, markerFromForm.lng]);
};

selectedCallback = (markerFromMap) => {
    this.setState({selected : markerFromMap});
};

removeMarker() {
    let oldMarkers = this.state.markers;

    if (this.state.selected == null) {
        return;
    }

    for (var i = 0; i < oldMarkers.length; i++) {
        if (oldMarkers[i] === this.state.selected) {
            var temp = oldMarkers[oldMarkers.length - 1];
            oldMarkers[oldMarkers.length - 1] = oldMarkers[i];
            oldMarkers[i] = temp;
            oldMarkers.pop();
        }
    }
    removeLocation(this.state.selected);
    this.setState({markers : oldMarkers, selected: null});

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
            <button onClick={openAddForm}>Add</button>
            <button disabled={!editDisabled} onClick={openEditForm}>Edit</button>
            <button onClick={this.removeMarker}>Remove</button>
          </div>
          <Signin callbackFromApp={this.usernameCallback} onClickSubmit={this.onClickSubmit} onClickSignOut = {this.onClickSignOut}/>
          <SimpleMap currMarkers={this.state.markers} updateSelected={this.selectedCallback.bind(this)} initialSelect={this.state.selected}/>
          <AddForm updateMarkers={this.markerCallback.bind(this)}/>
          <EditForm updateMarkers={this.editMarkerCallback.bind(this)} initialSelect={this.state.selected} />
          <OrgRegistration callbackFromApp={this.usernameCallback}/>
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

function openAddForm() {
  document.getElementById("AddFormDiv").style.display = "block";
  document.getElementById("shadow").style.display = "block";
}

function openEditForm() {
  document.getElementById("EditFormDiv").style.display = "block";
  document.getElementById("shadow").style.display = "block";
}

export default App;

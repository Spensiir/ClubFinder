import React from 'react';
import Header from './components/Header.js';
import "./css/app.css"
import AddForm from "./components/AddForm";
import EditForm from "./components/EditForm";
import SimpleMap from "./components/Map";
import Signin from './components/Signin.js';



class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username:"user",
      logButton: 
        <div className="sign-in">
          <label>Sign in to add new club listing</label>
          <button onClick={openSignin}>Sign In</button>
        </div>,
        markers : [], 
        selected : null
      };
    this.usernameCallback = this.usernameCallback.bind(this);
    this.onClickSubmit = this.onClickSubmit.bind(this);
    this.markerCallback = this.markerCallback.bind(this);
    this.removeMarker = this.removeMarker.bind(this);
    this.selectedCallback = this.selectedCallback.bind(this);
    this.editMarkerCallback = this.editMarkerCallback.bind(this);
  }

  onClickSubmit = () => {
    openSignin();
    console.log("appusername:", this.state.username);
    this.setState(
      {logButton: 
      <div className="sign-in">
        <label>Welcome, {this.state.username}</label>
        <button onClick={this.onClickSignOut}>Sign out</button>
      </div>});
  }

  onClickSignOut = () => {
    this.setState(
      {logButton: 
        <div className="sign-in">
          <label>Sign in to add new club listing</label>
          <button onClick={this.onClickSubmit}>Sign In</button>
        </div>});
  }

  usernameCallback = (usernameData) => {
    console.log("usernamedata:", usernameData)
    this.setState({username: usernameData}, () => this.setState(
      {logButton: 
      <div className="sign-in">
        <label>Welcome, {this.state.username}</label>
        <button onClick={this.onClickSignOut}>Sign out</button>
      </div>}));
    
  }

  markerCallback = (markerFromForm) => {
    let newMarkers = this.state.markers;
    newMarkers.push(markerFromForm);
    this.setState({markers : newMarkers, selected: markerFromForm });
};

editMarkerCallback = (markerFromForm) => {
    this.removeMarker();

    let newMarkers = this.state.markers;
    newMarkers.push(markerFromForm);
    this.setState({markers : newMarkers, selected: markerFromForm});

};

selectedCallback = (markerFromMap) => {
    this.setState({selected : markerFromMap});
};

removeMarker() {
    let oldMarkers = this.state.markers;

    for (var i = 0; i < oldMarkers.length; i++) {
        if (oldMarkers[i] === this.state.selected) {
            var temp = oldMarkers[oldMarkers.length - 1];
            oldMarkers[oldMarkers.length - 1] = oldMarkers[i];
            oldMarkers[i] = temp;
        }
    }
    oldMarkers.pop();
    this.setState({markers : oldMarkers, selected: null});

};

  render() {
    var editDisabled = false;
        if (this.state.selected !== null) {
            editDisabled = true;
        }
    return (
      <div className="App">   
        <div className="shadow" id="shadow"/>
          <header className="App-header">
            <div className="title">
              <h1>HEMAA CLub Finder</h1>
            </div>
            {this.state.logButton}
          </header>   
          <div className="management">
            <button disabled={window.formOpen} onClick={openAddForm}>Add</button>
            <button disabled={!editDisabled} onClick={openEditForm}>Edit</button>
            <button disabled={window.formOpen} onClick={this.removeMarker}>Remove</button>
          </div>
          <Signin callbackFromApp={this.usernameCallback} onClickSubmit={this.onClickSubmit}/>
          <SimpleMap currMarkers={this.state.markers} updateSelected={this.selectedCallback.bind(this)} initialSelect={this.state.selected}/>
          <AddForm updateMarkers={this.markerCallback.bind(this)}/>
          <EditForm updateMarkers={this.editMarkerCallback.bind(this)} initialSelect={this.state.selected} />
      </div>
    )};
}


function openSignin() {
  document.getElementById("SigninForm").style.display = "block";
  document.getElementById("shadow").style.display = "block";
  window.formOpen = true;
}

function openAddForm() {
  document.getElementById("AddFormDiv").style.display = "block";
  document.getElementById("shadow").style.display = "block";
  window.formOpen = true;
}

function openEditForm() {
  document.getElementById("EditFormDiv").style.display = "block";
  document.getElementById("shadow").style.display = "block";
  window.formOpen = true;
}

export default App;

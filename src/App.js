import React from 'react';
import Header from './components/Header.js';
import Map from './components/Map.js';
import Signin from './components/Signin.js';
import "./css/app.css"


class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username:"user",
      logButton: 
        <div className="sign-in">
          <label>Sign in to add new club listing</label>
          <button onClick={openSignin}>Sign In</button>
        </div>
      };
    this.usernameCallback = this.usernameCallback.bind(this);
    this.onClickSubmit = this.onClickSubmit.bind(this);
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

  render() {
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
          <button>Add</button>
          <button>Edit</button>
          <button>Remove</button>
        </div>
          <Signin callbackFromApp={this.usernameCallback} onClickSubmit={this.onClickSubmit}/>
      </div>
    )};
}


function openSignin() {
  document.getElementById("SigninForm").style.display = "block";
  document.getElementById("shadow").style.display = "block";
  window.formOpen = true;
}

export default App;

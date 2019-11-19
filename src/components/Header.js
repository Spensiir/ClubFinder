import React from 'react';
import '../css/header.css';
import Signin from '../components/Signin.js'
import App from '../App.js'
window.formOpen = false;

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = { logButton : (
            <div className="sign-in">
                <label>Log in to add new club listings!</label>
                <button disabled={window.formOpen} onClick={this.onClick}>LOG IN</button>
            </div>),
            name: null,
            currentUser: this.props.usernameFromApp};
        this.onClick = this.onClick.bind(this);
    }

    static getDerivedFromProps(props, state) {
        console.log("check here");
        if (props.usernameFromApp !== state.currentUser) {
            console.log("check here");
            return {
                logButton : (<div className="sign-in">
                    <label>{this.state.currentUser}</label>
                    <button onClick={this.signOut}>LOG OUT</button>
                </div>)
            }; 
        }
        return {
            logButton : (<div className="sign-in">
                    <label>{this.state.currentUser}</label>
                    <button onClick={this.signOut}>LOG OUT</button>
                </div>)
        };
    }

    onClick = (event) => {
        openSignin();
    }

    signOut = () => {
        this.setState({ logButton : (<div className="sign-in">
                <p>Looking to add new clubs?</p>
                <button onClick={this.onClick}>LOG IN</button>
            </div>),
           name: null
        });
    }

    render () {
        return (
            <div className="header">
                <div className="title">
                    <h1>HEMAA Club Finder</h1>
                </div>
                    {this.state.logButton}
            </div>
        );
    }
}


function openSignin() {
    document.getElementById("SigninForm").style.display = "block";
    document.getElementById("shadow").style.display = "block";
    window.formOpen = true;
}

export default Header;

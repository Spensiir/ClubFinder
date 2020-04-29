import React from "react"
import "../css/signin.css"
import {userManager} from "../managers/UserManager.js"
import {firebase} from "../tools/config.js"

class Signin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {username: "", password: "", resetEmail: ""};
        this.submitSignin = this.submitSignin.bind(this);
    }

    setUsername(event) {
        this.setState({username: event.target.value});
    }
    setPassword(event) {
        this.setState({password: event.target.value});
    }
    setResetEmail(event) {
        this.setState({resetEmail: event.target.value});
    }
    async submitSignin(event) {
        event.preventDefault();
        var confirmed = await userManager.fireSignIn(this.state.username, this.state.password);

        if (confirmed[0]) {
            window.currUser = this.state.username;
            this.props.setAdmin(confirmed[2]);
            this.props.callbackFromApp(this.state.username);
            this.props.onClickSubmit();
            closeSignin();
        } else {
            alert(confirmed[1]);
        }
    }

    async submitReset(event) {
        event.preventDefault();
        firebase.auth().sendPasswordResetEmail(this.state.resetEmail).then(() => {
            console.log("email sent successfully");
        }).catch(function(error) {
            console.log(error.message);
        })
    }
    closeSignin(event) {
        closeSignin();
    }

    render () {
        return (
            <div>
                <div className="signinForm" id="SigninForm">
                    <form id="signinform" onSubmit={e=>this.submitSignin(e)}>
                        <h1>Sign In</h1>
                        <label><b>Email</b></label>
                        <input type="text" name="username" default={this.state.username} onChange={e=>this.setUsername(e)} required/>

                        <label><b>Password</b></label>
                        <input type="password" name="password" default={this.state.password} onChange={e=>this.setPassword(e)} required/>
                        
                        <br/>
                        <p onClick={this.openResetPassword}>Forgot Password?</p>
                        <button type="submit" className="submit">Submit</button>
                        <button type="text" className="submit" onClick={e=>this.closeSignin(e)}>Close</button>
                    </form>
                </div>
                <div style={{height:"250px"}}className="signinForm" id = "passwordReset">
                    <form id="passwordreset" onSubmit={e=>this.submitReset(e)}>
                    <h1>Forgot Password</h1>
                    <label><b>Email</b></label>
                    <input type="text" name="username" placeholder="Enter your account's email to reset your password" onChange={e=>this.setResetEmail(e)}></input>

                    <button type="submit" className="submit">Send Email</button>
                    <button type="text" className="submit" onClick={this.closeResetPassword}>Close</button>
                    </form>
                </div>
            </div>
        );
    }
    
    openResetPassword() {
        document.getElementById("passwordReset").style.display = "block";
        document.getElementById("SigninForm").style.display = "none";
    }

    closeResetPassword() {
        document.getElementById("passwordReset").style.display = "none";
        document.getElementById("SigninForm").style.display = "block";
    }
}
function closeSignin() {

    document.getElementById("SigninForm").style.display = "none";
    document.getElementById("shadow").style.opacity = "0";
    document.getElementById("shadow").style.height = "0";
    document.getElementById("signinform").reset();
    window.formOpen = false;
}

export default Signin
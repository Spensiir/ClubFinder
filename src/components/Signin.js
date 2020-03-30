import React from "react"
import "../css/signin.css"
import {userManager} from "../managers/UserManager.js"

class Signin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {username: "", password: ""};
        this.submitSignin = this.submitSignin.bind(this);
    }

    setUsername(event) {
        this.setState({username: event.target.value});
    }
    setPassword(event) {
        this.setState({password: event.target.value});
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
    closeSignin(event) {
        closeSignin();
    }

    render () {
        return (
            <div className="signinForm" id="SigninForm">
                <form id="signinform" onSubmit={e=>this.submitSignin(e)}>
                    <h1>Sign In</h1>
                    <label><b>Email</b></label>
                    <input type="text" name="username" default={this.state.username} onChange={e=>this.setUsername(e)} required/>

                    <label><b>Password</b></label>
                    <input type="password" name="password" default={this.state.password} onChange={e=>this.setPassword(e)} required/>
                    
                    <br/>
                    <button type="submit" className="submit">Submit</button>
                    <button type="text" className="submit" onClick={e=>this.closeSignin(e)}>Close</button>
                </form>
            </div>
        );
    }
}
function closeSignin() {

    document.getElementById("SigninForm").style.display = "none";
    document.getElementById("shadow").style.display = "none";
    document.getElementById("signinform").reset();
    window.formOpen = false;
}

export default Signin
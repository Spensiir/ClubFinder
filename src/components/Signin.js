import React from "react"
import "../css/signin.css"
import formOpen from "../App.js"
import Header from "../components/Header.js"
import userManager from "../tools/UserManager.js"

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
        console.log(confirmed);
        if (confirmed[0]) {
            window.currUser = this.state.username;
            this.props.callbackFromApp(this.state.username);
            console.log("signinusername:", this.state.username);
            this.props.onClickSubmit();
            closeSignin();
        } else {
            alert(confirmed[1]);
        }
    }
    closeSignin(event) {
        this.props.onClickSignOut();
        closeSignin();
    }

    render () {
        return (
            <div className="signinForm" id="SigninForm">
                <form id="signinform" onSubmit={e=>this.submitSignin(e)}>
                    <h1>Sign in</h1>
                    <label><b>Username</b></label>
                    <input type="text" name="username" onChange={e=>this.setUsername(e)} required/>

                    <label><b>Password</b></label>
                    <input type="password" name="password" onChange={e=>this.setPassword(e)} required/>
                    
                    <br/>
                    <button type="submit" className="submit">submit</button>
                    <button type="text" className="submit" onClick={e=>this.closeSignin(e)}>close</button>
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
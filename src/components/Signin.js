import React from "react"
import "../css/signin.css"
import formOpen from "../App.js"
import Header from "../components/Header.js"

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
    submitSignin(event) {
        window.currUser = this.state.username;
        this.props.callbackFromApp(this.state.username);
        console.log("signinusername:", this.state.username);
        this.props.onClickSubmit();
        event.preventDefault();
        closeSignin();
    }

    render () {
        return (
            <div className="signinForm" id="SigninForm">
                <form onSubmit={e=>this.submitSignin(e)}>
                    <h1>Sign in</h1>
                    <label><b>Username</b></label>
                    <input type="text" value={this.state.username} name="username" onChange={e=>this.setUsername(e)} required/>

                    <label><b>Password</b></label>
                    <input type="password" value={this.state.password} name="password" onChange={e=>this.setPassword(e)} required/>
                    
                    <br/>
                    <button type="submit" className="submit">submit</button>
                    <button type="text" className="submit" onClick={closeSignin}>close</button>
                </form>
            </div>
        );
    }
}
function closeSignin() {

    document.getElementById("SigninForm").style.display = "none";
    document.getElementById("shadow").style.display = "none";
    window.formOpen = false;
}

export default Signin
import React from "react"
import "../css/adminForm.css"
import {userManager} from "../managers/UserManager.js"

class AdminRegistration extends React.Component {

    constructor(props) {
        super(props);
        this.state = {username: "", password:"", password2:""};
        this.submitForm = this.submitForm.bind(this);
    }

    setUsername(event) {
        this.setState({username: event.target.value});
    }
    setPassword(event) {
        this.setState({password: event.target.value});
    }
    setPassword2(event) {
        this.setState({password2: event.target.value});
    }

    async submitForm(event) {
        event.preventDefault();
        var admin = 
        {
            username: this.state.username,
            password: this.state.password
        }
        //this.props.addOrg(org);
        var success = await userManager.fireCreateUser(admin);
        if (success[0]) {
            this.props.callbackFromApp(admin.username);
            closeOrgForm();
        }
        else {
            alert(success[1]);
        }
    }

    closeOrgForm(event) {
        //this.props.onClickSignOut();
        closeOrgForm();
    }
    
    checkPasswords(password, password2) {
        if (password !== password2) {
            alert("Passwords do not match");
        };
    }

    render () {
        return (
            <div className="adminForm" id="AdminForm">
                <form id="adminFormDiv" onSubmit={this.submitForm}>
                    <h1> Register an Administrator </h1>

                    <label><b>Username</b></label>
                    <input type="text" style={{width:200}} name="username" onChange={e => this.setUsername(e)} required/>

                    <label><b>Password</b></label>
                    <input type="password" style={{width:200}} name="password" onChange={e => this.setPassword(e)} required/>

                    <label><b>Confirm Password</b></label>
                    <input type="password" style={{width:200}} name="password2" onChange={e => this.setPassword2(e)} required/>

                    <br/>
                    <button type="submit" className="submit">Submit</button>
                    <button type="text" className="submit" onClick={e=>this.closeOrgForm(e)}>Close</button>
                </form>
            </div>
        );
    }
}

function closeOrgForm() {
    document.getElementById("AdminForm").style.display = "none";
    document.getElementById("shadow").style.display = "none";
    document.getElementById("adminFormDiv").reset();
    window.formOpen = false;

}

export default AdminRegistration;
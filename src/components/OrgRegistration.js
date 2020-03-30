import React from "react"
import "../css/orgForm.css"
import {userManager} from "../managers/UserManager";

class OrgRegistration extends React.Component {

    constructor(props) {
        super(props);
        this.state = {org_name: "", email: "", website: "", username: "", password:"", password2:""};
        this.submitForm = this.submitForm.bind(this);
    }

    setOrgName(event) {
        this.setState({org_name: event.target.value});
    }
    setEmail(event) {
        this.setState({email : event.target.value});
    }
    setWebsite(event) {
        this.setState({website: event.target.value});
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
        var org = 
        {
            name: this.state.org_name, 
            email: this.state.email,
            website: this.state.website,
            username: this.state.username,
            password: this.state.password
        }
        //this.props.addOrg(org);
        await this.props.userManager.fireCreateUser(org);
        var success = await this.props.userManager.fireSignIn(org.email, org.password);

        if (success[0]) {
            this.props.callbackFromApp(org.username);
            this.props.setAdmin("false");
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

            <div className="orgForm" id="OrgForm">
                <form id="orgFormDiv" onSubmit={this.submitForm}>
                    <h1> Register an Organization </h1>
                    <label><b>Organization Name</b></label>
                    <input type="text"  name="club_name" onChange={e =>this.setOrgName(e)} required/>

                    <label><b>Website</b></label>
                    <input type="text" name="website" onChange={e => this.setWebsite(e)} required/>

                    <label><b>Email</b></label>
                    <input type="text" name="email" style={{width:"31%"}} onChange={e => this.setEmail(e)} required/>

                    <label><b>Username</b></label>
                    <input type="text" style={{width:"30.3%"}} name="username" onChange={e => this.setUsername(e)} required/>
                    <br/>
                    <label><b>Password</b></label>
                    <input type="password" style={{width:"27.2%", padding:"8px"}} name="password" onChange={e => this.setPassword(e)} required/>

                    <label><b>Confirm Password</b></label>
                    <input type="password" style={{width:"22.6%", padding:"8px"}} name="password2" onChange={e => this.setPassword2(e)} required/>

                    <br/>
                    <button type="submit" className="submit">Submit</button>
                    <button type="text" className="submit" onClick={e=>this.closeOrgForm(e)}>Close</button>
                </form>
            </div>
        );
    }
}

function closeOrgForm() {
    document.getElementById("OrgForm").style.display = "none";
    document.getElementById("shadow").style.display = "none";
    document.getElementById("orgFormDiv").reset();
    window.formOpen = false;
}

export default OrgRegistration;
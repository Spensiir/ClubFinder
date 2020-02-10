import React from "react"
import "../css/orgForm.css"
import formOpen from "../App.js"
import Header from "../components/Header.js"

class OrgRegistration extends React.Component {

    constructor(props) {
        super(props);
        this.state = {org_name: "", address: "", city : "", st : "", zip: "", country: "", website: "", phone:"", description:"", username: "", password:"", password2:""};
        this.submitForm = this.submitForm.bind(this);
    }

    setOrgName(event) {
        this.setState({org_name: event.target.value});
    }
    setAddress(event) {
        this.setState({address: event.target.value});
    }
    setCountry(event) {
        this.setState({zip: event.target.value});
    }
    setCity(event) {
        this.setState({city: event.target.value});
    }
    setSt(event) {
        this.setState({st: event.target.value});
    }
    setZip(event) {
        this.setState({zip: event.target.value});
    }
    setWebsite(event) {
        this.setState({website: event.target.value});
    }
    setPhone(event) {
        this.setState({phone: event.target.value});
    }
    setDescription(event) {
        this.setState({phone: event.target.value});
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

    submitForm(event) {
        //window.currUser = this.state.username;
        //this.props.callbackFromApp(this.state.username);
        //console.log("signinusername:", this.state.username);
        this.props.onClickRegister();
        event.preventDefault();
        closeOrgForm();
    }
    closeOrgForm(event) {
        this.props.onClickSignOut();
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

                    <label><b>Address</b></label>
                    <input type="text" name="address" onChange={e => this.setAddress(e)} required/>

                    <label><b>Country</b></label>
                    <input type="text" style={{width:200}}  name="city" onChange={e => this.setCity(e)} required/>

                    <label><b>City</b></label>
                    <input type="text" style={{width:200}}  name="city" onChange={e => this.setCity(e)} required/>

                    <label><b>State</b></label>
                    <input type="text" style={{width:30}} name="state" onChange={e => this.setSt(e)} required/>

                    <label><b>Zip</b></label>
                    <input type="text" style={{width:90}} name="zip" onChange={e => this.setZip(e)} required/>

                    <label><b>Website</b></label>
                    <input type="text" style={{width:200}} name="website" onChange={e => this.setWebsite(e)} required/>

                    <label><b>Phone</b></label>
                    <input type="text" style={{width:200}} name="phone" onChange={e => this.setPhone(e)} required/>

                    <label><b>Username</b></label>
                    <input type="text" style={{width:200}} name="username" onChange={e => this.setUsername(e)} required/>

                    <label><b>Password</b></label>
                    <input type="password" style={{width:200}} name="password" onChange={e => this.setUsername(e)} required/>

                    <label><b>Confirm Password</b></label>
                    <input type="password" style={{width:200}} name="password2" onChange={e => this.setPassword2(e)} required/>

                    <br/>
                    <button type="submit" className="submit">Submit</button>
                </form>
            </div>
        );
    }
}

function closeOrgForm() {
    document.getElementById("OrgFormDiv").style.display = "none";
    document.getElementById("shadow").style.display = "none";
    document.getElementById("orgFormDiv").reset();
    window.formOpen = false;

}

export default OrgRegistration;
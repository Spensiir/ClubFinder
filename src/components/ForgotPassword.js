import React from "react";
import {firebase} from '../tools/config.js';
import "../css/passwordReset.css"

class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {email : ""}
    }

    setEmail(event) {
        this.setState({email: event.target.value});
    }

    async submitPasswordReset(event) {
        event.preventDefault();
        var auth = firebase.auth();
        var emailAddress = this.state.email;
        auth.sendPasswordResetEmail(emailAddress)
        .then(function() {
            console.log("Email sent");
        })
        .catch(function(error) {
            console.log("Error sending email");
        });
    }

    render () {
        return (
            <div className="passwordResetForm" id="PasswordResetForm">
                <form id="passwordresetform" onSubmit={e=>this.submitPasswordReset(e)}>
                    <h1>Reset Password</h1>
                    <label><b>Email</b></label>
                    <input type="text" name="username" default={this.state.username} onChange={e=>this.setEmail(e)} required/>
                    <br/>
                    <button type="submit" className="submit">Submit</button>
                    <button type="text" className="submit" onClick={e=>this.closeSignin(e)}>Close</button>
                </form>
            </div>
        );
    }
}

export default ForgotPassword;
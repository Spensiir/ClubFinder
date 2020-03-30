import React from 'react';
import '../css/profileForm.css';
import {userManager} from "../managers/UserManager";
import {organizationManager} from "../managers/OrganizationManager";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        var user = this.props.currentUser;
        if (user) {
            //var uid = user.uid;
            //var organization = organizationManager.getOrganization();
            this.state = {
                user: this.props.currentUser,
                id: props.currentUser.uid,
                email: props.currentUser.email,
                name: this.props.currentOrg.name,
                website: this.props.currentOrg.website,
                email:this.props.currentOrg.email,
                username: this.props.currentOrg.username
            }
        }
        else {
            this.state = {
                name: "",
                id: "",
                email: "",
                country: "",
                city: "",
                state: "",
                zip: "",
                website: "",
                username: "",
                email:"",
                user: null
            }
        }
        this.submitForm = this.submitForm.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        console.log("***" + props.currentUser);
        if (props.currentUser && state.user && props.currentUser.uid !== state.user.uid) {
            //var uid = props.currentUser.uid;
            //var organization = organizationManager.getOrganization();
            return {
                    user: props.currentUser,
                    id: props.currentUser.uid,
                    email: props.currentUser.email,
                    name: props.currentOrg.name,
                    website: props.currentOrg.website,
                    email:props.currentOrg.email,
                    username: props.currentOrg.username
            };
        } else if (props.currentUser && !state.user){
            //var uid = props.currentUser.uid;
            //var organization = organizationManager.getOrganization();
            return {
                user: props.currentUser,
                id: props.currentUser.uid,
                email: props.currentUser.email,
                name: props.currentOrg.name,
                website: props.currentOrg.website,
                email:props.currentOrg.email,
                username: props.currentOrg.username
            };
        }
        return null;
    }

    setName(event) {
        this.setState({name: event.target.value});
    }
    setWebsite(event) {
        this.setState({website: event.target.value});
    }
    setUsername(event) {
        this.setState({username: event.target.value});
    }
    setEmail(event) {
        this.setState({username: event.target.value});
    }

    closeProfileForm() {
        document.getElementById("ProfileForm").style.display = "none";
        document.getElementById("shadow").style.display = "none";
    }

    async submitForm(event) {
        event.preventDefault();
        this.props.updateOrg({
            name: this.state.name,
            id: this.state.id,
            email: this.state.email,
            country: this.state.country,
            city: this.state.city,
            state: this.state.state,
            zip: this.state.zip,
            website: this.state.website,
            phone: this.state.phone,
            description: this.state.description,
            username: this.state.username,
        });
        this.closeProfileForm();
    }

    render() {
        return(
            <div className="profileForm" id="ProfileForm">
                <form id = "profileFormDiv" onSubmit={this.submitForm}>
                    <h1>Profile Details</h1>

                    <label><b>Organization Name</b></label>
                    <input type="text" name="club_name" onChange={e =>this.setName(e)} required/>

                    <label><b>Website</b></label>
                    <input type="text" name="website" onChange={e => this.setWebsite(e)} required/>

                    <label><b>Email</b></label>
                    <input type="text" name="email" style={{width:"31%"}} onChange={e => this.setEmail(e)} required/>
                    
                    <label><b>Username</b></label>
                    <input type="text" style={{width:"30.3%"}} name="username" onChange={e => this.setUsername(e)} required/>

                    <br/>
                    <button type="submit" className="submit">Submit</button>
                    <button type="text" className="close" onClick={this.closeProfileForm}>Close</button>
                </form>
            </div>
        )
    }
}

export default Profile;
import React from 'react';
import '../css/profileForm.css';
import {userManager} from "../managers/UserManager";
import {organizationManager} from "../managers/OrganizationManager";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        var user = this.props.currentUser;
        if (this.props.isAdmin) {
            console.log("here");
            this.state = {
                user: this.props.currentUser,
                name: this.props.adminSelectedOrg.name,
                website: this.props.adminSelectedOrg.website,
                email:this.props.adminSelectedOrg.email,
                username: this.props.adminSelectedOrg.username,
                id: this.props.adminSelectedOrg.id
            }
        }
        else if (user) {
            //var uid = user.uid;
            //var organization = organizationManager.getOrganization();
            this.state = {
                user: this.props.currentUser,
                name: this.props.currentOrg.name,
                website: this.props.currentOrg.website,
                email:this.props.currentOrg.email,
                username: this.props.currentOrg.username,
                id: this.props.currentOrg.id
            }
        }
        else {
            this.state = {
                name: "",
                website: "",
                username: "",
                email: "",
                user: null,
                id: ""
            }
        }
        this.submitForm = this.submitForm.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        console.log("***" + props.currentUser);
        console.log(props.isAdmin, props.adminSelectedOrg, props.adminSelectedOrg && props.adminSelectedOrg.email !== state.email)
        if (props.isAdmin && props.adminSelectedOrg && props.adminSelectedOrg.email !== state.email) {
            console.log('ret admin stuff')
            return {
                user: props.currentUser,
                name: props.adminSelectedOrg.name,
                website: props.adminSelectedOrg.website,
                email: props.adminSelectedOrg.email,
                username: props.adminSelectedOrg.username,
                id: props.adminSelectedOrg.id
            }
        }
        else if (props.currentUser && state.user && props.currentUser.uid !== state.user.uid) {
            //var uid = props.currentUser.uid;
            //var organization = organizationManager.getOrganization();
            return {
                user: props.currentUser,
                name: props.currentOrg.name,
                website: props.currentOrg.website,
                email:props.currentOrg.email,
                username: props.currentOrg.username,
                id: props.currentOrg.id
            };
        } else if (props.currentUser && !state.user){
            //var uid = props.currentUser.uid;
            //var organization = organizationManager.getOrganization();
            return {
                user: props.currentUser,
                name: props.currentOrg.name,
                website: props.currentOrg.website,
                email:props.currentOrg.email,
                username: props.currentOrg.username,
                id: props.currentOrg.id
            };
        }
        return null;
    }

    setName(event) {
        this.setState({name: event.target.value});
    }
    setCountry(event) {
        this.setState({country: event.target.value});
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

    async submitForm(event) {
        event.preventDefault();
        this.props.updateOrg({
            name: this.state.name,
            website: this.state.website,
            username: this.state.username,
            email: this.state.email,
            id: this.state.id,
            admin: 'False'
        });
        this.closeProfileForm();
    }

    render() {
        return(
            <div className="profileForm" id="ProfileForm">
                <form id = "profileFormDiv" onSubmit={this.submitForm}>
                    <h1>Profile Details</h1>

                    <label><b>Organization Name</b></label>
                    <input type="text" defaultValue= {this.state.name} onChange={e =>this.setName(e)}/>

                    <label><b>Website</b></label>
                    <input type="text" defaultValue= {this.state.website} onChange={e =>this.setWebsite(e)}/>

                    <label><b>Email</b></label>
                    <input type="text" defaultValue= {this.state.email} name="email" style={{width:"31%"}} onChange={e => this.setEmail(e)} required/>
                    
                    <label><b>Username</b></label>
                    <input type="text" defaultValue= {this.state.username} style={{width:"30.3%"}} name="username" onChange={e => this.setUsername(e)} required/>

                    <button type="submit" className="submit">Submit</button>
                    <button type="text" className="submit" onClick={e=>this.closeProfileForm(e)}>Close</button>
                </form>
            </div>
        )
    }

    closeProfileForm() {
        document.getElementById("ProfileForm").style.display = "none";
        document.getElementById("shadow").style.display = "none";
    }
}

export default Profile;
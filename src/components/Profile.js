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
                name: this.props.currentOrg.name,
                country: this.props.currentOrg.country,
                city: this.props.currentOrg.city,
                state: this.props.currentOrg.state,
                zip: this.props.currentOrg.zip,
                website: this.props.currentOrg.website,
                phone: this.props.currentOrg.phone,
                description: this.props.currentOrg.description,
                username: this.props.currentOrg.username
            }
        }
        else {
            this.state = {
                name: "",
                country: "",
                city: "",
                state: "",
                zip: "",
                website: "",
                phone: "",
                description: "",
                username: "",
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
                    name: props.currentOrg.name,
                    country: props.currentOrg.country,
                    city: props.currentOrg.city,
                    state: props.currentOrg.state,
                    zip: props.currentOrg.zip,
                    website: props.currentOrg.website,
                    phone: props.currentOrg.phone,
                    description: props.currentOrg.description,
                    username: props.currentOrg.username
            };
        } else if (props.currentUser && !state.user){
            //var uid = props.currentUser.uid;
            //var organization = organizationManager.getOrganization();
            return {
                user: props.currentUser,
                name: props.currentOrg.name,
                country: props.currentOrg.country,
                city: props.currentOrg.city,
                state: props.currentOrg.state,
                zip: props.currentOrg.zip,
                website: props.currentOrg.website,
                phone: props.currentOrg.phone,
                description: props.currentOrg.description,
                username: props.currentOrg.username
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
    setCity(event) {
        this.setState({city: event.target.value});
    }
    setSt(event) {
        this.setState({state: event.target.value});
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
        this.setState({description: event.target.value});
    }
    setUsername(event) {
        this.setState({username: event.target.value});
    }

    async submitForm(event) {
        event.preventDefault();
        this.props.updateOrg({
            name: this.state.name,
            country: this.state.country,
            city: this.state.city,
            state: this.state.state,
            zip: this.state.zip,
            website: this.state.website,
            phone: this.state.phone,
            description: this.state.description,
            username: this.state.username
        });
        closeProfileForm();
    }

    render() {
        return(
            <div className="profileForm" id="ProfileForm">
                <form id = "profileFormDiv" onSubmit={this.submitForm}>
                    <h1>Profile Details</h1>

                    <label><b>Organization Name</b></label>
                    <input type="text" defaultValue= {this.state.name} onChange={e =>this.setName(e)}/>

                    <label><b>Username</b></label>
                    <input type="text" defaultValue= {this.state.username} onChange={e =>this.setUsername(e)}/>

                    <label><b>Country</b></label>
                    <input type="text" defaultValue= {this.state.country} onChange={e =>this.setCountry(e)}/>

                    <label><b>City</b></label>
                    <input type="text" defaultValue= {this.state.city} onChange={e =>this.setCity(e)}/>

                    <label><b>State</b></label>
                    <input type="text" defaultValue= {this.state.state} onChange={e =>this.setSt(e)}/>

                    <label><b>Zip</b></label>
                    <input type="text" defaultValue= {this.state.zip} onChange={e =>this.setZip(e)}/>

                    <label><b>Website</b></label>
                    <input type="text" defaultValue= {this.state.website} onChange={e =>this.setWebsite(e)}/>

                    <label><b>Description</b></label>
                    <input type="text" defaultValue= {this.state.description} onChange={e =>this.setDescription(e)}/>

                    <label><b>Phone</b></label>
                    <input type="text" defaultValue= {this.state.phone} onChange={e =>this.setPhone(e)}/>

                    <button type="submit" className="submit">Submit</button>
                    <button type="text" className="submit" onClick={this.closeProfileForm}>Close</button>
                </form>
            </div>
        )
    }
}

function closeProfileForm() {
    document.getElementById("ProfileForm").style.display = "none";
    document.getElementById("shadow").style.display = "none";
}

export default Profile;
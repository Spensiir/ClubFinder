import React from 'react';
import '../css/profileForm.css';
import {userManager} from "../managers/UserManager";
import {organizationManager} from "../managers/OrganizationManager";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        var user = userManager.getUser();
        let organization;
        if (user) {
            var email = user.email;
            organization = organizationManager.getOrganization(email);
            this.state = {
                name: organization.name,
                country: organization.country,
                city: organization.city,
                state: organization.state,
                zip: organization.zip,
                website: organization.website,
                phone: organization.phone,
                description: organization.description,
                username: organization.username
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
                username: ""
            }
        }
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
        this.setState({zip: event.target.value})
    }
    setWebsite(event) {
        this.setState({website: event.target.value})
    }
    setPhone(event) {
        this.setState({phone: event.target.value})
    }
    setDescription(event) {
        this.setState({description: event.target.value})
    }
    setUsername(event) {
        this.setState({username: event.target.value})
    }

    render() {
        return(
            <div class="profileForm" id="ProfileForm">
                <form>
                    <h1>Profile Details</h1>

                    <label><b>Organization Name</b></label>
                    <input type="text" defaultValue= {this.state.name}/>

                    <label><b>Username</b></label>
                    <input type="text" defaultValue= {this.state.name}/>

                    <label><b>Country</b></label>
                    <input type="text" defaultValue= {this.state.name}/>

                    <label><b>City</b></label>
                    <input type="text" defaultValue= {this.state.name}/>

                    <label><b>State</b></label>
                    <input type="text" defaultValue= {this.state.name}/>

                    <label><b>Zip</b></label>
                    <input type="text" defaultValue= {this.state.name}/>

                    <label><b>Website</b></label>
                    <input type="text" defaultValue= {this.state.name}/>

                    <label><b>Description</b></label>
                    <input type="text" defaultValue= {this.state.name}/>

                    <label><b>Phone</b></label>
                    <input type="text" defaultValue= {this.state.name}/>
                </form>
            </div>
        )
    }
}
export default Profile;
import React from 'react';
import '../css/addform.css';
import { getCoords } from '../tools/coords.js';
import {userManager} from "../managers/UserManager";

class EditForm extends React.Component {
    constructor(props) {
        super(props);
        if (this.props.initialSelect !== null) {
            this.state = {
                name: this.props.initialSelect.name,
                address: this.props.initialSelect.address,
                city: this.props.initialSelect.city,
                state: this.props.initialSelect.state,
                zip: this.props.initialSelect.zip,
                country: this.props.initialSelect.country,
                website: this.props.initialSelect.website,
                contact: this.props.initialSelect.contact, 
                phone:this.props.initialSelect.phone, 
                description:this.props.initialSelect.description, 
                weapons: this.props.initialSelect.weapons,
                email:this.props.initialSelect.email,
            };
        } else {
            this.state = {name: "",
                address: "",
                city : "",
                state : "",
                zip: "",
                country: "",
                website: "",
                contact: "", 
                phone:"", 
                description:"", 
                weapons: "", 
                email:""
            };
        }

        var newDetails = this.state;
        this.state.newDetails = newDetails;

        this.submitForm = this.submitForm.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        if (props.initialSelect !== null && state.name === "") {
            return {
                name: props.initialSelect.name,
                address: props.initialSelect.address,
                website: props.initialSelect.website,
                weapons: props.initialSelect.weapons,
                contact: props.initialSelect.contact, 
                phone:props.initialSelect.phone, 
                description:props.initialSelect.description, 
                email:props.initialSelect.email,
                lat: props.initialSelect.lat,
                lng: props.initialSelect.lng,
                color: props.initialSelect.color,
                orgEmail: props.initialSelect.orgEmail,
                newDetails : props.initialSelect
            };
        } else if (props.initialSelect !== null && props.initialSelect.name !== state.name) {
            return {
                name: props.initialSelect.name,
                address: props.initialSelect.address,
                website: props.initialSelect.website,
                weapons: props.initialSelect.weapons,
                contact: props.initialSelect.contact,
                phone:props.initialSelect.phone,
                description:props.initialSelect.description,
                email:props.initialSelect.email,
                lat: props.initialSelect.lat,
                lng: props.initialSelect.lng,
                color: props.initialSelect.color,
                orgEmail: props.initialSelect.orgEmail,
                newDetails : props.initialSelect
            };
        } else if (props.initialSelect !== null && props.initialSelect.address !== state.default_address) {
            return {
                name: props.initialSelect.name,
                address: props.initialSelect.address,
                website: props.initialSelect.website,
                weapons: props.initialSelect.weapons,
                contact: props.initialSelect.contact,
                phone:props.initialSelect.phone,
                description:props.initialSelect.description,
                email:props.initialSelect.email,
                lat: props.initialSelect.lat,
                lng: props.initialSelect.lng,
                color: props.initialSelect.color,
                orgEmail: props.initialSelect.orgEmail,
                newDetails : props.initialSelect
            };
        }
        return null;
    }

    setClubName(event) {
        var newDetails = this.state.newDetails;
        newDetails.name = event.target.value;
        this.setState({newDetails : newDetails});
    }
    setAddress(event) {
        var newDetails = this.state.newDetails;
        newDetails.address = event.target.value;
        this.setState({newDetails : newDetails});
    }
    setCity(event) {
        var newDetails = this.state.newDetails;
        newDetails.city = event.target.value;
        this.setState({newDetails : newDetails});
    }
    setSt(event) {
        var newDetails = this.state.newDetails;
        newDetails.state = event.target.value;
        this.setState({newDetails : newDetails});
    }
    setZip(event) {
        var newDetails = this.state.newDetails;
        newDetails.zip = event.target.value;
        this.setState({newDetails : newDetails});
    }
    setWebsite(event) {
        var newDetails = this.state.newDetails;
        newDetails.website = event.target.value;
        this.setState({newDetails : newDetails});
    }
    setContact(event) {
        var newDetails = this.state.newDetails;
        newDetails.contact = event.target.value;
        this.setState({newDetails : newDetails});
    }
    setPhone(event) {
        var newDetails = this.state.newDetails;
        newDetails.phone = event.target.value;
        this.setState({newDetails : newDetails});
    }
    setDescription(event) {
        var newDetails = this.state.newDetails;
        newDetails.description = event.target.value;
        this.setState({newDetails : newDetails});
    }
    setWeapons(event) {
        var newDetails = this.state.newDetails;
        newDetails.weapons = event.target.value;
        this.setState({newDetails : newDetails});
    }
    setEmail(event) {
        var newDetails = this.state.newDetails;
        newDetails.email= event.target.value;
        this.setState({newDetails : newDetails});
    }

    async submitForm(event) {
        event.preventDefault();
        var loc = {address: this.state.address,
            city : this.state.city,
            state : this.state.state,
            zip : this.state.zip
        };

        let coords;
        await getCoords(loc).then( res => {
            console.log(res);
            coords = res;
        });

        if (coords.lat !== null && coords.lng !== null) {
            var newDetails = this.state.newDetails;
            newDetails.lat = coords.lat;
            newDetails.lng = coords.lng;
            newDetails.color = "red";
            newDetails.orgEmail = userManager.getUser().email;

            this.props.updateMarkers(newDetails);
        } else {
            console.log("Bad location...");
        }

        this.closeEditForm();
    }

    render () {
        return (
            <div className="addForm" id="EditFormDiv">
                <form id="editFormDiv" onSubmit={this.submitForm}>
                    <h1> Edit Your Club </h1>
                    <label><b>Club Name *</b></label>
                    <input type="text" defaultValue={this.state.name} name="name" onChange={e =>this.setClubName(e)} required/>

                    <label><b>Address *</b></label>
                    <input type="text" defaultValue={this.state.address} name="address" onChange={e => this.setAddress(e)} placeholder={this.state.address} required/>

                    <label><b>City</b></label>
                    <input type="text" defaultValue={this.state.city} style={{width:"36.7%"}} className="city" name="city" onChange={e => this.setCity(e)}/>

                    <label><b>State</b></label>
                    <input type="text" defaultValue={this.state.state} style={{width:"4%"}} className="state" name="state" onChange={e => this.setSt(e)}/>

                    <label><b>Zip</b></label>
                    <input type="text" defaultValue={this.state.zip} style={{width:"11.8%"}} className="zip" name="zip" onChange={e => this.setZip(e)}/>
                    <br/>
                    <label><b>Website *</b></label>
                    <input type="text" defaultValue={this.state.website} style={{width:"31%"}} className="website" name="website" onChange={e => this.setWebsite(e)} required/>

                    <label><b>Email *</b></label>
                    <input type="text" defaultValue={this.state.email} style={{width:"28.3%"}} className="email" name="email" onChange={e => this.setEmail(e)} required/>
                    <br/>
                    <label><b>Contact Name</b></label>
                    <input type="text" defaultValue={this.state.contact} style={{width:"26.4%"}} className="contact" name="contact" onChange={e => this.setContact(e)}/>

                    <label><b>Phone #</b></label>
                    <input type="text" defaultValue={this.state.phone} style={{width:"27%"}} className="phone" name="phone" onChange={e => this.setPhone(e)}/>
                    <br/>
                    <label><b>Weapons</b></label>
                    <input type="text" defaultValue={this.state.weapons} className="website" name="website" onChange={e => this.setWeapons(e)}/>
                    <br/>
                    <label><b>Club Description</b></label>
                    <textarea type="text" defaultValue={this.state.description} className="description" name="description" onChange={e => this.setDescription(e)}/>
                    <button type="submit" className="submit">Submit</button>
                    <button type="button" className="submit" onClick={this.closeEditForm}>Close</button>
                </form>
            </div>
        );
    }

    closeEditForm() {
        document.getElementById("EditFormDiv").scrollTop = (0,0);
        document.getElementById("EditFormDiv").style.display = "none";
        document.getElementById("shadow").style.display = "none";
        document.getElementById("editFormDiv").reset();
        window.formOpen = false;
    }
    
}

export default EditForm;
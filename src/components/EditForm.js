import React from 'react';
import '../css/addform.css';
import { getCoords } from '../tools/coords.js';
import {userManager} from "../managers/UserManager";

class EditForm extends React.Component {
    constructor(props) {
        super(props);
        if (this.props.initialSelect !== null) {
            this.state = {
                club_name: this.props.initialSelect.name,
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
                email:this.props.initialSelect.email
            };
        } else {
            this.state = {club_name: "",
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
        this.submitForm = this.submitForm.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        if (props.initialSelect !== null && state.club_name === "") {
            return {
                club_name: props.initialSelect.name,
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
                orgEmail: props.initialSelect.orgEmail
            };
        } else if (props.initialSelect !== null && props.initialSelect.default_club_name !== state.club_name) {
            return {
                default_club_name: props.initialSelect.name,
                default_address: props.initialSelect.address,
                default_website: props.initialSelect.website,
                default_weapons: props.initialSelect.weapons,
                default_contact: props.initialSelect.contact, 
                default_phone:props.initialSelect.phone, 
                default_description:props.initialSelect.description, 
                default_email:props.initialSelect.email,
                default_lat: props.initialSelect.lat,
                default_lng: props.initialSelect.lng,
                default_color: props.initialSelect.color,
                default_orgEmail: props.initialSelect.orgEmail
            };
        } else if (props.initialSelect !== null && props.initialSelect.address !== state.default_address) {
            return {
                default_club_name: props.initialSelect.name,
                default_address: props.initialSelect.address,
                default_website: props.initialSelect.website,
                default_weapons: props.initialSelect.weapons,
                default_contact: props.initialSelect.contact, 
                default_phone:props.initialSelect.phone, 
                default_description:props.initialSelect.description, 
                default_email:props.initialSelect.email,
                default_lat: props.initialSelect.lat,
                default_lng: props.initialSelect.lng,
                default_color: props.initialSelect.color,
                default_orgEmail: props.initialSelect.orgEmail
            };
        }
        return null;
    }

    setClubName(event) {
        this.setState({club_name: event.target.value});
    }
    setAddress(event) {
        this.setState({address: event.target.value});
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
    setContact(event) {
        this.setState({contact: event.target.value});
    }
    setPhone(event) {
        this.setState({phone: event.target.value});
    }
    setDescription(event) {
        this.setState({description: event.target.value});
    }
    setWeapons(event) {
        this.setState({weapons: event.target.value});
    }
    setEmail(event) {
        this.setState({email: event.target.value});
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
            this.props.updateMarkers({
                name: this.state.club_name,
                address: this.state.address + ", " 
                + this.state.city + ", " 
                + this.state.state + ", " 
                + this.state.zip,
                state: this.state.state,
                city: this.state.city,
                zip: this.state.zip,
                website: this.state.website,
                contact: this.state.contact,
                phone: this.state.phone,
                description: this.state.description,
                weapons: this.state.weapons,
                email: this.state.email,
                lat: coords.lat,
                lng: coords.lng,
                color: "red",
                orgEmail: userManager.getUser().email});
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
                    <input type="text" defaultValue={this.state.default_club_name} name="club_name" onChange={e =>this.setClubName(e)} required/>

                    <label><b>Address *</b></label>
                    <input type="text" defaultValue={this.state.default_address} name="address" onChange={e => this.setAddress(e)} placeholder={this.state.address} required/>

                    <label><b>City</b></label>
                    <input type="text" defaultValue={this.state.default_city} style={{width:"36.7%"}} className="city" name="city" onChange={e => this.setCity(e)}/>

                    <label><b>State</b></label>
                    <input type="text" defaultValue={this.state.default_state} style={{width:"4%"}} className="state" name="state" onChange={e => this.setSt(e)}/>

                    <label><b>Zip</b></label>
                    <input type="text" defaultValue={this.state.default_zip} style={{width:"11.8%"}} className="zip" name="zip" onChange={e => this.setZip(e)}/>
                    <br/>
                    <label><b>Website *</b></label>
                    <input type="text" defaultValue={this.state.default_website} style={{width:"31%"}} className="website" name="website" onChange={e => this.setWebsite(e)} required/>

                    <label><b>Email *</b></label>
                    <input type="text" defaultValue={this.state.default_email} style={{width:"28.3%"}} className="email" name="email" onChange={e => this.setEmail(e)} required/>
                    <br/>
                    <label><b>Contact Name</b></label>
                    <input type="text" defaultValue={this.state.default_contact} style={{width:"26.4%"}} className="contact" name="contact" onChange={e => this.setContact(e)}/>

                    <label><b>Phone #</b></label>
                    <input type="text" defaultValue={this.state.default_phone} style={{width:"27%"}} className="phone" name="phone" onChange={e => this.setPhone(e)}/>
                    <br/>
                    <label><b>Weapons</b></label>
                    <input type="text" defaultValue={this.state.default_weapons} className="website" name="website" onChange={e => this.setWeapons(e)}/>
                    <br/>
                    <label><b>Club Description</b></label>
                    <textarea type="text" defaultValue={this.state.default_description} className="description" name="description" onChange={e => this.setDescription(e)}/>
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
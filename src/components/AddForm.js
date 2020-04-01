import React from 'react';
import '../css/addform.css';
import { getCoords } from '../tools/coords.js';
import { userManager } from '../managers/UserManager';
import { countries } from '../tools/locationForms';

class AddForm extends React.Component {
    constructor(props) {
        super(props);
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
            email:""};
        this.submitForm = this.submitForm.bind(this);
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
        //console.log("submit form");
        event.preventDefault();
        var loc = {address: this.state.address,
            city : this.state.city,
            state : this.state.state,
            zip : this.state.zip
        };

        let coords;
        await getCoords(loc).then( res => {
            console.log("addform add loc:" + res);
            coords = res;
        });

        if (coords.lat !== null && coords.lng !== null) {
            this.props.updateMarkers({name: this.state.club_name,
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

        closeAddForm();
    }

    render () {
        return (
            <div className="addForm" id="AddFormDiv">
                <form id="addFormDiv" onSubmit={this.submitForm}>
                    <h1> Add a New Club </h1>
                    <label><b>Club Name</b></label>
                    <input type="text"  name="club_name" onChange={e =>this.setClubName(e)} required/>

                    <label><b>Address</b></label>
                    <input type="text" name="address" onChange={e => this.setAddress(e)} required/>

                    <label><b>City</b></label>
                    <input type="text" style={{width:"36.7%"}} className="city" name="city" onChange={e => this.setCity(e)} required/>

                    <label><b>State</b></label>
                    <input type="text" style={{width:"4%"}} className="state" name="state" onChange={e => this.setSt(e)} required/>

                    <label><b>Zip</b></label>
                    <input type="text" style={{width:"11.8%"}} className="zip" name="zip" onChange={e => this.setZip(e)} required/>
                    <br/>
                    <label><b>Website</b></label>
                    <input type="text" style={{width:"32.5%"}} className="website" name="website" onChange={e => this.setWebsite(e)} required/>

                    <label><b>Email</b></label>
                    <input type="text" style={{width:"29.8%"}} className="email" name="email" onChange={e => this.setEmail(e)} required/>
                    <br/>
                    <label><b>Contact Name</b></label>
                    <input type="text" style={{width:"26.4%"}} className="contact" name="contact" onChange={e => this.setContact(e)}/>

                    <label><b>Phone #</b></label>
                    <input type="text" style={{width:"27%"}} className="phone" name="phone" onChange={e => this.setPhone(e)}/>
                    <br/>
                    <label><b>Weapons / Studies</b></label>
                    <input type="text"className="website" name="website" onChange={e => this.setWeapons(e)}/>
                    <br/>
                    <label><b>Club Description</b></label>
                    <textarea type="text" className="description" name="description" onChange={e => this.setDescription(e)}/>

                    <button type="submit" className="submit">Submit</button>
                    <button type="button" className="submit" onClick={closeAddForm}>Close</button>
                </form>
            </div>
        );
    }
}

function closeAddForm() {
    document.getElementById("AddFormDiv").scrollTop = (0,0);
    document.getElementById("AddFormDiv").style.display = "none";
    document.getElementById("shadow").style.display = "none";
    document.getElementById("addFormDiv").reset();
    window.formOpen = false;
}

export default AddForm;
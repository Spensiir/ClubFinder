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
                country: "",
                website: "",
                phone: "",
                description: "",
                weapons: ""
            };
        } else {
            this.state = {club_name: "",
                address: "",
                city : "",
                state : "",
                zip: "",
                country: "",
                website: "",
                phone:"",
                description:"",
                weapons: ""
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
    setWeapons(event) {
        this.setState({weapons: event.target.value});
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
        console.log(this.state.address);

        if (coords.lat !== null && coords.lng !== null) {
            this.props.updateMarkers({
                name: this.state.club_name,
                address: this.state.address + ", "
                + this.state.city + ", "
                + this.state.state + ", "
                + this.state.zip,
                city : this.state.city,
                state : this.state.state,
                zip : this.state.zip,
                website: this.state.website,
                weapons: this.state.weapons,
                lat: coords.lat,
                lng: coords.lng,
                color: "red",
                orgEmail: userManager.getUser().email});
        } else {
            console.log("Bad location...");
        }

        closeEditForm();
    }

    render () {
        return (
            <div className="addForm" id="EditFormDiv">
                <form id="editFormDiv" onSubmit={this.submitForm}>
                    <h1> Edit an Existing Club </h1>
                    <label><b>Club Name</b></label>
                    <input type="text" defaultValue={this.state.default_club_name} name="club_name" onChange={e =>this.setClubName(e)} required/>

                    <label><b>Address</b></label>
                    <input type="text" defaultValue={this.state.default_address} name="address" onChange={e => this.setAddress(e)} required/>

                    <label><b>City</b></label>
                    <input type="text" defaultValue={this.state.default_city} style={{width:200}} className="city" name="city" onChange={e => this.setCity(e)} required/>

                    <label><b>State</b></label>
                    <input type="text" defaultValue={this.state.default_state} style={{width:30}} className="state" name="state" onChange={e => this.setSt(e)} required/>

                    <label><b>Zip</b></label>
                    <input type="text" defaultValue={this.state.default_zip} style={{width:90}} className="zip" name="zip" onChange={e => this.setZip(e)} required/>

                    <label><b>Website</b></label>
                    <input type="text" style={{width:200}} className="website" name="website" onChange={e => this.setWebsite(e)}/>
                    <br/>

                    <label><b>Weapons</b></label>
                    <input type="text" className="website" name="website" onChange={e => this.setWeapons(e)}/>
                    <br/>
                    <button type="submit" className="submit">Submit</button>
                    <button type="button" className="submit" onClick={closeEditForm}>Close</button>
                </form>
            </div>
        );
    }
}

function closeEditForm() {
    document.getElementById("EditFormDiv").style.display = "none";
    document.getElementById("shadow").style.display = "none";
    document.getElementById("editFormDiv").reset();
    window.formOpen = false;
}

export default EditForm;
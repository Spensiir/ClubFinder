import React from 'react';
import '../css/addform.css';
//import axios from 'axios';
import { getCoords } from '../tools/coords.js';

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
        if (props.initialSelect !== null && props.initialSelect.name !== state.club_name && window.formOpen === false) {
            console.log(props.initialSelect);
            return {
                club_name: props.initialSelect.name,
                address: props.initialSelect.address,
                city: props.initialSelect.city,
                state: props.initialSelect.state,
                zip: props.initialSelect.zip,
                country: "",
                website: "",
                phone: "",
                description: "",
                weapons: ""
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
    submitForm(event) {
        event.preventDefault();
        var loc = {address: this.state.address,
            city : this.state.city,
            state : this.state.state,
            zip : this.state.zip
        };
        var coords = getCoords(loc);

        if (coords.lat !== null && coords.lng !== null) {
            this.props.updateMarkers({name: this.state.club_name,
                address: this.state.address,
                city : this.state.city,
                state : this.state.state,
                zip : this.state.zip,
                lat: coords.lat,
                lng: coords.long,
                color: "red"});
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
                    <input type="text" value={this.state.club_name} name="club_name" onChange={e =>this.setClubName(e)} required/>

                    <label><b>Address</b></label>
                    <input type="text" value={this.state.address} name="address" onChange={e => this.setAddress(e)} required/>

                    <label><b>City</b></label>
                    <input type="text" value={this.state.city} style={{width:200}} className="city" name="city" onChange={e => this.setCity(e)} required/>

                    <label><b>State</b></label>
                    <input type="text" value={this.state.state} style={{width:30}} className="state" name="state" onChange={e => this.setSt(e)} required/>

                    <label><b>Zip</b></label>
                    <input type="text" value={this.state.zip} style={{width:90}} className="zip" name="zip" onChange={e => this.setZip(e)} required/>

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
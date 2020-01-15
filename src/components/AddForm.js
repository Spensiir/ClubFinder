import React from 'react';
import '../css/addform.css';
//import axios from 'axios';
import { getCoords } from '../tools/coords.js';

class AddForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {club_name: "", address: "", city : "", state : "", zip: "", country: "", website: "", phone:"", description:"", weapons: ""};
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
        console.log(coords);

        if (coords.lat !== null && coords.lng !== null) {
            this.props.updateMarkers({name: this.state.club_name,
                address: this.state.address,
                city : this.state.city,
                state : this.state.state,
                zip : this.state.zip,
                lat: coords.lat,
                lng: coords.lng,
                color: "red"});
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
                    <input type="text" style={{width:200}} className="city" name="city" onChange={e => this.setCity(e)} required/>

                    <label><b>State</b></label>
                    <input type="text" style={{width:30}} className="state" name="state" onChange={e => this.setSt(e)} required/>

                    <label><b>Zip</b></label>
                    <input type="text" style={{width:90}} className="zip" name="zip" onChange={e => this.setZip(e)} required/>

                    <br/>
                    <button type="submit" className="submit">Submit</button>
                    <button type="button" className="submit" onClick={closeAddForm}>Close</button>
                </form>
            </div>
        );
    }
}

function closeAddForm() {
    document.getElementById("AddFormDiv").style.display = "none";
    document.getElementById("shadow").style.display = "none";
    document.getElementById("addFormDiv").reset();
    window.formOpen = false;
}

export default AddForm;
import React from 'react';
import '../css/addform.css';
import formOpen from '../App.js';

class AddForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {club_name: "", address: "", city : "", state : "", zip: "", country: "", website: "", phone:"", description:"", weapons: ""};

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
    submitForm() {
        closeAddForm();
    }

    render () {
        return (
            <div className="addForm" id="AddForm">
                <form onSubmit={this.submitForm}>
                    <h1> Add a New Club </h1>
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
                    <button type="button" className="submit" onClick={closeAddForm}>Close</button>
                </form>
            </div>
        );
    }
}

function closeAddForm() {
    document.getElementById("AddForm").style.display = "none";
    document.getElementById("shadow").style.display = "none";
    window.formOpen = false;
}

export default AddForm;
import React from 'react';
import "../css/map.css";
import "../css/directory.css";
import GoogleMapReact from 'google-map-react';
import { config } from '../tools/config.js';
import locationManager from "../managers/LocationManager.js"

var isUser = "none";

const Marker = (props) => {
    const { color } = props;
    return (
        <div className="marker"
             style={{ backgroundColor: color, cursor: 'pointer'}}
        />
    );
};

class SimpleMap extends React.Component {
    constructor(props) {
        super(props);
            this.state = {
                center: {lat: 33.7490, lng: -84.3880},
                defaultCenter: {lat: 33.7490, lng: -84.3880},
                zoom: 14,
                markers: this.props.currMarkers,
                selected: this.props.currSelect,
            };

            if ("geolocation" in navigator) {
                // check if geolocation is supported/enabled on current browser
                navigator.geolocation.getCurrentPosition(
                    position => {
                        this.setState({
                            center: {lat: position.coords.latitude, lng: position.coords.longitude},
                            defaultCenter: {lat: position.coords.latitude, lng: position.coords.longitude},
                            zoom: 14,
                            markers: this.props.currMarkers,
                            selected: this.props.currSelect
                        });
                    })
            }
        this.onChildClick = this.onChildClick.bind(this);
        this.removeMarker = this.removeMarker.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        if (props.currSelect !== state.selected && props.currSelect !== null) {
            return {
                selected : props.currSelect,
                center: { lat : props.currSelect.lat, lng: props.currSelect.lng },
                markers : props.currMarkers
            };
        } else if (props.currSelect !== state.selected && props.currSelect == null) {
            return {
                selected : props.initialSelect,
                markers : props.currMarkers
            };
        } else if (props.currMarkers.length !== state.markers.length) {
            return {
                markers : props.currMarkers
            }
        }
        return null;
    }

    onChildClick = (key, childProps) => {
        var markers = this.state.markers;
        if (key !== 0) {
            for (var i = 0; i < this.state.markers.length; i++) {
                if (key === markers[i].name) {
                    if (this.state.selected) {
                        this.state.selected.color = "red";
                    }  
                    this.props.updateSelected(markers[i]);
                    this.setState({selected: this.props.currSelect});
                }
            }
        } else {
            this.setState({selected: this.props.currSelect});
        }
    };

    onClick = (props) => {
        this.props.updateSelected(null);
        if (this.state.selected) {
            this.state.selected.color = "red";
        }
        this.setState({selected: this.props.currSelect});
    };
        
    async removeMarker() {
        await locationManager.removeLocation(this.state.selected);
        this.setState({markers : await locationManager.updateLocations(), selected: null});
    };

    render() {
        var details, weapons, contact, phone, description;
        var editDisabled = false;
        this.isSignedIn();

        if (this.state.selected !== null) {
            editDisabled = true;
        }

        if (this.state.selected !== undefined && this.state.selected !== null) {

        if (this.state.selected.weapons == "" || this.state.selected.weapons == null) {
            weapons = "none";
        } else {
            weapons = "block";
        }

        if (this.state.selected.contact == "" || this.state.selected.contact == null) {
            contact = "none";
        } else {
            contact = "block";
        }

        if (this.state.selected.phone == "" || this.state.selected.phone == null) {
            phone = "none";
        } else {
            phone = "block";
        }

        if (this.state.selected.description == "" || this.state.selected.description == null) {
            description = "none";
        } else {
            description = "block";
        }

            details = (<div className="locDetails" id="details" style={{display: "block"}}>
                            <i style={{display:isUser}} onClick={this.removeMarker} className="fas fa-trash-alt">
                            <span className = "tooltip">Remove This Club</span></i>
                            <i style={{display:isUser}} disabled={!editDisabled} onClick={this.openEditForm} className="fas fa-pencil-alt">
                            <span className = "tooltip">Edit This Club</span></i>
                            <h1>{this.state.selected.name}</h1>
                            <br/>
                            <h2>{this.state.selected.address}</h2>
                            <br/>
                            <hr></hr>
                            <div style = {{display:contact}}><h3 className="fas fa-user"></h3>
                            <h4>{this.state.selected.contact}</h4></div>

                            <div style = {{display:phone}}><h3 className="fas fa-phone"></h3>
                            <h4>{this.state.selected.phone}</h4></div>

                            <h3 className="fas fa-globe"></h3>
                            <a href={this.state.selected.website}>{this.state.selected.website}</a>
                            <br/>

                            <h3 className="fas fa-envelope"></h3>
                            <a href={this.state.selected.email}>{this.state.selected.email}</a>
                            <br/>

                            <div style = {{display:weapons}}><h3 className="fas fa-fan"></h3>
                            <h4>{this.state.selected.weapons}</h4></div>

                            <div style={{display:description}}><hr></hr>
                            <h4>{this.state.selected.description}</h4></div>
                </div>
                )
        } else {
            details = <div className="locDetails" id="details" style={{display: "none"}}/>
        }

        return (
            // Important! Always set the container height explicitly
            <div className='Map' style={{ height: '100vh', width: '100%'}}>
            {details}
                <GoogleMapReact
                    bootstrapURLKeys={{ key: config.API_KEY}}
                    defaultZoom= {5}
                    zoom={this.state.markers.selected}
                    onChildClick={this.onChildClick}
                    onClick = {this.onClick}
                    center = {this.state.center}
                >
                    <Marker
                        lat={this.state.defaultCenter.lat}
                        lng={this.state.defaultCenter.lng}
                        color="blue"
                    />

                    { //Add a list of Markers to Your Map
                        this.state.markers && this.state.markers.map( (each) =>
                            <Marker key={each.name}
                                lat = {each.lat}
                                lng = {each.lng}
                                color = {each.color}
                            />)
                    }
                </GoogleMapReact>
            </div>
        );
    }

    openEditForm() {
        document.getElementById("EditFormDiv").style.display = "block";
        document.getElementById("shadow").style.display = "block";
    }
    
    isSignedIn() {
        if (document.getElementById("topNav") != null) {
            if (document.getElementById("topNav2").style.display == "block" || document.getElementById("topNav").style.display == "block") {
                isUser = "block";
            } else {
                isUser = "none";
            }
        }
    }
}

export default SimpleMap;

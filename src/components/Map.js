import React from 'react';
import "../css/map.css";
import "../css/directory.css";
import "../css/confirmationBox.css"
import GoogleMapReact from 'google-map-react';
import { config } from '../tools/config.js';

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
                zoom: 5,
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
                            zoom: 5,
                            markers: this.props.currMarkers,
                            selected: this.props.currSelect
                        });
                    })
            }
            if (this.props.currSelect) {
                this.setState({zoom: 9});
            }
        this.onChildClick = this.onChildClick.bind(this);
        this.removeMarker = this.removeMarker.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        if (props.currSelect !== state.selected && props.currSelect !== null) {
            return {
                selected : props.currSelect,
                center: { lat : props.currSelect.lat, lng: props.currSelect.lng },
                markers : props.currMarkers,
                zoom : 9
            };
        } else if (props.currSelect !== state.selected && props.currSelect == null) {
            return {
                selected : props.currSelect,
                markers : props.currMarkers,
                zoom : 5
            };
        } else if (!props.equalMarkers(props.currMarkers, state.markers)) {
            return {
                selected : props.currSelect,
                markers : props.currMarkers
            }
        } else if (props.currSelect && state.centerChange === true) {
            return {
                center: { lat : props.currSelect.lat, lng: props.currSelect.lng },
                centerChange : false
            };
        } else if (props.currSelect !== state.selected) {
            return {
                selected: props.currSelect,
                center: {lat: props.currSelect.lat, lng: props.currSelect.lng},
                markers: props.currMarkers,
                zoom: 9
            };
        }
        return null;
    }

    onChildClick = (key, childProps) => {
        var markers = this.state.markers;
        if (key !== 0) {
            for (var i = 0; i < this.state.markers.length; i++) {
                if (key === markers[i].name) {
                    if (this.state.selected) {
                        var selectedMarker = this.state.selected;
                        selectedMarker.color = "red";
                        this.setState({selected : selectedMarker});
                    }  
                    this.props.updateSelected(markers[i]);

                    this.setState({selected: this.props.currSelect, zoom: 9});
                }
            }
        } else {
            this.setState({selected: this.props.currSelect, zoom: 9});
        }
    };

    onClick = (props) => {
        this.props.updateSelected(null);
        if (this.state.selected) {
            this.state.selected.color = "red";
        }
        this.setState({selected: this.props.currSelect});
    };

    displayConfirm() {
        document.getElementById("confirm").style.display = "block";
    }
        
    async removeMarker() {
        this.props.removeMarker();
    };

    keepMarker() {
        document.getElementById("confirm").style.display = "none";
    }

    render() {
        var details, confirm, weapons, contact, phone, description;
        var editDisabled = false;
        this.isSignedIn();

        if (this.state.selected !== null) {
            editDisabled = true;
        }

        if (this.state.selected !== undefined && this.state.selected !== null) {

        if (this.state.selected.weapons === "" || this.state.selected.weapons == null) {
            weapons = "none";
        } else {
            weapons = "block";
        }

        if (this.state.selected.contact === "" || this.state.selected.contact == null) {
            contact = "none";
        } else {
            contact = "block";
        }

        if (this.state.selected.phone === "" || this.state.selected.phone == null) {
            phone = "none";
        } else {
            phone = "block";
        }

        if (this.state.selected.description === "" || this.state.selected.description == null) {
            description = "none";
        } else {
            description = "block";
        }

        details = (<div className="locDetails" id="details" style={{display: "block"}}>
            <i style={{display:isUser}} onClick={this.displayConfirm} className="fas fa-trash-alt">
                <span className = "tooltip">Remove This Club</span></i>
            <i style={{display:isUser}} disabled={!editDisabled} onClick={this.openEditForm} className="fas fa-pencil-alt">
                <span className = "tooltip">Edit This Club</span></i>
            <h1>{this.state.selected.name}</h1>
            <br/>
            <h2>{this.state.selected.address}</h2>
            <br/>
            <hr></hr>
            <div style = {{display:contact}}><h3 className="fas fa-user"> </h3>
            <p>{this.state.selected.contact}</p></div>

            <div style = {{display:phone}}><h3 className="fas fa-phone"> </h3>
            <p>{this.state.selected.phone}</p></div>

            <h3 className="fas fa-globe">
            <a href={this.state.selected.website}>{this.state.selected.website}</a> </h3>
            <br/>

            <h3 className="fas fa-envelope">
            <a href={this.state.selected.orgEmail}>{this.state.selected.orgEmail}</a> </h3>

            <div style = {{display:weapons}}><h3 className="fas fa-fan"> </h3>
            <p>{this.state.selected.weapons}</p></div>

            <div style={{display:description}}><hr></hr>
            <p>{this.state.selected.description}</p></div>
        </div>
        )

        confirm = (<div className = "confirmClub" id="confirm">
        <p>Are you sure you want to remove this club?</p>
        <button onClick={this.removeMarker} id="removeClub"><i className = "fas fa-check"></i></button>
        <button onClick={this.keepMarker} id="keepClub"><i className = "fas fa-times"></i></button>
        </div>)

        } else {
            details = <div className="locDetails" id="details" style={{display: "none"}}/>
            confirm = <div className = "confirmClub" id="confirm" style={{display: "none"}}/>
        }

        return (
            // Important! Always set the container height explicitly
            <div className='Map' style={{ height: '100%', width: '100%'}}>
            {details}
            {confirm}
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
                    {
                        this.state.selected &&
                        <Marker key={this.state.selected.name}
                           lat = {this.state.selected.lat}
                           lng = {this.state.selected.lng}
                           color = {this.state.selected.color}
                        />
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
            if (document.getElementById("topNav2").style.display === "block" || document.getElementById("topNav").style.display === "block") {
                isUser = "block";
            } else {
                isUser = "none";
            }
        }
    }
}

export default SimpleMap;

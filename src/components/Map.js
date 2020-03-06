import React from 'react';
import "../css/map.css";
import "../css/directory.css";
import GoogleMapReact from 'google-map-react';
import { config } from '../tools/config.js';

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
                selected : props.intialSelect,
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
                    console.log(this.state.selected);
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


    render() {
        var details;
        if (this.state.selected !== undefined && this.state.selected !== null) {
            details = (<div className="locDetails">
                    <h2>{this.state.selected.name}</h2>
                <table>
                    <tbody>
                        <tr>
                            <i className="fa fa-map-marker"></i>
                            <th>{this.state.selected.address}</th>
                        </tr>
                    </tbody>
                </table>
                </div>
                )
        } else {
            details = <div className="locDetails" style={{display: "none"}}/>
        }
        return (
            // Important! Always set the container height explicitly
            <div className='Map' style={{ height: '90vh', width: '100%'}}>
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
                {details}
            </div>
        );
    }
}

export default SimpleMap;

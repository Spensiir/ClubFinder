import React from 'react';
import "../css/map.css";
import GoogleMapReact from 'google-map-react';
import {config} from '../tools/config.js';

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
                selected: this.props.initialSelect,
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
                            selected: this.props.initialSelect
                        });
                    })
            }

        this.onChildClick = this.onChildClick.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        if (props.initialSelect !== state.selected && props.initialSelect !== null) {
            return {
                selected : props.initialSelect,
                center: { lat : props.initialSelect.lat, lng: props.initialSelect.lng },
            };
        } else if (props.initialSelect !== state.selected && props.initialSelect == null) {
            console.log("here");
            return {
                selected : props.intialSelect,
            };
        }
        return null;
    }

    onChildClick = (key, childProps) => {
        var markers = this.state.markers;
        if (key !== 0) {
            for (var i = 0; i < this.state.markers.length; i++) {
                if (key === markers[i].name) {
                    this.props.updateSelected(markers[i]);
                    this.setState({selected: this.props.initialSelect});
                }
            }
        } else {
            this.setState({selected: this.props.initialSelect});
        }
    };

    onClick = (props) => {
        this.props.updateSelected(null);
        this.setState({selected: this.props.initialSelect});
    };


    render() {
        var details;
        if (this.state.selected !== undefined && this.state.selected !== null) {
            console.log("there is a location");
            details = (<div className="locDetails">
                    <h2>{this.state.selected.name}</h2>
                <table>
                    <tbody>
                        <tr>
                            <th>Address :</th>
                            <th>{this.state.selected.address + ', '
                                + this.state.selected.city + ', '
                                + this.state.selected.state + ' '
                                + this.state.selected.zip }</th>
                        </tr>
                    </tbody>
                </table>
                </div>
                )
        } else {
            console.log("not a location");
            details = <div className="locDetails" style={{display: "none"}}/>
        }
        return (
            // Important! Always set the container height explicitly
            <div className='Map' style={{ height: '80vh', width: '90%'}}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: config.API_KEY}}
                    defaultZoom={this.state.zoom}
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

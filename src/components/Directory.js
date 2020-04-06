import React from "react"
import "../css/directory.css"
import {editDistance} from "../tools/stringSearch"
import locationManager from "../managers/LocationManager.js"
import {organizationManager} from "../managers/OrganizationManager.js"
import Profile from '../components/Profile.js';

var keyVal = 0;
var isUser = "none";
var isNotOrg = "inline";
var isOrg = "none";

class Directory extends React.Component {

    constructor(props) {
        super(props);
        this.state = 
        {
            markers: this.props.currMarkers,
            filteredMarkers: this.props.currMarkers,
            orgs:this.props.organizations,
            allWords: "",
            selected : this.props.currSelect
        };
    }

    static getDerivedStateFromProps(props, state) {
        console.log(props.organizations, state.orgs);
        if (props.currSelect !== state.selected && !props.equalMarkers(props.currMarkers, state.markers)) {
            return {
                selected : props.currSelect,
                markers : props.currMarkers,
                filteredMarkers: props.currMarkers
            };
        } else if (props.currSelect !== state.selected) {
            return {
                selected : props.currSelect
            };
        } else if (!props.equalMarkers(props.currMarkers, state.markers)) {
            return {
                markers : props.currMarkers,
                orgs: props.organizations,
                filteredMarkers: props.currMarkers
            }
        } else if (!props.equalOrgs(props.organizations, state.orgs)) {
            return {
                markers : props.currMarkers,
                orgs: props.organizations,
                filteredMarkers: props.currMarkers
            }
        }
        return null;
    }

    onChildClick = (key) => {
        var markers = this.state.markers;
        if (key !== 0) {
            for (var i = 0; i < this.state.markers.length; i++) {
                if (key === markers[i].name) {
                    if (this.state.selected) {
                        var selectedMarker = this.state.selected;
                        selectedMarker.color = "red";
                        this.setState({selected : selectedMarker});
                        console.log("selected: ", this.state.selected);
                    }
                    this.props.updateSelected(markers[i]);

                    this.setState({selected: this.props.currSelect, zoom: 9});
                }
            }
        } else {
            this.setState({selected: this.props.currSelect, zoom: 9});
        }
    };

    onOrgClick = (key) => {
        var orgs = this.state.orgs;
        if (key !== 0) {
            for (var i = 0; i < this.state.orgs.length; i++) {
                if (key === orgs[i].email) {
                    this.props.updateMarkers(orgs[i].email);
                }
            }
        } else {
            console.log('org is 0');
        }
    };

    render() {
        isSignedIn();
        var editDisabled = false;
        var displayStr = "none";
        if (this.props.isAdmin) {
            displayStr = 'inline';
        }
        console.log(displayStr);
        return (
            <div id="Directory" className="directory">
                <div id="nonOrgButtons" style={{display:isNotOrg}}><br/>
                <button onClick={activeBtn()} id="clubs" className="btn1 active">Clubs</button>
                <button onClick={activeBtn()} id="orgs" className="btn1">Organizations</button>
                <br/></div>
                <div id="orgButtons" style={{display:isOrg}}><br/>
                <button id="clubs2" className="btnGray">Clubs</button>
                <button id="orgs2" className="btnGray">Organizations</button>
                <br/></div>
                <input onChange={e => this.searchFunction()} id="searchInput" type="text" placeholder="Search the Club List..." name="search"></input>
                <i style={{display:isUser}} id="addPlus" onClick={e => this.openAddForm()} className="fas fa-plus">
                <span className="tooltip">Add A New Club</span></i>
                <ul id="UL">
                {
                    this.state.filteredMarkers.map( (each) =>
                        <li type="button" onClick={e => this.onChildClick(each.name)} key={keyVal++} id="listItem">
                            <h2>{each.name}</h2>
                            <h3>{each.address}</h3>
                            <h4>{each.distance}</h4>
                        </li>
                    )
                }
                </ul>
                <ul style={{display:"none"}} id="UL2">
                {
                    this.state.orgs.map( (each) =>
                        <li type="button" style={{paddingBottom:"12px"}} onClick={e => this.onOrgClick(each.email)} key={keyVal++} id="listItem">
                        <h2>{each.name}</h2>
                        <a href={each.website}>{each.website}</a>
                        <i id="removeOrg" style={{display:displayStr}} disabled={!this.props.isAdmin} onClick={e => this.eraseOrganization(each)} className="fas fa-trash-alt">
                        <span className = "tooltip">Remove This Organization</span></i>
                        <i id="editOrg" style={{display:displayStr}} disabled={!this.props.isAdmin} onClick={e => this.openProfile(each)} className="fas fa-pencil-alt">
                        <span className = "tooltip">Edit This Organization</span></i>
                    </li>
                    )
                }
                </ul>
            </div>
        )
    }
//how to open profile of org clicked?
    searchFunction() {
        //var input, li, a, i, txtValue;
        var input;
        input = document.getElementById("searchInput").value;
        //li = document.getElementsByTagName("li");
        // Loop through all list items, and hide those who don't match the search query
        var markers = this.state.markers;

        for (var i = 0; i < markers.length; i++) {
            var name = markers[i].name;
            var address = markers[i].address;

            markers[i].dist = editDistance(input.toUpperCase(), name.toUpperCase());
            var addy_dist = editDistance(input.toUpperCase(), address.toUpperCase());
            if (addy_dist < markers[i].dist) {
                markers[i].dist = addy_dist;
            }

            if (name.toUpperCase().includes(input.toUpperCase()) || address.toUpperCase().includes(input.toUpperCase())) {
                markers[i].dist = 0.0;
            }
        }

        markers = markers.filter(function (a) { return a.dist < .75});
        markers.sort(function (a, b) {
            return a.dist - b.dist
        })
        this.setState({filteredMarkers : markers});
    }

    openAddForm() {
        document.getElementById("AddFormDiv").style.display = "block";
        document.getElementById("shadow").style.display = "block";
    }


    eraseOrganization = async (org) => {
        this.props.eraseOrganization(org);
    };

    openProfile(organization) {
        console.log('open here');
        this.props.updateAdminSelectedOrg(organization);
        this.props.openProfile();
    }

}

function activeBtn() {
    //Get the active button using a loop
    var btns = document.getElementsByClassName("btn1");
    for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
        checkTab();
    });
}}

function isSignedIn() {
    if (document.getElementById("topNav") != null) {
        if (document.getElementById("topNav2").style.display == "block" || document.getElementById("topNav").style.display == "block") {
            isUser = "initial";
        } else {
            isUser = "none";
        }
        if (document.getElementById("topNav").style.display == "block") {
            isNotOrg = "none";
            isOrg = "inline";
            document.getElementById("UL").style.display = "block";
            document.getElementById("UL2").style.display = "none";
        } else {
            isNotOrg = "inline";
            isOrg = "none";
        }
    }
}

function checkTab() {
    if (document.getElementById("clubs").className === "btn1 active") {
        document.getElementById("UL").style.display = "block";
        document.getElementById("UL2").style.display = "none";
    } else {
        document.getElementById("UL").style.display = "none";
        document.getElementById("UL2").style.display = "block";
    }
}

export default Directory;
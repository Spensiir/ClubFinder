import React from "react"
import "../css/directory.css"
import {editDistance} from "../tools/stringSearch"
import "../css/confirmationBox.css"

var keyVal = 0;
var isUser = "none";
var isNotOrg = "inline";
var isOrg = "none";
var selectedOrg = "";

class Directory extends React.Component {

    constructor(props) {
        super(props);
        this.state = 
        {
            markers: this.props.currMarkers,
            filteredMarkers: this.props.currMarkers,
            orgs:this.props.organizations,
            allWords: "",
            selected : this.props.currSelect,
            isAdmin : this.props.isAdmin,
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (props.isAdmin !== state.isAdmin) {
              return {
                selected : props.currSelect,
                markers : props.currMarkers,
                filteredMarkers: props.currMarkers,
                isAdmin : props.isAdmin
              };
        } else if (props.currSelect !== state.selected && !props.equalMarkers(props.currMarkers, state.markers)) {
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

    onChildClick = (listElement, key) => {
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

        var adminFunctions;
        if (this.state.isAdmin) {
            adminFunctions = "inline";
        } else {
            adminFunctions = "none";
        }

        return (
            <div id="Directory" className="directory">
                <div id="nonOrgButtons" style={{display:isNotOrg}}><br/>
                <button style={{width:"40%"}} onClick={activeBtn()} id="clubs" className="btn1 active">Clubs</button>
                <button style={{width:"60%"}} onClick={activeBtn()} id="orgs" className="btn1">Organizations</button>
                <br/></div>
                <div id="orgButtons" style={{display:isOrg}}><br/>
                <button style={{width:"40%"}} id="clubs2" className="btnGray">Clubs</button>
                <button style={{width:"60%"}} id="orgs2" className="btnGray">Organizations</button>
                <br/></div>
                <input onChange={e => this.searchFunction()} id="searchInput" type="text" placeholder="Search the Club List..." name="search"></input>
                <i style={{display:isUser}} id="addPlus" onClick={e => this.openAddForm()} className="fas fa-plus">
                <span className="tooltip">Add A New Club</span></i>

                <ul id="UL">
                {
                    this.state.filteredMarkers.map( (each) =>
                        <li type="button" key={keyVal++} onClick={e => this.onChildClick(each, each.name)} id="listItem">
                            <h2>{each.name}</h2>
                            <h3>{each.address}</h3>
                            <h4>{each.distance}</h4>
                        </li>
                    )
                }
                </ul>

                <ul style={{width:"0px", marginLeft: "-100px"}} id="UL2">
                {
                    this.state.orgs.map( (each) =>
                        <li type="radio" checked style={{paddingBottom:"12px"}} onClick={e => this.onOrgClick(each.email)} key={keyVal++} id="listItem">
                            <h2>{each.name}</h2>
                            <a href={each.website} target="_blank" rel="noopener noreferrer">{each.website}</a>

                            <h5 id="removeOrg" style={{display:adminFunctions}} disabled={!this.props.isAdmin} onClick={e => this.eraseOrganization(each)} className="fas fa-trash-alt"> </h5>
                            <h5 id="editOrg" style={{display:adminFunctions}} disabled={!this.props.isAdmin} onClick={e => this.openProfile(each)} className="fas fa-pencil-alt"> </h5>
                        </li>
                    )
                }
                </ul>

                <div className = "confirmOrg" id="confirmOrgRemove">
                    <p style={{marginBottom:"0"}}>Are you sure you want to remove <b>{selectedOrg.name}</b> and all of its locations?</p>
                    <p style={{color:"gray"}}>Note: This action cannot be undone</p>
                    <button onClick={this.confirmErase} id="confirmRemove"><i className = "fas fa-check"></i></button>
                    <button onClick={this.keepOrg} id="keepOrg"><i className = "fas fa-times"></i></button>
                </div>

            </div>
        )
    }

    searchFunction() {
        var input = document.getElementById("searchInput").value;
        var markers = this.state.markers;

        // Loop through all list items, and hide those who don't match the search query
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
        document.getElementById("AddFormDiv").style.height = "560px";
        document.getElementById("AddFormDiv").style.opacity = "1";
        document.getElementById("shadow").style.opacity = "0.4";
        document.getElementById("shadow").style.height = "100%";
    }

    eraseOrganization = async (org) => {
        selectedOrg = org;
        this.setState({selected : null});
        document.getElementById("confirmOrgRemove").style.opacity = "1";
        document.getElementById("confirmOrgRemove").style.marginLeft = "-200px";
    };

    confirmErase = async () => {
        this.props.eraseOrganization(selectedOrg);
        document.getElementById("confirmOrgRemove").style.opacity = "0";
        document.getElementById("confirmOrgRemove").style.marginLeft = "-500px";
        document.getElementById("resetLocations").style.pointerEvents = "none";
        document.getElementById("resetLocations").style.transform = "rotateY(90deg)";
    }

    keepOrg() {
        document.getElementById("confirmOrgRemove").style.opacity = "0";
        document.getElementById("confirmOrgRemove").style.marginLeft = "-500px";
    }

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
        if (document.getElementById("topNav").style.display === "block") {
            isUser = "initial";
            isNotOrg = "none";
            isOrg = "inline";
            if (document.getElementById("clubs").style.marginLeft === "0px" || document.getElementById("UL2").style.marginLeft === "0px") {
                document.getElementById("UL").style.width = "310px";
                document.getElementById("UL").style.marginLeft = "0px";
                document.getElementById("UL2").style.width = "0px";
                document.getElementById("UL2").style.marginLeft = "-100px";
            }
        } else if (document.getElementById("topNav2").style.display === "block") {
            isUser = "initial";
        } else {
            isUser = "none";
            isNotOrg = "inline";
            isOrg = "none";
        }
    }
}

function checkTab() {
    if (document.getElementById("clubs").className === "btn1 active") {
        document.getElementById("UL").style.width = "310px";
        document.getElementById("UL").style.marginLeft = "0px";
        document.getElementById("UL2").style.width = "0px";
        document.getElementById("UL2").style.marginLeft = "-100px";
    } else {
        document.getElementById("UL").style.width = "0px";
        document.getElementById("UL").style.marginLeft = "-100px";
        document.getElementById("UL2").style.width = "310px";
        document.getElementById("UL2").style.marginLeft = "0px";
    }
}

export default Directory;
import React from "react"
import "../css/directory.css"
import {editDistance} from "../tools/stringSearch"

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
            allWords: "",
            selected : this.props.currSelect
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.currSelect !== state.selected) {
            return {
                selected : props.currSelect,
                markers : props.currMarkers,
                filteredMarkers: props.currMarkers
            };
        } else if (props.currMarkers.length !== state.markers.length) {
            return {
                markers : props.currMarkers,
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

    render() {
        isSignedIn();
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
                        </li>
                    )
                }
                </ul>
            </div>
        )
    }

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
                //console.log(markers[i].dist);
            }
        }

        markers = markers.filter(function (a) { return a.dist < .75});
        markers.sort(function (a, b) {
            if (a.dist <= b.dist) {
                return -1;
            }
            return 1});
        this.setState({filteredMarkers : markers});
    }

    openAddForm() {
        document.getElementById("AddFormDiv").style.display = "block";
        document.getElementById("shadow").style.display = "block";
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
        } else {
            isNotOrg = "inline";
            isOrg = "none";
        }
    }
}

export default Directory;
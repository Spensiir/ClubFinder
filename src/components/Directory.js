import React from "react"
import "../css/directory.css"

var keyVal = 0;

class Directory extends React.Component {

    constructor(props) {
        super(props);
        this.state = 
        {
            markers: this.props.currMarkers,
            allWords: ""
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.currMarkers.length !== state.markers.length) {
            return {markers: props.currMarkers}
        }
        return null
    }

    render() {
        return (
            <div id="Directory" className="directory">
                <button onClick={activeBtn()} className="btn1 active">Clubs</button>
                <button onClick={activeBtn()} className="btn1">Organizations</button>
                <br/>
                <input onChange={e => searchFunction()} id="searchInput" type="text" placeholder="Search.." name="search"></input>
                <button className="btn2" type="submit"><i className="fa fa-search"></i></button>
                <br/>
                <ul>
                { 
                    this.state.markers.map( (each) =>
                        <li type="button" onClick={displayDetails(each.name)} key={keyVal++} id="listItem">
                            <h2>{each.name}</h2>
                            <h3>{each.address}</h3>
                        </li>
                    )
                }
                </ul>
            </div>
        )
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

function searchFunction() {
    var input, li, a, i, txtValue;
    input = document.getElementById("searchInput");
    li = document.getElementsByTagName("li");
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      a = li[i];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(input.value.toUpperCase()) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
}

function displayDetails(name) {
    console.log(name);
}

export default Directory;
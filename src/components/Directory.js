import React from "react"
import "../css/directory.css"

const randomArr = ["potato", "tomato", "eggplant", "flamin' hot cheetos", "zucchini"];
var keyVal = 0;

class Directory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {something: 'something'};
    }

    render() {

        return (
            <div id="Directory" className="directory">
                <button onClick={activeBtn()} className="btn1 active">Clubs</button>
                <button onClick={activeBtn()} className="btn1">Organizations</button>
                <br/>
                <input onKeyUp={searchFunction()} id="searchInput" type="text" placeholder="Search.." name="search"></input>
                <button className="btn2" type="submit"><i className="fa fa-search"></i></button>
                <br/>
                <ul>
                { //Add a list of Markers to Your Map
                    randomArr.map( (each) =>
                        <li key={keyVal++} id="listItem">{each}</li>
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
    // Declare variables
    var input, li, a, i, txtValue;
    input = document.getElementById("searchInput");
    console.log(input);
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

export default Directory;
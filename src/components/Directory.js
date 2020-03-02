import React from "react"
import "../css/directory.css"

const randomArr = ["potato", "tomato", "eggplant", "flamin' hot cheetos", "zucchini"];

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
                <input type="text" placeholder="Search.." name="search"></input>
                <button className="btn2" type="submit"><i className="fa fa-search"></i></button>
                <br/>
                <ul>
                { //Add a list of Markers to Your Map
                    randomArr.map( (each) =>
                        <li>{each}</li>
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

export default Directory;
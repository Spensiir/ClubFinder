import React from "react"
import "../css/searchBar.css"

class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {something: 'something'};
    }
    render() {
        return (
            <div className="topnav">
                <button className="default" href="#home">Sign In To Manage Your Clubs!</button>
                <button id="signin" href="#signin">Sign In</button>
                <button id="register" href="#register">Register</button>
                <input type="text" placeholder="Search.."></input>
            </div>
        )
    }
}

export default SearchBar;
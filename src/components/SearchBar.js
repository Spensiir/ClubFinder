import React from "react"
import "../css/searchBar.css"

class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {something: 'something'};
    }
    render() {
        return (
            <div class="topnav">
                <a class="active" href="#home">Home</a>
                <a href="#about">About</a>
                <a href="#contact">Contact</a>
                <input type="text" placeholder="Search.."></input>
            </div>
        )
    }
}

export default SearchBar;
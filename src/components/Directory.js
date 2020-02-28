import React from "react"
import "../css/directory.css"

class Directory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {something: 'something'};
    }
    render() {
        return (
            <div className="directory">
                <button class="active" id='clubs'>Clubs</button>
                <button id='orgs'>Organizations</button>
                <br/>
                <input type="text" placeholder="Search.." name="search"></input>
                <button class="btn1" type="submit"><i class="fa fa-search"></i></button>
            </div>
        )
    }
}

export default Directory;
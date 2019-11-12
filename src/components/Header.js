import React from 'react';
import '../css/header.css';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = { logButton : (<div className="sign-in">
                <p>Looking to add new clubs?</p>
                <button onClick={this.signOut}>LOG IN</button>
            </div>),
            name: null};
    }

    signIn = (name) => {
        this.setState({
            logButton : (<div className="sign-in">
                <p>Hi, </p>
                <button onClick={this.signOut}>LOG OUT</button>
            </div>),
            name: name
        });
    }

    signOut = () => {
        this.setState({ logButton : (<div className="sign-in">
                <p>Looking to add new clubs?</p>
                <button onClick={this.signIn}>LOG IN</button>
            </div>),
           name: null
        });
    }
    render () {
        return (
            <div className="header">
                <div className="title">
                    <h1>HEMAA Club Finder</h1>
                </div>
                    {this.state.logButton}
            </div>
        );
    }
}

export default Header;

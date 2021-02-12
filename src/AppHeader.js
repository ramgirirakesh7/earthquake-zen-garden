import React, { Component } from 'react';
import {Link} from "react-router-dom";
import { withRouter } from "react-router-dom";

 class AppHeader extends Component {


    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {};
    }

    handleClick = () => {
        this.props.history.push(`/list`);
    };

    render() {
        return (
        <header className="App-header">
           <img  src={this.props.site.logoImage} className="App-logo" alt="logo"  onClick={this.handleClick}/>
          <h1 className="App-title">{this.props.site.title}</h1>
            <li>
                <Link to="/user" className="url-text">Welcome {this.props.profile.firstName}</Link>
            </li>
        </header>
        );
    }
}

export default withRouter(AppHeader)

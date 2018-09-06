import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from './../assets/reduxlogo2.png';

const Header = () => (
    <header className="header">
        <div id='topLeft'>
            <img className="reduxlogo" src={logo} />
            <h1>Redux Syntax Helper</h1>
        </div>
        
        <div id='topRight'>
            <NavLink className="links" to="/" activeClassName="is-active" exact={true}>Tool</NavLink>
            {/* <NavLink className="links" to="/about" activeClassName="is-active">About</NavLink>
            <NavLink className="links" to="/help" activeClassName="is-active">Help</NavLink> */}
            <a target="_blank" className="links footerGithubLink" href="https://github.com/the3ddy/Redux-Syntax-Helper">GitHub/About/Help</a>
        </div>
    </header>
);

export default Header;
import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
    <header className="header">
        <div id='topLeft'>
            <h1>Redux Syntax Helper</h1>
        </div>
        
        <div id='topRight'>
            <NavLink className="links" to="/" activeClassName="is-active" exact={true}>Tool</NavLink>
            <NavLink className="links" to="/help" activeClassName="is-active">Help</NavLink>
            <NavLink className="links" to="/about" activeClassName="is-active">About</NavLink>
        </div>
    </header>
);

export default Header;
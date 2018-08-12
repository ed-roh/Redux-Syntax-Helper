import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
    <header>
        <NavLink to="/" activeClassName="is-active" exact={true}>Tool</NavLink>
        <NavLink to="/help" activeClassName="is-active">Help</NavLink>
        <NavLink to="/about" activeClassName="is-active">About</NavLink>
    </header>
);

export default Header;
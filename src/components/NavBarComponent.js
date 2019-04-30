import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import EnsureLoggedIn from '../EnsureLoggedIn';
import logo from '../images/Rivallogo.png';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

import '../App.css';

const NavBarComponent = () => (
    <div>
        <Navbar>
            <NavbarBrand><img src={logo} className="nav-logo" /></NavbarBrand>
            <Nav navbar>
                <EnsureLoggedIn invertCondition={true}>
                    <button className="primary-button"><Link to="/login">Login</Link></button>
                </EnsureLoggedIn>
                <EnsureLoggedIn>
                    <NavItem className="SingleLink"><Link to="/">Home</Link></NavItem>
                    <NavItem className="SingleLink"><Link to="campaignview">Campaign View</Link></NavItem>
                    <NavItem className="SingleLink"><Link to="/logout">LogOut</Link></NavItem>
                </EnsureLoggedIn>
            </Nav>
        </Navbar>
    </div>
)
export default NavBarComponent;


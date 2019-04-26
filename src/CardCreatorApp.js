import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import EnsureLoggedIn from './EnsureLoggedIn';
import Upload from './upload/Upload';
import Logout from './components/Logout'
import ActiveCard from './ActiveCard';
import CampaignView from './components/CampaignView/index';
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

import './App.css';


const CardCreatorApp = () => (
    <Router>
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand>Rival Scratch Reward Manager</NavbarBrand>
                <Nav className="ml-auto" navbar>

                    <NavItem><Link to="/login">Login</Link></NavItem>
                    <EnsureLoggedIn>
                        <NavItem className="SingleLink"><Link to="/">Home</Link></NavItem>
                        <NavItem className="SingleLink"><Link to="campaignview">Campaign View</Link></NavItem>
                        <NavItem className="SingleLink"><Link to="/logout">LogOut</Link></NavItem>
                    </EnsureLoggedIn>
                </Nav>
            </Navbar>
            <Switch>
                <Route exact path="/login" component={Login} />
                <EnsureLoggedIn>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/campaignview" component={CampaignView} />
                    <Route exact path="/logout" component={Logout} />
                </EnsureLoggedIn>
            </Switch>
        </div>
    </Router>
)
export default CardCreatorApp;

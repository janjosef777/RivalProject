import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import EnsureLoggedIn from './EnsureLoggedIn';
import Upload from './upload/Upload';
import Logout from './components/Logout'
import ActiveCard from './ActiveCard';
import CampaignView from './components/CampaignView/index';
import CreateCampaign from './components/CampaignCrud/CreateCampaign';
import DeleteCampaign from './components/CampaignCrud/DeleteCampaign';
import logo from '../src/images/Rivallogo.png';
import arrow from '../src/images/arrow.png';
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
    <div>
        <Router>
                <Navbar>
                    <NavbarBrand><img src={logo} className="nav-logo"/></NavbarBrand>
                    <Nav navbar>

                        <button className="primary-button"><Link to="/login">Login</Link></button>
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
                        <Route exact path="/CreateCampaign" component={CreateCampaign} />
                        <Route exact path="/DeleteCampaign" component={DeleteCampaign} />
                        <Route exact path="/campaignview" component={CampaignView} />
                        <Route exact path="/logout" component={Logout} />
                    </EnsureLoggedIn>
                </Switch>
        </Router>
        <div className="landingpage-wrapper">
            <h1>Welcome to your scratch & win card manager</h1>
            <h3>Login and get started with creating campaigns</h3>
        </div>
        <img src={arrow} className="home-arrow"/>
    </div>
)
export default CardCreatorApp;

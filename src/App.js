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
import NavBarComponent from './components/NavBarComponent';


const CardCreatorApp = () => (
    <Router>
            <Switch>
                <Route exact path="/activecard/:title/:overlaySrc/:resultTitle/:resultSrc" component={ActiveCard} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/logout" component={Logout} />
                <EnsureLoggedIn renderNav={true}>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/CreateCampaign" component={CreateCampaign} />
                    <Route exact path="/DeleteCampaign" component={DeleteCampaign} />
                    <Route exact path="/campaignview" component={CampaignView} />                    
                </EnsureLoggedIn>
            </Switch>
    </Router>
)
export default CardCreatorApp;

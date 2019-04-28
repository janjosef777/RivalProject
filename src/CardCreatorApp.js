import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import CardCreation from './components/CardCreation';
import Cards from './components/Cards';
import Prizes from './components/Prizes';
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
                        <NavItem className="SingleLink"><Link to="cardcreation">Card Creation</Link></NavItem>
                        <NavItem className="SingleLink"><Link to="/allcards">All Cards</Link></NavItem>
                        <NavItem className="SingleLink"><Link to="/allprizes">All Prizes</Link></NavItem>
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
                    <Route exact path="/cardcreation" component={CardCreation} />
                    <Route exact path="/allcards" component={Cards} />
                    <Route exact path="/allprizes" component={Prizes} />
                    <Route exact path="/logout" component={Logout} />
                </EnsureLoggedIn>
            </Switch>
        </div>
    </Router>
)
export default CardCreatorApp;

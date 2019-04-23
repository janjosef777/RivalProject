import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import CardCreation from './components/CardCreation';
import FinalCreation from './components/FinalCreation';
import RandomImages from './components/RandomImages';
import EnsureLoggedIn from './EnsureLoggedIn';
import Upload from './upload/Upload';
import Logout from './components/Logout';
import AssetTabView from './components/AssetsTabView';
import Overlay from './components/Overlay';
import CardResult from './components/CardResult';

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


const App = () => (
  <Router>
    <div>

      <Navbar color="light" light expand="md">
        <NavbarBrand>Rival Scratch Reward Manager</NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem><Link to="/login">Login</Link></NavItem>
          <EnsureLoggedIn>
            <NavItem><Link to="/">Home</Link></NavItem>
            <NavItem><Link to="/cardcreation">Card Creation</Link></NavItem>
            <NavItem><Link to="/finalcreation">Final Creation</Link></NavItem>
            <NavItem><Link to="/randomimages">Random Images</Link></NavItem>
            <NavItem><Link to="/assettabview">Asset Tab View</Link></NavItem>
            <NavItem><Link to="/logout">LogOut</Link></NavItem>
          </EnsureLoggedIn>
        </Nav>
      </Navbar>
      <Switch>
        <Route exact path="/login" component={Login} />
        <EnsureLoggedIn>
          <Route exact path="/" component={Home} />
          <Route exact path="/cardcreation" component={CardCreation} />
          <Route exact path="/finalcreation" component={FinalCreation} />
          <Route exact path="/randomimages" component={RandomImages} />
          <Route exact path="/assettabview" component={AssetTabView} />
          <Route exact path="/upload" component={Upload} />
          <Route exact path="/overlay" component={Overlay} />
          <Route exact path="/cardresult" component={CardResult} />
          <Route exact path="/logout" component={Logout} />
        </EnsureLoggedIn>
      </Switch>
    </div>
  </Router>
)

export default App;

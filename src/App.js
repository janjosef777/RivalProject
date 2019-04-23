import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import CardCreation from './components/CardCreation';
import FinalCreation from './components/FinalCreation';
import CardResults from './components/CardResults';
import EnsureLoggedIn from './EnsureLoggedIn';
import Upload from './upload/Upload';
import Logout from './components/Logout'
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
          
          <EnsureLoggedIn>
            <NavItem><Link to="/login">Login</Link></NavItem>
            <NavItem><Link to="/">Home</Link></NavItem>
            <NavItem><Link to="/cardcreation">Card Creation</Link></NavItem>
            <NavItem><Link to="/finalcreation">Final Creation</Link></NavItem>
            <NavItem><Link to="/randomimages">Random Images</Link></NavItem>
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
          <Route exact path="/cardresults" component={CardResults} />
          <Route exact path="/upload" component={Upload} />
          <Route exact path="/logout" component={Logout} />
        </EnsureLoggedIn>
      </Switch>
    </div>
  </Router>
)

export default App;

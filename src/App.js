import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import EnsureLoggedIn from './EnsureLoggedIn';
import Upload from './upload/Upload';
import Logout from './components/Logout'
import ActiveCard from './ActiveCard';
import CardCreatorApp from './CardCreatorApp';
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
  <div>
  <Router>
    <Switch>
      <Route exact path="/activecard/:id" component={ActiveCard} />
      <Route exact path="/" component={CardCreatorApp} />
    </Switch>
  </Router>
  </div>
  
)

export default App;

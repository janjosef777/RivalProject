import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import CardCreation from './components/CardCreation';
import FinalCreation from './components/FinalCreation';
import RandomImages from './components/RandomImages';
import Upload from './upload/Upload';
import './App.css';


const App = () => (
  <Router>
    <div>

      <div>
        <h1>Rival Scratch Reward Manager</h1>
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/cardcreation">Card Creation</Link></li>
          <li><Link to="/finalcreation">Final Creation</Link></li>
          <li><Link to="/randomimages">Random Images</Link></li>
        </ul>
      </div>
      <button><Link to="/upload">Upload</Link></button>
      
      <Route exact path="/upload" component={Upload} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={Home} />
      <Route exact path="/cardcreation" component={CardCreation} />
      <Route exact path="/finalcreation" component={FinalCreation} />
      <Route exact path="/randomimages" component={RandomImages} />
    </div>
  </Router>
)

export default App;

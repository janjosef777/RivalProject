import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import ActiveCard from './ActiveCard';
import CardCreatorApp from './CardCreatorApp';


import './App.css';


const App = () => (
  <div>
  <Router>
    <Switch>
      <Route exact path="/activecard/:title/:overlaySrc/:resultTitle/:resultSrc" component={ActiveCard} />
      <Route exact path="/" component={CardCreatorApp} />
    </Switch>
  </Router>
  </div>
  
)

export default App;

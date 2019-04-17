import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Upload from '../upload/Upload';

class CardCreation extends React.Component {
    render(){
        return(
            <div className="CardCreation">
                <Router>
                    <button><Link to="/upload">Upload</Link></button>
                    <Route exact path="/upload" component={Upload} />
                </Router>
            </div>
        )
    }
}

export default CardCreation;
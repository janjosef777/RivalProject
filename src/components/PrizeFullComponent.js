import React, { Component } from 'react';
import Upload from '../upload/Upload';
import '../styles/cardCreation.css';
import { Card, Button, CardTitle, CardText } from 'reactstrap'; 
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Prizes from './Prizes';
import SelectPrizes from './SelectPrizes';


class PrizeFullComponent extends Component {



    render(){
        return(
            <Router>
                <Route exact path="/allprizes" component={Prizes} />
                <Route exact path="/allprizes" component={SelectPrizes} /> 
            </Router>
        )
    }
}

export default PrizeFullComponent;
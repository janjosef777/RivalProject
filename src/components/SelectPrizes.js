import React, { Component } from 'react';
import Upload from '../upload/Upload';
import '../styles/cardCreation.css';
import { Card, Button, CardTitle, CardText } from 'reactstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Prizes from './Prizes';


class SelectPrizes extends Component {

    constructor(props) {
        super(props) 
        this.state = {
          prize:'',
        }
        this.addPrize   = this.addPrize.bind(this);
      }

      addPrize(e) {
        this.setState({prize:e.target.src});    
      }

    render(){
        return(
            <div>
                <Router>
                    <Route exact path="/allprizes" render={(props) => <Prizes onClick={this.addPrize} {...props} />}/>
                </Router>
                <div className="SelectPrizes">
                    <ul>
                        <li><img src={this.state.prize} className="SelectPrize"/></li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default SelectPrizes;
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
          prize:[],
        }
        this.addPrize   = this.addPrize.bind(this);
      }

      addPrize(e) {
        var newArray = this.state.prize.slice();
        newArray.push(e.target.src);
        this.setState({prize:newArray});
        
        console.log({prize:newArray});
        console.log({prize:e.target.src});
        // console.log(this.state.prize);

        // fetch('http://localhost:4000/api/images')
        //     .then(res => res.json())
        //     .then(res => {
        //         console.log(res);
        //         this.setState({prize:newArray});
        //     })
        //     .catch(err => {
        //         console.error(err);
        //     })

      }

    render(){
        return(
            <div>
                <Router>
                    <Route exact path="/allprizes" render={(props) => 
                    <Prizes onClick={this.addPrize} {...props} />}/>
                </Router>
                <div className="SelectPrizes">
                    <ul>
                    {this.state.prize.map((prize,idx) => 
                        <li key={idx}><img src={prize} alt="Selected Prize Image"/></li>
                    )}
                    </ul>
                </div>
            </div>
        )
    }
}

export default SelectPrizes;
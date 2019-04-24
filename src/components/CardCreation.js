import React, { Component } from 'react';
import Upload from '../upload/Upload';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Container, Row, Col } from 'reactstrap';
import '../styles/cardCreation.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Cards from './Cards';
import SelectPrizes from './SelectPrizes';
import PrizeFullComponent from './PrizeFullComponent';


class CardCreation extends Component {
    constructor(props) {
        super(props) 
        this.state = {
          title:'',
          overlayImg:'',
        }
        this.setTitle   = this.setTitle.bind(this);
        this.setOverlay   = this.setOverlay.bind(this);
      }


      setTitle(e) {
        this.setState({title:e.target.value});
      }

      setOverlay(e) {
            this.setState({overlayImg:e.target.src});
      }

    componentDidMount(){

    }
 
    render(){
        return(
            <div className="CardCreation">
                <div className="Sidebar">
                    <Router>
                    <ul className="Tabs">
                        <li><Link to="/allcards">Pick an overlay</Link></li>
                        <li><Link to="/allprizes">Pick prizes</Link></li>
                    </ul>
                    <Route exact path="/allcards" render={(props) => <Cards onClick={this.setOverlay} {...props} />} /> 
                    <Route exact path="/allprizes" component={SelectPrizes} />                  
                    </Router>
                </div>
                <div className="Card-Container">
                    <div>
                        <input value={this.state.title} onChange={this.setTitle} placeholder="Enter title for the campaign..." />
                        <CardTitle><h3>{this.state.title}</h3></CardTitle>
                    </div>
                    <div className="ImageHolder"><img src={this.state.overlayImg} /></div>
                    <button>Create Campaign</button>
                </div>
            </div>
            
        )
    }
}

export default CardCreation;
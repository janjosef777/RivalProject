import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button } from 'reactstrap';
import '../styles/home.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import CardCreation from './CardCreation';
import Cards from './Cards';
import Prizes from './Prizes';
import Nonprizes from './NonPrizes';

class Home extends Component {
    render(){
        return(
            <Router>
            <div className="Home">
                <div className="Home-Sidebar">
                        <ul>
                            <li><Link to="/allcampaigns">Campaigns</Link></li>
                            <li><Link to="/allcards">All Cards</Link></li>
                            <li><Link to="/allprizes">All Prizes</Link></li>
                            <li><Link to="/allnonprizes">All Non Prizes</Link></li>
                        </ul>
                    
                </div>
                <Route exact path="/allcards" component={Cards} />
                <Route exact path="/allprizes" component={Prizes} />
                <Route exact path="/allnonprizes" component={Nonprizes} />

            {/* <Router>
                <div className="container">
                <Card className="cardCampaign">
                    <CardBody>
                        <CardTitle>Card title</CardTitle>
                        <CardSubtitle>Card subtitle</CardSubtitle>
                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                        <br/><br/>
                        
                        <Link to="/cardcreation"><Button>+</Button></Link>
                       
                    </CardBody> 
                </Card>

                <Card className="cardCampaign">
                    <CardBody>
                        <CardTitle>Card title</CardTitle>
                        <CardSubtitle>Card subtitle</CardSubtitle>
                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                        <br/><br/>
                        <Link to="/cardcreation"><Button>+</Button></Link>
                    </CardBody> 
                </Card>

                <Card className="cardCampaign">
                    <CardBody>
                        <CardTitle>Card title</CardTitle>
                        <CardSubtitle>Card subtitle</CardSubtitle>
                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                        <br/><br/>
                        <Link to="/cardcreation"><Button>+</Button></Link>
                    </CardBody> 
                </Card>
                </div>
                <Route exact path="/cardcreation" component={CardCreation} />
            </Router> */}
            </div>
            </Router>
        )
    }
}

export default Home;
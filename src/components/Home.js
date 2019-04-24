import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button } from 'reactstrap';
import '../styles/home.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

class Home extends Component {
    render(){
        return(
            <Router>
            <div className="Home">

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
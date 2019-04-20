import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Container, Row, Col } from 'reactstrap';
import '../styles/randomImage.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';


class RandomImage extends Component {
    render(){
        return(
            <div className="RandomImage">

                <div className="stepNav">
                    <Link to="/RandomImages"> 
                    <div className="stepOne">1</div>
                    </Link>
                    <Link to="/RandomImages">
                    <div className="stepTwo">2</div>
                    </Link>
                    <Link to="FinalCreation">
                    <div className="stepThree">3</div>
                    </Link>
                </div>

                <div className="container">
                <Card className="items">
                    <CardBody>
                        <CardTitle>Card title</CardTitle>
                        <CardSubtitle>Card subtitle</CardSubtitle>
                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                        <br/><br/>
                        <Button>+</Button>
                    </CardBody> 
                </Card>

                <Card className="items">
                    <CardBody>
                        <CardTitle>Card title</CardTitle>
                        <CardSubtitle>Card subtitle</CardSubtitle>
                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                        <br/><br/>
                        <Button>+</Button>
                    </CardBody> 
                </Card>

                <Card className="items">
                    <CardBody>
                        <CardTitle>Card title</CardTitle>
                        <CardSubtitle>Card subtitle</CardSubtitle>
                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                        <br/><br/>
                        <Button>+</Button>
                    </CardBody> 
                </Card>
                </div>

                <Row className="nextStepButton">
                    <Col sm="12" md={{ size: 6, offset: 3 }}><Button color="success" >Done</Button></Col>
                </Row>

            </div>
        )
    }
}

export default RandomImage;
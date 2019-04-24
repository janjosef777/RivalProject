import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Container, Row, Col } from 'reactstrap';
import '../styles/cardResults.css';

function CardResult(props) {
    return (
        <Card className="items">
            <CardBody>
                <CardTitle>Card title</CardTitle>
                <CardSubtitle>Card subtitle</CardSubtitle>
                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                <br /><br />
                <Button>+</Button>
            </CardBody>
        </Card>
    );
}

class RandomImage extends React.Component {

    cards = [1,2,3,4];
    
    render(){
        return(
            <div className="RandomImage">

            {/* Number step icons */}
            <div>O</div>
            <div>O</div>
            <div>O</div>

                <div className="container">
                {this.cards.map(
                    (item,index) => (
                        <CardResult></CardResult>
                    ))
                }
                </div>

                <Row className="nextStepButton">
                    <Col sm="12" md={{ size: 6, offset: 3 }}><Button color="success" >Done</Button></Col>
                </Row>

            </div>
        )
    }
}
export default RandomImage;
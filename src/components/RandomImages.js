import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button } from 'reactstrap';
import '../styles/randomImage.css';


class RandomImage extends React.Component {
    render(){
        return(
            <div className="RandomImage">

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
            </div>
        )
    }
}

export default RandomImage;
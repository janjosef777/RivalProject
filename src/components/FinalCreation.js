import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Container, Row, Col } from 'reactstrap';
import '../styles/finalCreation.css';


class FinalCreation extends Component {
    render(){
        return(
            <div className="FinalCreation">
                {/* Number step icons */}
                <div>O</div>
                <div>O</div>
                <div>O</div>

                <Row>
                    <Col sm="12" md={{ size: 6, offset: 3 }}><Button color="success" >Done</Button></Col>
                </Row>

            </div>
        )
    }
}

export default FinalCreation;
import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Container, Row, Col } from 'reactstrap';
import '../styles/finalCreation.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';


class FinalCreation extends React.Component {
    render(){
        return(
            <div className="FinalCreation">
                <div className="stepNav"> 
                    <div className="stepOne">1</div>
                    <Link to="/RandomImages">
                    <div className="stepTwo">2</div>
                    </Link>
                    <Link to="/FinalCreation">
                    <div className="stepThree">3</div>
                    </Link>
                </div>
                <Row>
                    <Col sm="12" md={{ size: 6, offset: 3 }}><Button color="success" >Done</Button></Col>
                </Row>

            </div>
        )
    }
}

export default FinalCreation;
import React, { Component } from 'react';
import Upload from '../upload/Upload';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Container, Row, Col } from 'reactstrap';
import '../styles/cardCreation.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';


class CardCreation extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
          title:''
        }
        this.setTitle   = this.setTitle.bind(this);
      }

      setTitle(e) {
        this.setState({title:e.target.value});
      }
    

    render(){
        return(

            <div className="CardCreation">
                <div className="stepNav"> 
                    <Link to="/CardCreation">
                    <div className="stepOne">1</div>
                    </Link>
                    <Link to="/RandomImages">
                    <div className="stepTwo">2</div>
                    </Link>
                    <Link to="/FinalCreation">
                    <div className="stepThree">3</div>
                    </Link>
                </div>

                <div className="sideBar">
                    <div>TEXT</div>
                    <div>IMAGE OVERLAY</div>
                    <div>RANDOM IMAGE</div>
                </div>

                <div className="cardEditor">
                    <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }} className="TopCard">
                        <CardTitle>{this.state.title}</CardTitle>
                    </Card>
                </div>
                <input value={this.state.title} onChange={this.setTitle} placeholder="Enter title for the card..." />
                
                <div className="cardUpload">
                    <Upload />
                </div>

                <Row className="nextButton">
                    <Col sm="12" md={{ size: 6, offset: 3 }}>
                    <Link to="/RandomImages">
                    <Button color="success" >Next</Button>
                    </Link>
                    </Col>
                </Row>

            </div>
        )
    }
}

export default CardCreation;
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
          title:'
        }
        this.setTitle   = this.setTitle.bind(this);
      }



      setTitle(e) {
        this.setState({title:e.target.value});
      }
    

    componentDidMount(){

    }

    render(){
        return(
            <div className="CardCreation">

                <Row className="pageTitle">
                    <h1>Scratch Card Editor</h1>
                    {/* <div className="stepNav"> 
                        <Link to="/CardCreation">
                        <div className="stepOne">1</div>
                        </Link>
                        <Link to="/RandomImages">
                        <div className="stepTwo">2</div>
                        </Link>
                        <Link to="/FinalCreation">
                        <div className="stepThree">3</div>
                        </Link>
                    </div> */}
                </Row>

                <Row>

                <Col xs="6">
                <div className="sideBar">
                    <div>
                    <label>Card Title</label>
                    <br/>
                    <input value={this.state.title} onChange={this.setTitle} placeholder="Enter title for the card..." />
                    </div>
                    <div>
                        <label>IMAGE OVERLAY</label>
                        <br/>
                        <Button>Overlay Upload</Button>
                    </div>
                </div>
                </Col>

                <Col xs="6">
                <div className="cardEditor">
                    <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }} className="TopCard">
                    <br/>
                        <CardTitle><h2>{this.state.title}</h2></CardTitle>
                        {/* <img src="{file.name}" className="FileImage" />  
                        <span className="Filename">{file.name}</span> */}
                    </Card>


                </div>
                </Col>


                <Row className="nextButton">
                    <Col  sm={{ size: 'auto', offset: 1 }}>
                    <Link to="/RandomImages">
                    <Button color="success" >Next</Button>
                    </Link>
                    </Col>
                </Row>
            </Row>
            </div>
            
        )
    }
}

export default CardCreation;
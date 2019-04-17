import React, { Component } from 'react';
import Upload from '../upload/Upload';
import { Card, Button, CardTitle, CardText } from 'reactstrap';


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
                <div>
                    <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }} className="TopCard">
                        <CardTitle>{this.state.title}</CardTitle>
                    </Card>
                </div>
                <input value={this.state.title} onChange={this.setTitle} placeholder="Enter title for the card..." />
                <Upload />
            </div>
        )
    }
}

export default CardCreation;
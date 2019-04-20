import React, { Component } from 'react';
import Upload from '../upload/Upload';
import '../styles/cards.css';
import { Card, Button, CardTitle, CardText } from 'reactstrap'; 


class Cards extends React.Component {
    constructor(props) {
        super(props);
        this.title = "All Cards";
        this.state = {
            cards: ["image1", "image2", "image3"]
        }
    }

    onUpload(err, res) {
        if(err) {
            console.error(err);
        } else {
            console.log(typeof res);
            this.state.cards.push(res);
            this.setState({
                cards: this.state.cards
            });
        }
    }
    render(){
        return(
            <div className="Cards-Wrapper">
                <h2>{this.title}</h2>
                <ul>
                    {this.state.cards.map((card,idx) => 
                        <li key={idx}><img src={card.path}/></li>
                    )}
                </ul>
                <Upload onUpload={this.onUpload.bind(this)} />
            </div>
        )
    }
}

export default Cards;
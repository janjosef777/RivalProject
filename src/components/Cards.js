import React, { Component } from 'react';
import Upload from '../upload/Upload';
import '../styles/cards.css';
import { Card, Button, CardTitle, CardText } from 'reactstrap'; 


class Cards extends React.Component {
    constructor(props) {
        super(props);
        const cards = ["image1", "image2", "image3"];
        this.listItems = cards.map((card) =>
            <li>{card}</li>
        );
    }


    render(){
        return(
            <div className="Cards-Wrapper">
                <ul>{this.listItems}</ul>
                <Upload onUpload={ (err, res) => console.log(res) } />
            </div>
        )
    }
}

export default Cards;
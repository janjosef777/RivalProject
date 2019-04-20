import React, { Component } from 'react';
import Upload from '../upload/Upload';
import '../styles/cards.css';
import { Card, Button, CardTitle, CardText } from 'reactstrap'; 


class Cards extends React.Component {
    constructor(props) {
        super(props);
        this.title = "All Cards";
        const cards = ["image1", "image2", "image3"];
        this.listItems = cards.map((card) =>
            <li><img src="{card}"/></li>
        );
    }


    render(){
        return(
            
            <div className="Cards-Wrapper">
                <h2>{this.title}</h2>
                <ul>{this.listItems}</ul>
                <Upload onUpload={ (err, res) => console.log(res) } />
            </div>
        )
    }
}

export default Cards;
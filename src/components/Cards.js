import React, { Component } from 'react';
import Upload from '../upload/Upload';
import { Card, Button, CardTitle, CardText } from 'reactstrap'; 


class Cards extends React.Component {
    constructor(props) {
        super(props);
        const cards = [1, 2, 3, 4, 5];
        this.listItems = cards.map((card) =>
            <li>{card}</li>
        );
    }


    render(){
        return(
            <div>
                <ul>{this.listItems}</ul>
                <Upload />
            </div>
        )
    }
}

export default Cards;
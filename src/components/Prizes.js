import React, { Component } from 'react';
import Upload from '../upload/Upload';
import '../styles/prizes.css';
import { Card, Button, CardTitle, CardText } from 'reactstrap'; 


class Prizes extends React.Component {
    constructor(props) {
        super(props);
        this.title = "All Prizes";
        const prizes = [{name: 'prize 1', qnt: 2}, {name: 'prize 2', qnt: 10}];
        this.listItems = prizes.map((prize) =>
            <li>
                <img src="{prize.name}" className="Prize-Img"/>
                <p className="Prize-Qnt">{prize.qnt}</p>
            </li>
        );
    }


    render(){
        return(
            <div className="Cards-Wrapper">
                <h2>{this.title}</h2>
                <ul>{this.listItems}</ul>
                <Upload />
            </div>
        )
    }
}

export default Prizes;
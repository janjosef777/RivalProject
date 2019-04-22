import React, { Component } from 'react';
import Upload from '../upload/Upload';
import '../styles/nonprizes.css';
import { Card, Button, CardTitle, CardText } from 'reactstrap'; 


class Nonprizes extends Component {
    constructor(props) {
        super(props);
        this.title = "All Non Prizes";
        const nonprizes = ["image1", "image2", "image3"];
        this.listItems = nonprizes.map((nonprize) =>
            <li><img src="{nonprize}"/></li>
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

export default Nonprizes;
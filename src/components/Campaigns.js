import React, { Component } from 'react';
import Upload from '../upload/Upload';
import { Card, Button, CardTitle, CardText } from 'reactstrap'; 
import '../styles/campaigns.css';

class Campaigns extends Component {

    constructor(props) {
        super(props);
        this.title = "Your Campaigns";
        this.state = {
            campaigns: []
        }
    }


    render(){
        return(
            <div className="Cards-Wrapper">
                <h2>{this.title}</h2>
                <ul>
                    <li>
                        <Button className="addCampaign" color="success">+</Button>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Campaigns;
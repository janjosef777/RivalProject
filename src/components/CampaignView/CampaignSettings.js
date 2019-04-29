import React, { Component } from 'react';
//import Upload from '../upload/Upload';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Container, Row, Col
} from 'reactstrap';
import '../../styles/campaignView.css';
import TabView from './TabView';


class CampaignSettings extends Component {
    constructor(props) {
        super(props)

    }

    componentDidMount() {

    }

    render() {
        return (
            
            <div className='wrapper'>
                <h6>Campaign Name: {this.props.selectedCampaign.name} </h6>
                <h6>Campaign Reach: {this.props.selectedCampaign.estimatedParticipants}</h6>
                <h6>Campaign Activation Status:{this.props.selectedCampaign.isActive} </h6>
                <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider round"></span>
                </label>
                <div className='wrapper'>
                <div className="input-section">        
                    <h6>Campaign Name: </h6>
                    <input type="text" placeholder="Campaign Name" />
                </div>
                <div className="input-section">
                    <h6>Estimated Participants: </h6>
                    <input type="text" placeholder="Campaign Reach" />
                </div>
                <div className="input-section">
                    <h6>Campaign Activation Status: </h6>
                    <label class="switch">
                    <input type="checkbox" checked />
                    <span className="slider round"></span>
                    </label>
                </div>
                <div className="input-section">
                    <h6>Generated URL: </h6>
                </div>
            </div>
            </div>
            

        )
    }
}
export default CampaignSettings;

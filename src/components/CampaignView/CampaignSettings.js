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
            </div>

        )
    }
}
export default CampaignSettings;

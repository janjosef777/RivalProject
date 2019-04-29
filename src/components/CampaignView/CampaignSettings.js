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
                    <div className='wrapper'>
                        <div className="input-section">
                            <h6>Campaign Name: </h6>
                            <input type="text" placeholder={this.props.selectedCampaign.name} />
                        </div>
                        <div className="input-section">
                            <h6>Estimated Participants: </h6>
                            <input type="text" placeholder={this.props.selectedCampaign.estimatedParticipants} />
                        </div>
                        <div className="input-section">
                            <h6>Campaign Activation Status: {this.props.selectedCampaign.isActive} </h6>
                            <label class="switch">
                                <input type="checkbox" defaultChecked />
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

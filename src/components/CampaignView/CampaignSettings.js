import React, { Component } from 'react';
import styled from 'styled-components';
import SingleCardState from '../SingleCardState';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Container, Row, Col
} from 'reactstrap';


const LinkButton = styled.a`
padding: 10px;   
margin: 10px;
margin-top: 50px;
border: 1px solid black;
border-radius: 5px;
background-color: #E8542A;
`;

class CampaignSettings extends Component {
    constructor(props) {
        super(props)
        this.state ={
            overlayImg: "../../images/Rivallogo.png",
            title: this.props.titleVal,
            image: this.props.image,
            size: "",
            imageId: ''
        }

  
    }

    componentDidMount() {
    }

    viewSummary = () => {
        this.props.setState({ viewSummary: true })
    }

    render() {
        return (
                    <div className='settings-wrapper'>
                        <div className="campaign-main-info">
                            <div className="input-section">
                                <h6>Campaign Name: </h6>
                                <input type="text" value={this.props.selectedCampaign.name} placeholder="Campaign Name..."/>
                            </div>
                            <div className="input-section">
                                <h6>Estimated Participants: </h6>
                                <input type="text" value={this.props.selectedCampaign.estimatedParticipants}  placeholder="Estimated Participants..."/>
                            </div>
                            <div className="input-section activation-switch">
                                {this.props.selectedCampaign.isActive}
                                <label className="switch">
                                    <input type="checkbox" defaultChecked />
                                    <span className="slider round"></span>
                                </label>
                            </div>
                        </div>
                        <div className="campaign-main-btns">
                            <Button onClick={this.viewSummary} style={{ backgroundColor: '#E8542A', margin: '5px' }}>Campaign Summary</Button>
                            <LinkButton href="" target="_blank"><i class="fas fa-link"></i></LinkButton>
                            <LinkButton href="http://localhost:4000/api/assignlink/par/1/camp/1" target="_blank"><i class="fas fa-external-link-alt"></i></LinkButton>
                            <LinkButton onClick={this.handleSubmit}><i class="fas fa-save"></i></LinkButton>
                        </div>   
                    </div>

                )
            }
        }
        export default CampaignSettings;

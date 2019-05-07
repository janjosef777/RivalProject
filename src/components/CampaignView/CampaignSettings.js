import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import SingleCardState from './SingleCardState';
import ReactTooltip from 'react-tooltip';

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
            showHomepage: false,
            campaignId: this.props.selectedCampaign_id
        }
 
        this.handleStatusChange = this.handleStatusChange.bind(this)
        this.directToHome = this.directToHome.bind(this)
        this.handleCampaignNameChange = this.handleCampaignNameChange.bind(this)
        this.handleEstimatedPatricipantsChange = this.handleEstimatedPatricipantsChange.bind(this)
        this.saveChanges = this.props.saveChanges.bind(this)
        this.generateCard = this.generateCard.bind(this)

    }

    handleCampaignNameChange(e){
        this.props.setState({
           selectedCampaign_name: e.target.value
        })
    }

    handleEstimatedPatricipantsChange(e){
        this.props.setState({
           selectedCampaign_estimatedParticipants: e.target.value
        })
    }

    handleStatusChange(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        var intValue = value ? 1 : 0;
        this.props.setState({
            selectedCampaign_isActive: intValue
        })
        console.log(intValue);
    }


    directToHome() {
        this.setState({showHomepage: true})
    }

    renderRedirect = () => {
        if (this.state.showHomepage) {
            return <Redirect to={{
                pathname: '/',
            }}
            />
        }
    }

    generateCard() {
        fetch('http://localhost:4000/assignlink/' + this.state.campaignId,{
            method: "GET",
            headers: { 
                "Authorization": "Bearer " + sessionStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                sessionStorage.setItem('token', res.token);
                res.redirect(res);
            })
            .catch(err => {
                console.error(err);
            })
    }

    viewSummary = () => {
        this.props.setState({ viewSummary: true })
    }


    render() {
        return (
                    <div>
                        <h2>Campaign Setup</h2>
                        <div className='settings-wrapper'>
                            <div className="campaign-main-info">
                                {this.renderRedirect()}
                                <LinkButton className="icon back-icon">
                                <i class="fas fa-arrow-left" onClick={this.directToHome}></i>
                                </LinkButton>
                                <div className="input-section">
                                    <h6>Campaign Name: </h6>
                                    <input type="text"  value={this.props.selectedCampaign_name} onChange={this.handleCampaignNameChange} placeholder="Campaign Name..."/>
                                </div>
                                <div className="input-section">
                                    <h6>Estimated Participants: </h6>
                                    <input type="text" 
                                        value={this.props.selectedCampaign_estimatedParticipants} 
                                        onChange={this.handleEstimatedPatricipantsChange}  placeholder="Estimated Participants..."/>
                                </div>

                            <div class="input-section onoffswitch" data-tip="Activate campaign">
                                <input type="checkbox" 
                                       name="onoffswitch" 
                                       class="onoffswitch-checkbox" 
                                       id="myonoffswitch" 
                                       onChange={this.handleStatusChange}
                                       checked={this.props.selectedCampaign_isActive}/>
                                <label class="onoffswitch-label" for="myonoffswitch">
                                <span class="onoffswitch-inner"></span>
                                <span class="onoffswitch-switch"></span>
                                </label>
                            </div>

                            </div>
                            <div className="campaign-main-btns">
                                <ReactTooltip />
                                <LinkButton onClick={this.viewSummary} className="icon"><i class="fas fa-list-alt" data-tip="Campaign summary"></i></LinkButton>
                                <LinkButton onClick={this.generateCard} target="_blank" className="icon"  data-tip="Demo link"><i class="fas fa-link"></i>
                                </LinkButton>
                                <LinkButton className="icon"
                                onClick={this.saveChanges}
                                >
                                <i class="fas fa-save"></i>
                                </LinkButton>
                            </div>   
                        </div>
                    </div>

                )
            }
        }
export default CampaignSettings;

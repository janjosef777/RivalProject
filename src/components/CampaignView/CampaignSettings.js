import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import SingleCardState from './SingleCardState';
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
            campaign: this.props.selectedCampaign,
            showHomepage: false
        }
        this.handleCampaignNameChange = this.handleCampaignNameChange.bind(this)
        this.handleEstimatedPatricipantsChange = this.handleEstimatedPatricipantsChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleStatusChange = this.handleStatusChange.bind(this)
        this.directToHome = this.directToHome.bind(this)
    }

    componentDidMount() {

    }

    handleCampaignNameChange(e){
        this.props.setState({
           name: e.target.value
        })
    }

    handleEstimatedPatricipantsChange(e){
        this.props.setState({
           estimatedParticipants: e.target.value
        })
    }

    handleStatusChange(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        var intValue = value ? 1 : 0;
        this.props.setState({
            isActive: intValue
        })
    }

    handleSubmit(){
        console.log(this.props.estimatedParticipants)
        console.log(this.props.name)
        console.log(this.props.title)
        console.log(this.props.overlayImg)
        console.log(this.props.cardResults)
        console.log(this.props.isActive)
        console.log(this.props.template)
        console.log(this.props.createdBy)

        // fetch('http://localhost:4000/api/campaign/' + this.props.id, {
        //     method:
        //         'POST',
        //     headers: {
        //         "Authorization": "Bearer " + sessionStorage.getItem("token"),
        //         "Content-type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         'name': this.props.title,
        //         // 'template': this.props.templateId,
        //         'estimated_participants': this.props.estimatedParticipants,
        //         // 'created_at': this.props.dateNow
        //     })
        // })
        //     .then(res => res.json())
        //     .then(res => {
        //         sessionStorage.setItem('token', res.token)
        //         console.log(res.data)

        //     })
        //     .catch(err => {
        //         console.error(err);
        //     })

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


    viewSummary = () => {
        this.props.setState({ viewSummary: true })
    }

    render() {
        return (
                    <div className='settings-wrapper'>
                        <div className="campaign-main-btns">
                        {this.renderRedirect()}
                            <LinkButton>
                                <i class="fas fa-arrow-circle-left" onClick={this.directToHome}></i>
                            </LinkButton>
                        </div>
                        <div className="campaign-main-info">
                            <div className="input-section">
                                <h6>Campaign Name: </h6>
                                <input type="text"  value={this.props.name} onChange={this.handleCampaignNameChange} placeholder="Campaign Name..."/>
                            </div>
                            <div className="input-section">
                                <h6>Estimated Participants: </h6>
                                <input type="text" 
                                    value={this.props.estimatedParticipants} 
                                    onChange={this.handleEstimatedPatricipantsChange}  placeholder="Estimated Participants..."/>
                            </div>
                            <div className="input-section activation-switch">
                                
                                <h6>Status: </h6>
                                <label className="switch">
                                    <input type="checkbox" 
                                    onChange={this.handleStatusChange} 
                                    // checked={this.props.isActive} 
                                />
                                    <span className="slider round"></span>
                                </label>
                            </div>
                        </div>
                        <div className="campaign-main-btns">
                            <Button onClick={this.viewSummary} style={{ backgroundColor: '#E8542A', margin: '5px' }}>Campaign Summary</Button>
                            <LinkButton href="" target="_blank"><i class="fas fa-link"></i></LinkButton>
                            <LinkButton href="http://localhost:4000/api/assignlink/par/1/camp/1" target="_blank"><i class="fas fa-external-link-alt"></i>
                            </LinkButton>
                            <LinkButton
                            onClick={this.handleSubmit}
                            >
                            <i class="fas fa-save"></i>
                            </LinkButton>
                        </div>   
                    </div>

                )
            }
        }
export default CampaignSettings;

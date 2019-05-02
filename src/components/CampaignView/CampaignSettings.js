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

        this.loadTemplate=this.loadTemplate.bind(this);
        this.getTemplateImg=this.getTemplateImg.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);

        this.viewSummary = this.viewSummary.bind(this);
    }

    handleSubmit() {
        console.log(this.state.title);
        fetch('http://localhost:4000/api/overlay/', {
            method:
                'POST',
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("token"),
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                'title': this.state.title,
                'image': null,
                'size': this.state.size
            })
        })
            .then(res => res.json())
            .then(res => {
                sessionStorage.setItem('token', res.token);
                this.setState({
                    id: res.data.id
                })
            })
            .catch(err => {
                console.error(err);
            })

    }

    loadTemplate() {
        fetch('http://localhost:4000/api/campaigns/' + this.props.selectedCampaign.template, {
            method:
                'GET',
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("token"),
                "Content-type": "application/json"
            },
            
        })

        .then(res => res.json())
        .then(res => {
            sessionStorage.setItem('token', res.token);
            console.log(res.data);
            this.setState({
                title: res.data.title,
                imageId: res.data.id
            })
        })
        
        .catch(err => {
            console.error(err);
        })
    }

    getTemplateImg() {
        fetch('http://localhost:4000/api/images/' + this.state.imageId, {
            method:
                'GET',
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("token"),
                "Content-type": "application/json"
            },
            
        })

        .then(res => res.json())
        .then(res => {
            sessionStorage.setItem('token', res.token);
            console.log(res.data);
            this.setState({
                image: res.data.filename,
            })
        })
        
        .catch(err => {
            console.error(err);
        })

    }

    componentDidMount() {
        this.loadTemplate()
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
                                <label class="switch">
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

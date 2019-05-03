import React, { Component } from 'react';
//import Upload from '../upload/Upload';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Container, Row, Col
} from 'reactstrap';
import '../../styles/campaignView.css';
import AssetsView from './AssetsView';
import TabView from './TabView';
import styled from 'styled-components';
import NavBarComponent from '../NavBarComponent';
import CampaignSettings from './CampaignSettings';
import Summary from './Summary';

const LinkButton = styled.a`
    padding: 10px;   
    margin: 10px;
    margin-top: 50px;
    border: 1px solid black;
    border-radius: 5px;
    background-color: red;
    position: fixed;
    bottom: 100px;
    right: 100px;
    &:hover { 
        background-color: yellow;
    }
`;

class CampaignView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            activeTab: '1',
            images: [],
            cardResults: [],
            title: 'THANKS FOR PARTICIPATING!',
            overlayImg: '../../images/Rivallogo.png',
            overlayImgId: ' ',
            selectedIndex: null,
            selectedCampaignId: this.props.location.state ? this.props.location.state.selectedCampaignId : 0,
            viewSummary: false,
            // selectedCampaign as an array
            selectedCampaign: [],
            //selectedCAmpaign as individual values
            createdAt: "",
            createdBy: "",
            estimatedParticipants: "",
            hasPrizes: "",
            id: "",
            isActive: "",
            name: "",
            template: "",
            url: "",

            //selectedCampaignTemplate as array
            selectedCampaignTemplate: [],
            //selectedCampaignTemplate as individual values
            selectedTemplateId: "",
            selectedTemplateTitle: "",
            selectedTemplateImage: "",
            selectedImageSize: "",
            dateNow: new Date().toLocaleString(),
            
        }
        this.setState = this.setState.bind(this);
        // this.saveChanges = this.saveChanges.bind(this);
    }

    loadCampaign() {
        fetch('http://localhost:4000/api/campaigns/' + this.state.selectedCampaignId, {
            method:
                'GET',
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("token"),
                "Content-type": "application/json"
            }
        })
            .then(res => res.json())
            .then(res => {
                sessionStorage.setItem('token', res.token)
                console.log(res.data)
                this.setState({
                    selectedCampaign: res.data,

                    createdAt: res.data.createdAt,
                    createdBy: res.data.createdBy,
                    estimatedParticipants: res.data.estimatedParticipants,
                    hasPrizes: res.data.hasPrizes,
                    id: res.data.id,
                    isActive: res.data.isActive,
                    name: res.data.name,
                    template: res.data.template,
                    url: res.data.url,
                })
                this.loadTemplate()
            })

            .catch(err => {
                console.error(err);
            })
    }
    loadTemplate() {
        fetch('http://localhost:4000/api/template/' + this.state.selectedCampaign.template, {
            method:
                'GET',
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("token"),
                "Content-type": "application/json"
            }
        })
            .then(res => res.json())
            .then(res => {
                sessionStorage.setItem('token', res.token)
                this.setState({
                    selectedCampaignTemplate: res.data,

                    selectedTemplateId: res.data.id,
                    selectedTemplateTitle: res.data.title,
                    selectedTemplateImageId: res.data.image,
                    selectedImageSize: res.data.size

                })
                if (res.data.title != null){
                    this.setState({
                        title: res.data.title
                    })
                }
                this.loadTemplateImage()
            })
            .catch(err => {
                console.error(err);
            })
    }

    loadTemplateImage() {
        fetch('http://localhost:4000/api/images/' + this.state.selectedTemplateImageId, {
            method:
                'GET',
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("token"),
                "Content-type": "application/json"
            }
        })
            .then(res => res.json())
            .then(res => {
                sessionStorage.setItem('token', res.token)
                if (res.data.path != null) {
                    this.setState({
                        overlayImg: res.data.path
                    })
                }

            })
            .catch(err => {
                console.error(err);
            })
    }

    loadCardResults() {
        fetch('http://localhost:4000/api/cardResults/' + this.state.selectedCampaign.id, {
            method:
                'GET',
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("token"),
                "Content-type": "application/json"
            }
        })
            .then(res => res.json())
            .then(res => {
                sessionStorage.setItem('token', res.token)
                console.log(res.data)

            })
            .catch(err => {
                console.error(err);
            })
    }

    saveChanges() {
        console.log(this.props.name)
        console.log(this.props.estimatedParticipants)
        console.log(this.props.overlayImgId)
        console.log(this.props.title)
        fetch('http://localhost:4000/api/campaigns/' + this.props.selectedCampaign.id, {
            method:
                'PUT',
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("token"),
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                'name': this.props.name,
                'estimated_participants': this.props.estimatedParticipants,
            })
        })
            .then(res => res.json())
            .then(res => {
                sessionStorage.setItem('token', res.token);
                this.saveTemplate()
            })
            
            .catch(err => {
                console.error(err);
            })
        
    }
    
    saveTemplate(){
        fetch('http://localhost:4000/api/templates/' + this.props.selectedTemplateId, {
            method:
                'PUT',
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("token"),
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                'name': this.props.title,
                'image':this.props.overlayImgId,
            })
        })
            .then(res => res.json())
            .then(res => {
                sessionStorage.setItem('token', res.token);
                console.log(res.data)
            })
            .catch(err => {
                console.error(err);
            })
    }

    componentDidMount() {
        this.loadCampaign()
    }

    render() {
        if (this.state.viewSummary) {
            return <Summary {...this.state} setState={this.setState} />
        } else {
            return (
                <div>
                    <NavBarComponent />
                    <CampaignSettings saveChanges={this.saveChanges}  {...this.state} setState={this.setState}></CampaignSettings>
                    <div className='content-wrapper'>
                        <div className='left-wrapper sub-wrapper'>
                            <AssetsView {...this.state} setState={this.setState} ></AssetsView>
                        </div>
                        <div className='right-wrapper sub-wrapper'>
                            <TabView {...this.state} setState={this.setState}></TabView>
                        </div>
                    </div>
                </div>
            )
        }
    }
}
export default CampaignView;
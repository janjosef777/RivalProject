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
            selectedIndex: null,
            viewSummary: false,

            selectedCampaign_id: this.props.location.state ? this.props.location.state.selectedCampaignId : 0,
            selectedCampaign_estimatedParticipants: "",
            selectedCampaign_isActive: "",
            selectedCampaign_name: "",
            selectedCampaign_template: "",
            selectedCampaign_url: "",

            selectedTemplate_title: "thanks for participating!",
            selectedTemplate_image: "",
            selectedTemplate_imageId: "",

        }
        this.setState = this.setState.bind(this);
        // this.saveChanges = this.saveChanges.bind(this);
    }


    loadCampaign() {
        fetch('http://localhost:4000/api/campaigns/' + this.state.selectedCampaign_id, {
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
                    selectedCampaign_id: res.data.id,
                    selectedCampaign_estimatedParticipants: res.data.estimatedParticipants,
                    selectedCampaign_isActive: res.data.isActive,
                    selectedCampaign_name: res.data.name,
                    selectedCampaign_template: res.data.template,
                    selectedCampaign_url: res.data.url,
                })
                this.loadTemplate()
            })

            .catch(err => {
                console.error(err);
            })
    }
    loadTemplate() {
        fetch('http://localhost:4000/api/template/' + this.state.selectedCampaign_template, {
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
                    selectedTemplate_imageId: res.data.image

                })
                if (res.data.title != null) {
                    this.setState({
                        selectedTemplate_title: res.data.title
                    })
                }
                this.loadTemplateImage()
            })
            .catch(err => {
                console.error(err);
            })
    }

    loadTemplateImage() {
        fetch('http://localhost:4000/api/images/' + this.state.selectedTemplate_imageId, {
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
                        selectedTemplate_image: res.data.path
                    })
                }
            })
            .catch(err => {
                console.error(err);
            })
    }

    saveChanges() {
        console.log(this.props)
        window.alert("Changes Saved!")
        
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
                    <CampaignSettings saveChanges={this.saveChanges} {...this.state} setState={this.setState}></CampaignSettings>
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
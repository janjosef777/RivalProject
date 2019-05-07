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
import ApiHelper from '../../helpers/ApiHelper';

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
            selectedCampaign_estimatedParticipants: 0,
            selectedCampaign_isActive: false,
            selectedCampaign_name: null,
            selectedCampaign_template: null,
            selectedCampaign_url: null,

            selectedTemplate_title: null,
            selectedTemplate_image: null,
            selectedTemplate_imageId: null,

        }
        this.setState = this.setState.bind(this);
        // this.saveChanges = this.saveChanges.bind(this);
    }


    loadCampaign() {
        ApiHelper.fetch('api/campaigns/' + this.state.selectedCampaign_id, {
            method:
                'GET',
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("token"),
                "Content-type": "application/json"
            }
        }).then(res => {
                this.setState({
                    selectedCampaign_id: res.id,
                    selectedCampaign_estimatedParticipants: res.estimatedParticipants,
                    selectedCampaign_isActive: res.isActive,
                    selectedCampaign_name: res.name,
                    selectedCampaign_template: res.template,
                    selectedCampaign_url: res.url,
                })
                this.loadTemplate()
            })
            .catch(err => {
                console.error(err);
            })
    }
    loadTemplate() {
        fetch('api/template/' + this.state.selectedCampaign_template, {
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
<<<<<<< HEAD:client/src/components/CampaignView/index.js
        fetch('api/images/' + this.state.selectedTemplate_imageId, {
=======
        ApiHelper.fetch('http://localhost:4000/api/images/' + this.state.selectedTemplate_imageId, {
>>>>>>> master:src/components/CampaignView/index.js
            method:
                'GET',
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("token"),
                "Content-type": "application/json"
            }
        })
            .then(res => {
                sessionStorage.setItem('token', res.token)
                if (res.path != null) {
                    this.setState({
                        selectedTemplate_image: res.path
                    })
                }
            })
            .catch(err => {
                console.error(err);
            })
    }

    saveChanges() {
        fetch('api/campaigns/' + this.props.selectedCampaign_id, {
            method:
                'PATCH',
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("token"),
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                name: this.props.selectedCampaign_name,
                isActive: !!this.props.selectedCampaign_isActive,
                template: this.props.selectedCampaign_template
            })
        }).then(res => {
            if(res.status !== 200)
                throw res;
            return res.json();
        }).then(json => {
            sessionStorage.setItem('token', json.token);
            return json;
        })
        .then(json => {
            window.alert("Changes Saved!")
            console.log(json);
        }).catch(err => {
            console.error(err);
        });
        console.log(this.props)
        
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
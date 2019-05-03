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
            activeTab: '1', //tabl 0 is overlay, tab 1 is card results
            images: [],
            cardResults: [],
            title: 'THANKS FOR PARTICIPATING!',
            overlayImg: null, 
            //'/uploads/IMG_20180902_150937.jpeg',
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
            dateNow: new Date().toLocaleString(),
            //selectedCampaignTemplate as array
            selectedCampaignTemplate: [],
            //selectedCampaignTemplate as individual values
            
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
        // console.log("selectedCampaignId " + this.state.selectedCampaign.template)
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
                    selectedCampaignTemplate: res.data
                })
                // this.loadCardResults()
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
                    <CampaignSettings  {...this.state} setState={this.setState}></CampaignSettings>
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
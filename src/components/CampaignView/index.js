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

            selectedCampaign: {
                id: this.props.location.state ? this.props.location.state.selectedCampaignId : 0
            },
            selectedOverlay: null,
            selectedOverlayImage: null
        }
        this.setState = this.setState.bind(this);
        // this.saveChanges = this.saveChanges.bind(this);
    }


    loadCampaign() {
        ApiHelper.fetch('http://localhost:4000/api/campaigns/' + this.state.selectedCampaign.id, {
            method:
                'GET',
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("token"),
                "Content-type": "application/json"
            }
        }).then(res => {
            const campaign = res;
            const overlay = campaign.template;
            const overlayImage = overlay.image;
            delete overlay.image;
            delete campaign.template;

            this.setState({
                selectedCampaign: campaign,
                selectedOverlay: overlay,
                selectedOverlayImage: overlayImage
            })
        })
        .catch(err => {
            console.error(err);
        })
    }

    saveChanges() {
        const campaign = this.props.selectedCampaign;
        const overlay = this.props.selectedOverlay;
        const overlayImage = this.props.selectedOverlayImage;
        overlay.image = overlayImage;
        campaign.template = overlay;
        fetch('http://localhost:4000/api/campaigns/' + this.props.selectedCampaign.id, {
            method:
                'PATCH',
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("token"),
                "Content-type": "application/json"
            },
            body: JSON.stringify(campaign)
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
                    <div className='content-wrapper main-wrapper'>
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
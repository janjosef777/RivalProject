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
            selectedCampaign: [],
            title: 'THANKS FOR PARTICIPATING!',
            overlayImg: null, //'/uploads/IMG_20180902_150937.jpeg',
            overlayImgId: ' ',
            selectedIndex: null,
            updateId: this.props.location.state ? this.props.location.state.updateId : 0,
        }
        this.selectedCampaign = []
        this.setState=this.setState.bind(this);
        this.updatedCampaign=this.updatedCampaign.bind(this);
    }

    updatedCampaign() {
        fetch('http://localhost:4000/api/campaigns/' + this.state.updateId, {
            method:
                'FETCH',
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("token")
            }
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

    createURL() {
        fetch('http://localhost:4000/api/campaign/', {
            method:
                'UPDATE',
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("token"),
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                url: ""
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
    console.log(this.state.updateId)
    }

    render() {
        return (
            <div> 
                <NavBarComponent />
                <CampaignSettings selectedCampaign={this.selectedCampaign} {...this.props}></CampaignSettings>
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
export default CampaignView;
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
            selectedCampaign: [],
            title: 'THANKS FOR PARTICIPATING!',
            overlayImg: null, //'/uploads/IMG_20180902_150937.jpeg',
            overlayImgId: ' ',
            selectedIndex: null,
            updateId: this.props.location.state ? this.props.location.state.updateId : 0,
            viewSummary: false
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

    createTemplate() {
        fetch('http://localhost:4000/api/template/', {
            method:
                'POST',
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("token"),
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                'title': "",
                'image': "",
                'size': ""
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
    console.log("Component has Mounted " + this.state.updateId)
    }

    render() {
        if (this.state.viewSummary){
            return <Summary {...this.state} setState={this.setState} />
        } else {
            return (
                <div>
                    <NavBarComponent />
                    <CampaignSettings selectedCampaign={this.selectedCampaign} {...this.state} setState={this.setState}></CampaignSettings>
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
import React, { Component } from 'react';
//import Upload from '../upload/Upload';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Container, Row, Col
} from 'reactstrap';
import '../../styles/campaignView.css';
import AssetsView from './AssetsView';
import CardTemplateView from './CardTemplateView';
import TabView from './TabView';
import { Link } from '@material-ui/core';
import styled from 'styled-components';
import NavBarComponent from '../NavBarComponent';

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
            results: [],
            resultTitles: [],
            selectedCampaign: [],
            title: null, //'THANKS FOR PARTICIPATING!',
            overlayImg: null, //'/uploads/IMG_20180902_150937.jpeg',
            selectedIndex: null,
            updateId: this.props.location.state ? this.props.location.state.updateId : 0
        }
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
    console.log(this.state.updateId)
    }

    render() {
        return (
            <div>
                <NavBarComponent />
                <div className='content-wrapper'>
                    <div className='left-wrapper sub-wrapper'>
                        <AssetsView {...this.state} setState={this.setState} ></AssetsView>
                    </div>
                    <div className='right-wrapper sub-wrapper'>
                        <TabView {...this.state} setState={this.setState}></TabView>


                        <LinkButton href="http://localhost:4000/api/assignlink/par/1/camp/1" className="demo-btn"><i class="fas fa-external-link-alt"></i></LinkButton>
                    </div>

                </div>
            </div>

        )
    }
}
export default CampaignView;
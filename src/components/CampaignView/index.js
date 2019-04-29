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
import styled from 'styled-components'

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
`;


class CampaignView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            activeTab: '1', //tabl 0 is overlay, tab 1 is card results
            images: [],
            results: [],
            selectedCampaign: []
        }

        this.setState=this.setState.bind(this);
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className='content-wrapper'>
                <div className='left-wrapper sub-wrapper'>
                    <AssetsView {...this.state} setState={this.setState} ></AssetsView>
                </div>
                <div className='right-wrapper sub-wrapper'>
                    <TabView {...this.state} setState={this.setState}></TabView>
                    <LinkButton href="http://localhost:4000/api/assignlink/par/1/camp/1">Demo</LinkButton>
                </div>
                

            </div>

        )
    }
}
export default CampaignView;
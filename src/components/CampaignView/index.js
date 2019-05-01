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


    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
    
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
    
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
    
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
        }
    
        return array;
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
                        <Button>SAVE</Button>
                    </div>
                </div>
            </div>

        )
    }
}
export default CampaignView;
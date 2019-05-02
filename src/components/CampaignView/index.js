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
            // updateId: this.props.location.state ? this.props.location.state.updateId : 0,

            }
        this.selectedCampaign = []
        this.setState=this.setState.bind(this);
    }

    loadCampaign(){
        fetch('http://localhost:4000/api/campaigns/' + this.state.updateId, {
            method: 
                "POST",
            headers: { 
                "Authorization": "Bearer " + sessionStorage.getItem("token"),
                "Content-type": "application/json"
            },
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                sessionStorage.setItem('token', res.token);
                this.selectedCampaign = res.data;
                this.setState({ selectedCampaign: this.selectedCampaign })
            })
            .catch(err => {
                console.error(err);
            })
    }

    // loadTemplate() {
    //     fetch('http://localhost:4000/api/campaigns/' + this.props.selectedCampaign.template, {
    //         method:
    //             'GET',
    //         headers: {
    //             "Authorization": "Bearer " + sessionStorage.getItem("token"),
    //             "Content-type": "application/json"
    //         },
            
    //     })

    //     .then(res => res.json())
    //     .then(res => {
    //         sessionStorage.setItem('token', res.token);
    //         console.log(res.data);
    //         this.setState({
    //             title: res.data.title,
    //             imageId: res.data.id
    //         })
    //     })
        
    //     .catch(err => {
    //         console.error(err);
    //     })
    // }

    // getTemplateImg() {
    //     fetch('http://localhost:4000/api/images/' + this.state.imageId, {
    //         method:
    //             'GET',
    //         headers: {
    //             "Authorization": "Bearer " + sessionStorage.getItem("token"),
    //             "Content-type": "application/json"
    //         },
            
    //     })

    //     .then(res => res.json())
    //     .then(res => {
    //         sessionStorage.setItem('token', res.token);
    //         console.log(res.data);
    //         this.setState({
    //             image: res.data.filename,
    //         })
    //     })
        
    //     .catch(err => {
    //         console.error(err);
    //     })

    // }

    // createURL() {
    //     fetch('http://localhost:4000/api/campaign/', {
    //         method:
    //             'UPDATE',
    //         headers: {
    //             "Authorization": "Bearer " + sessionStorage.getItem("token"),
    //             "Content-type": "application/json"
    //         },
    //         body: JSON.stringify({
    //             url: ""
    //         })
    //     })
    //         .then(res => res.json())
    //         .then(res => {
    //             sessionStorage.setItem('token', res.token); 
    //             console.log(res.data)
    //         })
    //         .catch(err => {
    //             console.error(err);
    //         })

    // }

    // handleSubmit() {
    //     console.log(this.state.title);
    //     fetch('http://localhost:4000/api/overlay/', {
    //         method:
    //             'POST',
    //         headers: {
    //             "Authorization": "Bearer " + sessionStorage.getItem("token"),
    //             "Content-type": "application/json"
    //         },
    //         body: JSON.stringify({
    //             'title': this.state.title,
    //             'image': null,
    //             'size': this.state.size
    //         })
    //     })
    //         .then(res => res.json())
    //         .then(res => {
    //             sessionStorage.setItem('token', res.token);
    //             this.setState({
    //                 id: res.data.id
    //             })
    //         })
    //         .catch(err => {
    //             console.error(err);
    //         })

    // }

    componentDidMount() {
    // this.updatedCampaign();

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
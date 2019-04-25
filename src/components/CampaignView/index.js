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


class CampaignView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentTab: 1, //tabl 0 is overlay, tab 1 is card results
            images: []
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
                </div>

            </div>

        )
    }
}
export default CampaignView;
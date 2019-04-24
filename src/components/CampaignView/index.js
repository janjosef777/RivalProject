import React, { Component } from 'react';
//import Upload from '../upload/Upload';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Container, Row, Col
} from 'reactstrap';
import '../../styles/campaignView.css';
import AssetsTabView from './AssetsTabView';
import CardTemplateView from './CardTemplateView';


class CampaignView extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className='wrapper'>
                <div className='left-wrapper sub-wrapper'>
                    <AssetsTabView></AssetsTabView>
                </div>
                <div className='right-wrapper sub-wrapper'>
                    <CardTemplateView></CardTemplateView>
                    <div class='button-group'>
                        <button></button>
                        <button></button>
                        <button></button>
                    </div>
                </div>

            </div>

        )
    }
}
export default CampaignView;
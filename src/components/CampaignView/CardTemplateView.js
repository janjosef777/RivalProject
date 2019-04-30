import React, { Component } from 'react';
//import Upload from '../upload/Upload';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Container, Row, Col
} from 'reactstrap';
import '../../styles/campaignView.css';
import TabView from './TabView';


class CardTemplateView extends Component {
    constructor(props) {
        super(props)
        this.state ={
            overlayImg: "../../images/Rivallogo.png"
        }
    }
    componentDidMount() {

    }

    render() {
        return (
            <div className='wrapper'>
                <div className="ImageHolder"><img src={this.props.overlayImg} alt="Your Scratch Image"/></div>
            </div>

        )
    }
}
export default CardTemplateView;
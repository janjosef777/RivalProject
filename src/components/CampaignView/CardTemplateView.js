import React, { Component } from 'react';
//import Upload from '../upload/Upload';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Container, Row, Col
} from 'reactstrap';
import '../../styles/campaignView.css';
import TabView from './TabView';
import SingleCardState from '../SingleCardState'

const imgSrc = '/uploads/IMG_20180902_150937.jpeg'
const imgAlt = 'card overlay image'
const imgWidth = 300;
const imgHeight = 300;

class CardTemplateView extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {

    }

    render() {
        
        return (
            <div className='wrapper'>
                {/* <div className="ImageHolder"><img src={this.props.overlayImg} alt="Your Scratch Image"/></div> */}
                <SingleCardState
                    editable
                    {...this.props}
                    imgSrc={imgSrc}
                    imgAlt={imgAlt}
                    imgWidth={imgWidth}
                    imgHeight={imgHeight}
                />
            </div>
        )
    }
}
export default CardTemplateView;
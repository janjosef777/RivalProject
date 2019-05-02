import React, { Component } from 'react';
//import '../../styles/campaignView.css';
import SingleCardState from './SingleCardState'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Container, Row, Col
} from 'reactstrap';


// const imgSrc = '/uploads/IMG_20180902_150937.jpeg'
// const imgAlt = 'card overlay image'
const imgWidth = 300;
const imgHeight = 300;

class CardTemplateView extends Component {
    constructor(props) {
        super(props)

    }
    
    componentDidMount(){

    }

    render() {
        if (this.props.overlay){
            return (
                <div className='wrapper'>
                    {/* <div className="ImageHolder"><img src={this.props.overlayImg} alt="Your Scratch Image"/></div> */}
                    <SingleCardState
                        editable
                        overlay
                        {...this.props}
                        imgWidth={imgWidth}
                        imgHeight={imgHeight}
                    />
                </div>

            )
        } else if (this.props.index) {
            return (
                <div className='wrapper'>
                    {/* <div className="ImageHolder"><img src={this.props.overlayImg} alt="Your Scratch Image"/></div> */}
                    <SingleCardState
                        editable
                        index
                        {...this.props}
                        imgWidth={imgWidth}
                        imgHeight={imgHeight}
                    />
                </div>
            )
        }
    }
}
export default CardTemplateView;
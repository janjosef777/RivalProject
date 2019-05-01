import React, { Component } from 'react';
//import Upload from '../upload/Upload';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Container, Row, Col
} from 'reactstrap';
import '../../styles/campaignView.css';
import TabView from './TabView';
import SingleCardState from '../SingleCardState'

// const imgSrc = '/uploads/IMG_20180902_150937.jpeg'
// const imgAlt = 'card overlay image'
const imgWidth = 300;
const imgHeight = 300;

class CardTemplateView extends Component {
    constructor(props) {
        super(props)
        this.state ={
            overlayImg: "../../images/Rivallogo.png",
            title: this.props.titleVal,
            image: this.props.image,
            size: ""
        }
    }
    
    handleSubmit() {
        console.log(this.state.title);
        fetch('http://localhost:4000/api/overlay/', {
            method:
                'POST',
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("token"),
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                'id': "",
                'title': this.state.title,
                'image': null,
                'size': this.state.size
            })
        })
            .then(res => res.json())
            .then(res => {
                sessionStorage.setItem('token', res.token);
                this.setState({
                    id: res.data.id
                })
            })
            .catch(err => {
                console.error(err);
            })

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
                    <Button onClick={this.handleSubmit}>SAVE</Button>
                </div>

            )
        }
    }
}
export default CardTemplateView;
import React, { Component } from 'react';
import '../../styles/campaignView.css';
import SingleCardState from '../SingleCardState'
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
        this.state ={
            overlayImg: "../../images/Rivallogo.png",
            title: this.props.titleVal,
            image: this.props.image,
            size: "",
            imageId: ''
        }

        this.handleSubmit=this.handleSubmit.bind(this);
        this.loadTemplate=this.loadTemplate.bind(this);
        this.getTemplateImg=this.getTemplateImg.bind(this);
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

    loadTemplate() {
        fetch('http://localhost:4000/api/campaigns/' + this.props.selectedCampaign.template, {
            method:
                'GET',
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("token"),
                "Content-type": "application/json"
            },
            
        })

        .then(res => res.json())
        .then(res => {
            sessionStorage.setItem('token', res.token);
            console.log(res.data);
            this.setState({
                title: res.data.title,
                imageId: res.data.id
            })
        })
        
        .catch(err => {
            console.error(err);
        })
    }

    getTemplateImg() {
        fetch('http://localhost:4000/api/images/' + this.state.imageId, {
            method:
                'GET',
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("token"),
                "Content-type": "application/json"
            },
            
        })

        .then(res => res.json())
        .then(res => {
            sessionStorage.setItem('token', res.token);
            console.log(res.data);
            this.setState({
                image: res.data.filename,
            })
        })
        
        .catch(err => {
            console.error(err);
        })

    }

    componentDidMount(){
        this.loadTemplate()
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
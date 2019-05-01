import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Container, Row, Col
} from 'reactstrap';
import '../../styles/campaignView.css';

class ImageThumb extends Component {
    constructor(props) {
        super(props);
        
    }

    setImage(e) {
        if(this.props.activeTab === '1'){
            this.props.setState({overlayImg: e.target.src, overlayImgId: e.target.alt});
        } else if(this.props.activeTab === '2'){
            var newArray = this.props.results.slice();
            newArray.push(e.target.src);
            this.props.setState({results:newArray});
        }  
    }


    render() {
        return (
            <div>
                <img src={this.props.imagePath} alt={this.props.imageId} className="img-thumbnail" onClick={this.setImage.bind(this)} />
            </div>
        );
    }
}

export default ImageThumb;
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

    setOverlay(e) {
        this.props.setState({overlayImg: e.target.src});
    }

    render() {
        return (
            <div>
                <img src={this.props.imagePath} alt="Card Image" className="img-thumbnail" onClick={this.setOverlay.bind(this)}></img>
            </div>
        );
    }
}

export default ImageThumb;
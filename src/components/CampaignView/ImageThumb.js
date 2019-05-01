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
            this.props.setState({overlayImg: e.target.src});
        } else if(this.props.activeTab === '2'){
            var newImageArray = this.props.results;
            newImageArray.push(e.target.src);
            this.props.setState({results:newImageArray});
            console.log(newImageArray);
            
        }  
    }


    render() {
        return (
            <div>
                <img src={this.props.imagePath} alt="Card Image" className="img-thumbnail" onClick={this.setImage.bind(this)} />
            </div>
        );
    }
}

export default ImageThumb;
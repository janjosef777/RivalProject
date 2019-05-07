import React, { Component } from 'react';
//import '../../styles/campaignView.css';
import {ImgThumbImg} from '../../styles/componentStyles';

//const ImgThumbDivStyle = st

class ImageThumb extends Component {
    constructor(props) {
        super(props);
        
    }

    setImage(e) {
        if(this.props.activeTab === '1'){
            this.props.setState({selectedTemplate_image: e.target.src,  selectedTemplate_imageId: e.target.alt});
        } else if(this.props.activeTab === '2'){
            var newArray = this.props.cardResults;
            newArray.push({
                image: e.target.src,
                title: '',
                prize: null
            });
            this.props.setState({results:newArray});
        }  
    }


    render() {
        return (
                <ImgThumbImg src={this.props.imagePath} alt={this.props.imageId} onClick={this.setImage.bind(this)} />
        );
    }
}

export default ImageThumb;
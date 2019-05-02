import React, { Component } from 'react';
//import '../../styles/campaignView.css';
import {ImgThumbFrame, ImgThumbImg} from '../../styles/componentStyles';

//const ImgThumbDivStyle = st

class ImageThumb extends Component {
    constructor(props) {
        super(props);
        
    }

    setImage(e) {
        if(this.props.activeTab === '1'){
            this.props.setState({overlayImg: e.target.src, overlayImgId: e.target.alt});
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
            <ImgThumbFrame>
                <ImgThumbImg src={this.props.imagePath} alt={this.props.imageId} onClick={this.setImage.bind(this)} />
            </ImgThumbFrame>
        );
    }
}

export default ImageThumb;
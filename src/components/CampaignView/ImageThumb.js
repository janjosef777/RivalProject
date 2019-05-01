import React, { Component } from 'react';
import '../../styles/campaignView.css';

class ImageThumb extends Component {
    constructor(props) {
        super(props);
        
    }

    setImage(e) {
        if(this.props.activeTab === '1'){
            this.props.setState({overlayImg: e.target.src});
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
            <div>
                <img src={this.props.imagePath} alt="Card Image" className="img-thumbnail" onClick={this.setImage.bind(this)} />
            </div>
        );
    }
}

export default ImageThumb;
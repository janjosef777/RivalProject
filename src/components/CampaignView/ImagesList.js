import React, { Component } from 'react';
import Upload from '../../upload/Upload';
import '../../styles/campaignView.css';
import ImageThumb from './ImageThumb';
import ReactTooltip from 'react-tooltip';


class ImagesList extends Component {
    constructor(props) {
        super(props)

        this.state = {}
        this.images = []
        this.deleteImages = this.deleteImages.bind(this);
        this.fetchImages = this.fetchImages.bind(this);
    }

    componentDidMount() {
        console.log(localStorage.getItem("token"))
        this.fetchImages();
    }

    fetchImages() {
        fetch('api/images',{
            headers: { 
                "Authorization": "Bearer " + sessionStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                sessionStorage.setItem('token', res.token);
                this.images = res.data;
                this.props.setState({ images: this.images })
            })
            .catch(err => {
                console.error(err);
            })
    }

    onUpload(err, res) {
        if (err) {
            console.error(err);
        } else {
            this.images.push(res);
            this.props.setState({images: this.images})
            this.fetchImages()
        }
    }

    deleteImages(imageId, idx) {

        fetch('http://localhost:4000/api/images/' + imageId ,{
            method: 'DELETE',
            headers: { 
                "Authorization": "Bearer " + sessionStorage.getItem("token")
            }
        })
            .then(res => { 
                let contentType =res.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    return res.json()
                } else {
                    return res
                } 
            })
            .then(res => {
                if (res.data && res.data.deleted) {
                    console.log(res)
                    sessionStorage.setItem('token', res.token);
                    let images = this.props.images;
                    images.splice(idx, 1);
                    this.props.setState({ images: images });
                } else {
                    console.log(res)
                    alert("unable to delet image: " + res);
                    this.fetchImages();
                } 
            }).catch(err => {
                console.error(err);
            })
    }


    render() {
        return (
            <div>
                <div className='image-list-wrapper'>
                    <h3>Image Library</h3>
                    <Upload onUpload={this.onUpload.bind(this)}/>
                </div>
                <div>
                    <ul className="image-list">
                    {this.props.images.map((image, idx) => 
                        <li key={idx}>
                        <button onClick={(e)=>{this.deleteImages(image.id, idx)}} 
                        className="delete-img">
                                X
                        </button>
                        <ImageThumb imagePath={image.path} imageId={image.id} {...this.props}></ImageThumb></li>
                    )}
                    </ul>
                </div>
            </div>
        )
    }
}
export default ImagesList;
import React, { Component } from 'react';
import Upload from '../../upload/Upload';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Container, Row, Col
} from 'reactstrap';
import '../../styles/campaignView.css';
import ImageThumb from './ImageThumb';


class ImagesList extends Component {
    constructor(props) {
        super(props)

        this.state = {}
        this.images = []
    }

    componentDidMount() {
        console.log(localStorage.getItem("token"))
        this.fetchImages()
    }

    fetchImages() {
        fetch('http://localhost:4000/api/images',{
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

    render() {
        return (
            <div>
                <div className='image-list-wrapper'>
                    <h2>Images</h2>
                    <Upload onUpload={this.onUpload.bind(this)} />
                </div>
                <div>
                    <ul className="image-list">
                    {this.props.images.map((image, idx) => 
                        <li key={idx}><ImageThumb imagePath={image.path} className="img-thumbnail" {...this.props}></ImageThumb></li>
                    )}
                    </ul>
                </div>
            </div>
        )
    }
}
export default ImagesList;
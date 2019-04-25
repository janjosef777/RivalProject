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
        this.fetchImages()
    }

    fetchImages() {
        fetch('http://localhost:4000/api/images', {
            headers:
            {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.images = res;
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
        }
    }

    render() {
        return (
            <div className='image-list-wrapper'>
                <h1>Images</h1>
                <Upload onUpload={this.onUpload.bind(this)} />
                <div>
                    <ul className="image-list">
                    {this.props.images.map((image, idx) => 
                        <li key={idx}><ImageThumb imagePath={image.path}></ImageThumb></li>
                    )}
                    </ul>
                </div>
            </div>
        )
    }
}
export default ImagesList;
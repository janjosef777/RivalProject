import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Container, Row, Col
} from 'reactstrap';
import '../../styles/campaignView.css';

const ImageThumb = (props) => (
    <div>
        <img src={props.imagePath} alt="Card Image" className="img-thumbnail" onClick={props.onClick}></img>
    </div>
)

export default ImageThumb;
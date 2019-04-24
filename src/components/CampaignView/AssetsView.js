import React, { Component } from 'react';
//import Upload from '../upload/Upload';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Container, Row, Col
} from 'reactstrap';
import '../../styles/campaignView.css';
import CardResultsList from './CardResultsList';
import ImagesList from './ImagesList';


class AssetsView extends Component {
    constructor(props) {
        super(props)

        this.state = { 
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className='assets-view-wrapper'> 
                <ImagesList {...this.props}></ImagesList>  
            </div>
        )
    }
}
export default AssetsView;
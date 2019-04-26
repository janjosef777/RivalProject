import React, { Component } from 'react';
//import Upload from '../upload/Upload';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Container, Row, Col
} from 'reactstrap';
import '../../styles/campaignView.css';
import TabView from './TabView';


class CampaignCardResults extends Component {
    constructor(props) {
        super(props)

    }

    removeImage(e){
 
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className='wrapper'>
                <ul className="image-list">
                    {this.props.results.map((cardresult,idx) => 
                        <li key={idx}><span onClick={this.removeImage.bind(this)}>X</span><img src={cardresult} alt="Selected Prize Image" className="img-thumbnail" /></li>
                    )}
                </ul>
            </div>

        )
    }
}
export default CampaignCardResults;
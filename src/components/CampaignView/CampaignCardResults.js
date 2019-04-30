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
            <div>
                <ul className="results-list">
                    {this.props.results.map((cardresult,idx) => 
                        <li key={idx}><button onClick={this.removeImage.bind(this)} className="delete-img">X</button><img src={cardresult} alt="Selected Prize Image" className="img-thumbnail result-img" /></li>
                    )}
                </ul>
            </div>

        )
    }
}
export default CampaignCardResults;
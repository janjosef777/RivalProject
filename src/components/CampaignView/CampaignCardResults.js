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


        this.triggerDelete=this.triggerDelete.bind(this);
    }

    triggerDelete(cardresult, idx){
        let imageList = this.props.results;
        console.log(imageList);
        imageList.splice(idx, 1);
        this.props.setState({results: imageList});
        console.log(imageList);
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <ul className="results-list">
                    {this.props.results.map((cardresult,idx) => 
                        <li key={idx}>
                        <button onClick={(e)=>{
                            this.triggerDelete(cardresult, idx)}}className="delete-img">
                        X
                        </button>
                        <img src={cardresult} alt="Selected Prize Image" className="img-thumbnail result-img" />
                            
                        </li>
                    )}
                </ul>
            </div>

        )
    }
}
export default CampaignCardResults;
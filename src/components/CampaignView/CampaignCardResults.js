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

        this.state = {
            results:[],
        }

        this.addResults   = this.addResults.bind(this);
    }

    addResults(e) {
        var newArray = this.state.results.slice();
        newArray.push(e.target.src);
        this.setState({results:newArray});
        
        console.log({results:newArray});
        console.log({results:e.target.src});
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className='wrapper'>
                <ul>
                    {this.state.results.map((result,idx) => 
                        <li key={idx}><img src={result} alt="Selected Prize Image"/></li>
                    )}
                </ul>
            </div>

        )
    }
}
export default CampaignCardResults;
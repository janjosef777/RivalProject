import React, { Component } from 'react';
//import Upload from '../upload/Upload';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Container, Row, Col
} from 'reactstrap';
import '../../styles/campaignView.css';
import CardResultsList from './CardResultsList';


class AssetsView extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                {this.props.currentTab == 0 ?
                <div className='wrapper'> 
                    <imagesList {...this.props} setState={this.props.setState}></imagesList>
                    <CardResultsList {...this.props} setState={this.props.setState}></CardResultsList>     
                </div>
                :
                <div className='wrapper'>
                    <imagesList {...this.props} setState={this.props.setState}></imagesList>
                    <CardResultsList {...this.props} setState={this.props.setState}></CardResultsList>
                </div>
                }
            </div>
        )
    }
}
export default AssetsView;
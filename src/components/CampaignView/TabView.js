import React, { Component } from 'react';
//import Upload from '../upload/Upload';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Container, Row, Col
} from 'reactstrap';
import '../../styles/campaignView.css';
import CardTemplateView from './CardTemplateView';


class TabView extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className='wrapper'>
                <CardTemplateView {...this.props} setState={this.props.setState}></CardTemplateView>
            </div>

        )
    }
}
export default TabView;
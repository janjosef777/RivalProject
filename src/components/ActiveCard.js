import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Container, Row, Col
} from 'reactstrap';

class ActiveCard extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <h1>hello</h1>
                <h1>{this.props.match.params.id}</h1>

            </div>
        );
    }
}
export default ActiveCard;
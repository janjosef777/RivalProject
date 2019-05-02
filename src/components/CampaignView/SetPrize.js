import React, { Component } from 'react';
//import '../../styles/campaignView.css';
import styled from 'styled-components'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Container, Row, Col, Input, Collapse
} from 'reactstrap';

const CardFrame = styled.div`
    width: ${props => props.frameWidth + 'px'};
    padding-bottom: ${props => props.framePadding + 'px'};
    background-color: ${props => props.frameColor};
    border: ${props => props.borderStyle};
    display: block;
    margin 0 auto;
`;

class SetPrize extends Component {
    constructor(props) {
        super(props)

        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false };
    }

    toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
    }

    render() {
        return (
            <div>
                <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Toggle</Button>
                <Collapse isOpen={this.state.collapse}>
                    <Card>
                        <CardBody>
                            Anim pariatur cliche reprehenderit,
                             enim eiusmod high life accusamus terry richardson ad squid. Nihil
                             anim keffiyeh helvetica, craft beer labore wes anderson cred
                             nesciunt sapiente ea proident.
                        </CardBody>
                    </Card>
                </Collapse>
            </div>

        )
    }
}
export default SetPrize;
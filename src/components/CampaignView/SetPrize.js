import React, { Component } from 'react';
//import '../../styles/campaignView.css';
import styled from 'styled-components'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Container, Row, Col, Input, Collapse
} from 'reactstrap';
import { SetPrizeWrapper} from '../../styles/componentStyles';

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
            <div style={{ margin: '5px'}}>
                {!this.props.cardResults[this.props.idx].prize? 
                    <div style={{ marginBottom: '5px' }}>
                        <>Prize Name: </><br/>
                        <>Quantity: </><br />
                        <Button color='danger' style={{ marginBottom: '1rem'}}>Remove Prize</Button>
                    </div>
                    :
                    <></>
                }
                <Button onClick={this.toggle} style={{ marginBottom: '1rem', backgroundColor: '#E8542A' }}>Set Prize</Button>
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
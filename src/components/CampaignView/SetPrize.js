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

        this.state = {
            showForm: false
        }

        this.showForm = this.showForm.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    showForm() {
        this.setState({ showForm: true });
        console.log(this.state.showForm)
    }

    saveChanges() {
        this.setState({ showForm: false });
    }

    cancel() {
        this.setState({ showForm: false });
    }

    render() {
        if (this.props.cardResults[this.props.idx]) {
            if (this.state.showForm) {
                return (
                    <div>
                        <>Prize Name: </><Input /><br />
                        <>Quantity: </><Input /><br />
                        <Button onClick={this.saveChanges} style={{ backgroundColor: '#E8542A', margin: '5px' }}>Save Changes</Button>
                        <Button onClick={this.cancel} color='secondary'>Cancel</Button>
                    </div>
                )
            } else {
                if (this.props.cardResults[this.props.idx].prize) {
                    return (
                        <div>
                            <>Prize Name: </><br />
                            <>Quantity: </><br />
                            <Button onClick={this.showForm} style={{ backgroundColor: '#E8542A', margin: '5px' }}>Edit Prize</Button>
                            <Button color='danger' style={{ margin: '5px' }}>Remove Prize</Button>
                        </div>
                    )
                } else {
                    return (
                        <div>
                            <Button onClick={this.showForm} style={{ backgroundColor: '#E8542A', margin: '5px' }}>Add a Prize</Button>
                        </div>
                    )
                }
            }
        } else {
            return <div/>
        }
        
    }
}
export default SetPrize;
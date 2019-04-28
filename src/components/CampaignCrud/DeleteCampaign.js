import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import '../../styles/deleteCampaign.css';


class DeleteCampaign extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // handleSubmit() {
    //     fetch('http://localhost:4000/api/campaign', {
    //         method: 'POST',
    //         body: JSON.stringify({ 
    //             "name": this.state.title, 
    //             "estimatedParticipants": this.state.estimatedParticipants 
    //             }),
    //         headers: { 
    //             "Authorization": "Bearer " + localStorage.getItem("token")
    //         }
    //     }).then(response => {
    //         response.json()
    //             .then(responseJson => {
    //                 var token  = responseJson
    //                 console.log(token.token);
    //                 window.localStorage.setItem("token", token.token);
    //                 window.location.href = "/";
    //             })
    //     })
    //     console.log("triggered");
    // }

    // handleSubmit() {
    //     fetch('http://localhost:4000/api/campaigns', {
    //         method:
    //             'POST',
    //         headers: { 
    //             "Authorization": "Bearer " + localStorage.getItem("token")
    //         },
    //         body : {
    //             'name' : this.state.name,
    //             'template' : null,
    //             'created_by': this.state.created_by,
    //             'estimated_participants': this.state.estimated_participants
    //         }
    //     })
    //     .then(res => res.json())
    //     .then(output => {
    //         this.campaignItems = output.data;
    //         console.log(this.campaignItems)

    //     })
    //     .catch(err => {
    //         console.error(err);
    //     })
    //     console.log("triggered!");

    // }

    handleTitle(event) {
        this.setState({ title: event.target.value });
    }

    handleParticipants(event) {
        this.setState({ estimatedParticipants: event.target.value });
    }

    render() {
        return (
            <div className="deleteCampaign" >
                <div className="innerDiv">
                    <Button onClick={this.props.closePopup} 
                            className="cancelButton" close>
                    </Button>
                
                    <Form className="formDeleteCampaign">
                        <Label for="delete">Are you sure you want to delete this Campaign?</Label>
                        <Button 
                        onClick={this.handleSubmit} 
                        color="danger">Delete</Button>
                    </Form>
                </div>
            </div>
        )
    }
}

export default DeleteCampaign;
import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import '../styles/createCampaign.css';


class CreateCampaign extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            estimatedParticipants: ""
        };
        this.handleTitle = this.handleTitle.bind(this);
        this.handleParticipants = this.handleParticipants.bind(this);
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

    handleSubmit() {
        fetch('http://localhost:4000/api/campaigns', {
            method:
                'POST',
            headers: { 
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body : {
                'name' : this.state.name,
                'template' : null,
                'created_by': this.state.created_by,
                'estimated_participants': this.state.estimated_participants
            }
        })
        .then(res => res.json())
        .then(output => {
            this.campaignItems = output.data;
            console.log(this.campaignItems)

        })
        .catch(err => {
            console.error(err);
        })
        console.log("triggered!");

    }

    handleTitle(event) {
        this.setState({ title: event.target.value });
    }

    handleParticipants(event) {
        this.setState({ estimatedParticipants: event.target.value });
    }

    render() {
        return (
            <div className="createCampaign" >
                <div className="innerDiv">
                    <Button onClick={this.props.closePopup} 
                            className="cancelButton" close>
                    </Button>
                
                <Form className="formCreateCampaign">
                    <FormGroup>
                        <Label for="title">Title</Label>
                        <Input type="text" id="title" value={this.state.title} onChange={this.handleTitle}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="estimatedParticipants">Estimated Participants</Label>
                        <Input type="estimatedParticipants" value={this.state.estimatedParticipants} onChange={this.handleParticipants}/>
                    </FormGroup>
                    <Button 
                    onClick={this.handleSubmit} 
                    color="success">Create</Button>

                </Form>
                </div>
            </div>
        )
    }
}

export default CreateCampaign;
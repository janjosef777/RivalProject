import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import '../../styles/createCampaign.css';


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

    handleSubmit() {
        console.log(this.state.title);
        fetch('http://localhost:4000/api/campaigns', {
            method:
                'POST',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                'name': this.state.title,
                'template': null,
                'estimated_participants': this.state.estimatedParticipants
            })
        })
            .then(res => res.json())
            .then(res => {
                localStorage.setItem('token', res.token);
                this.campaignItems = res.data;
                console.log(this.campaignItems)
                window.location.href = "/";
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
                            <Label for="title">Campaign Title</Label>
                            <Input type="text" id="title" value={this.state.title} onChange={this.handleTitle} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="estimatedParticipants">Estimated Participants</Label>
                            <Input type="estimatedParticipants" value={this.state.estimatedParticipants} onChange={this.handleParticipants} />
                        </FormGroup>

                        <Button
                            onClick={this.handleSubmit}
                            color="success">
                            Create
                        </Button>

                    </Form>
                </div>
            </div>
        )
    }
}

export default CreateCampaign;
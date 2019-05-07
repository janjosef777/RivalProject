import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import '../../styles/deleteCampaign.css';


class DeleteCampaign extends Component {

    constructor(props) {
        super(props);
        this.state = {
            deleteId: this.props.deleteId
        };
        this.deleteCampaign = this.deleteCampaign.bind(this);
    }
    deleteCampaign() {
        console.log(this.state.deleteId)
        fetch('api/campaigns/' + this.state.deleteId , {
            method:
                'DELETE',
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(res => {
                sessionStorage.setItem('token', res.token);
                console.log(res.data)
                window.location.href ="/";
            })
            .catch(err => {
                console.error(err);
            })
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
                            onClick={this.deleteCampaign}
                            color="danger">Delete</Button>
                    </Form>
                </div>
            </div>
        )
    }
}

export default DeleteCampaign;
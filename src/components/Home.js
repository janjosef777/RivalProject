import React, { Component } from 'react';
import { Table, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button } from 'reactstrap';
import '../styles/home.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

import CRUDTable,
{
  Fields,
  Field,
  CreateForm,
  UpdateForm,
  DeleteForm,
  Pagination
} from 'react-crud-table';

let campaignItems = [];
let count = campaignItems.length;
function fetchCampaigns() {
    fetch('http://localhost:4000/api/campaigns', {
        headers: { 
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
        .then(res => res.json())
        .then(output => {
            campaignItems = output.data;
            console.log(campaignItems)
        })
        .catch(err => {
            console.error(err);
        })
}

function addCampaign() {
    fetch('http://localhost:4000/api/campaigns', {
        method:
            'POST',
        headers: { 
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
        .then(res => res.json())
        .then(output => {
            campaignItems = output.data;
            console.log(campaignItems)
        })
        .catch(err => {
            console.error(err);
        })
}
function deleteCampaign(id) {
    fetch('http://localhost:4000/api/campaigns/' + id, {
        method:
            'DELETE',
        headers: { 
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
        .then(res => res.json())
        .then(output => {
            campaignItems = output.data;
            console.log(campaignItems)
        })
        .catch(err => {
            console.error(err);
        })
}
function updateCampaign(id) {
    fetch('http://localhost:4000/api/campaigns/' + id, {
        method:
            'UPDATE',
        headers: { 
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
        .then(res => res.json())
        .then(output => {
            campaignItems = output.data;
            console.log(campaignItems)
        })
        .catch(err => {
            console.error(err);
        })
}

class Home extends Component {

    constructor(props){
        super(props);
        this.state={

        }
    } 

    render(){
        return(
            <div className="Home">
        
                <div className="container">
                <Table>
                    
                </Table>
                </div>
            </div>
        )
    }
}

export default Home;
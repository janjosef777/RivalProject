import React, { Component } from 'react';
import { Table, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button } from 'reactstrap';
import '../styles/home.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode'


var campaignItems = [];
var count = campaignItems.length;
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
            id: null,
            name: "",
            template: "",
            is_active: false,
            created_by: "",
            created_at:"",
            estimated_participants:null,
            url:"",
            campaigns: []
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.loadData = this.loadData.bind(this)
    } 

    componentDidMount(){
        this.loadData()
        this.setUserName()
    }

    setUserName(){
         var username  = localStorage.getItem('token');
         username = jwt_decode(username);
         this.setState({
             created_by: username
         })
    }
    handleInputChange(e){
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    loadData(){
        fetchCampaigns();
        this.setState({
            campaigns: campaignItems
        })
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
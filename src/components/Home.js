import React, { Component } from 'react';
import '../styles/home.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode'

import Paper from '@material-ui/core/Paper';

import {
  Grid,
  Table,
  TableHeaderRow,
  Button
} from '@devexpress/dx-react-grid-material-ui';

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

        this.state = {
            columns: [
              { name: 'name', title: 'Name' },
              { name: 'sex', title: 'Sex' },
              { name: 'city', title: 'City' },
              { name: 'car', title: 'Car' }
            ],
            rows: [
              { sex: "Female", name: "Sandra", city: "Las Vegas", car: "Audi A4" },
              { sex: "Male", name: "Paul", city: "Paris", car: "Nissan Altima" },
              { sex: "Male", name: "Mark", city: "Paris", car: "Honda Accord" },
              { sex: "Male", name: "Paul", city: "Paris", car: "Nissan Altima" },
              { sex: "Female", name: "Linda", city: "Austin", car: "Toyota Corolla" },
              { sex: "Male", name: "Robert", city: "Las Vegas", car: "Chevrolet Cruze" },
              { sex: "Female", name: "Lisa", city: "London", car: "BMW 750" },
              { sex: "Male", name: "Mark", city: "Chicago", car: "Toyota Corolla" },
              { sex: "Male", name: "Thomas", city: "Rio de Janeiro", car: "Honda Accord" },
              { sex: "Male", name: "Robert", city: "Las Vegas", car: "Honda Civic" },
              { sex: "Female", name: "Betty", city: "Paris", car: "Honda Civic" },
              { sex: "Male", name: "Robert", city: "Los Angeles", car: "Honda Accord" },
              { sex: "Male", name: "William", city: "Los Angeles", car: "Honda Civic" },
              { sex: "Male", name: "Mark", city: "Austin", car: "Nissan Altima" }
            ]
          };
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
        const { rows, columns } = this.state;
        return (
        <Paper>
            <Grid
            rows={rows}
            columns={columns}
            >
                <Table />
                <TableHeaderRow />
            </Grid>
        </Paper>
          );
    }
}

export default Home;
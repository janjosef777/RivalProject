import React, { Component } from 'react';
import '../styles/home.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom'; 
// import jwt_decode from 'jwt-decode'

import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import {
    SelectionState,
    PagingState,
    IntegratedPaging,
    IntegratedSelection,
    SortingState,
    IntegratedSorting,
    SearchState,
    IntegratedFiltering,
} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    Toolbar,
    SearchPanel,
    TableHeaderRow,
    TableSelection,
    PagingPanel,
} from '@devexpress/dx-react-grid-material-ui';
import { withStyles } from '@material-ui/core/styles';
import CreateCampaign from './CreateCampaign';

// function deleteCampaign(id) {
//     fetch('http://localhost:4000/api/campaigns/' + id, {
//         method:
//             'DELETE',
//         headers: { 
//             "Authorization": "Bearer " + localStorage.getItem("token")
//         }
//     })
//         .then(res => res.json())
//         .then(output => {
//             campaignItems = output.data;
//             console.log(campaignItems)
//         })
//         .catch(err => {
//             console.error(err);
//         })
// }
// function updateCampaign(id) {
//     fetch('http://localhost:4000/api/campaigns/' + id, {
//         method:
//             'UPDATE',
//         headers: { 
//             "Authorization": "Bearer " + localStorage.getItem("token")
//         }
//     })
//         .then(res => res.json())
//         .then(output => {
//             campaignItems = output.data;
//             console.log(campaignItems)
//         })
//         .catch(err => {
//             console.error(err);
//         })
// }

class Home extends Component {

    constructor(props){
        super(props);

        this.state = {
            columns: [
              { name: 'id', title: 'ID' },
              { name: 'name', title: 'Campaign' },
              { name: 'createdBy', title: 'Created By' },
              { name: 'createdAt', title: 'Date Created' },
              { name: 'url', title: 'URL' },
              { name: 'is_active', title: 'Status' }
            ],
            campaignItems: [],
            selection: [],
            showPopup: false
          };
          
        //   this.loadData = this.loadData.bind(this)
          this.changeSelection = selection => this.setState({ selection });
          this.fetchCampaigns = this.fetchCampaigns.bind(this);
    }

    componentDidMount(){
        // this.loadData();
        // this.setUserName()
        this.fetchCampaigns();
    }

    toggleCreateCampaign() {
        this.setState({
            showCreate: !this.state.showCreate
        });
    }

    fetchCampaigns() {
        fetch('http://localhost:4000/api/campaigns', {
            headers: { 
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(output => {
                this.setState({campaignItems: output.data});
                console.log(output.data)
            })
            .catch(err => {
                console.error(err);
        })
    }

    deleteCampaign(id) {
            fetch('http://localhost:4000/api/campaigns/' + id, {
                method:
                    'DELETE',
                headers: { 
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
                .then(res => res.json())
                .then(output => {
                    this.setState({campaignItems: output.data});
                })
                .catch(err => {
                    console.error(err);
                })
    }

    // setUserName(){
    //      var username  = localStorage.getItem('token');
    //      username = jwt_decode(username);
    //      this.setState({
    //          created_by: username
    //      })
    // }
    // handleInputChange(e){
    //     const target = e.target;
    //     const value = target.type === 'checkbox' ? target.checked : target.value;
    //     const name = target.name;
    //     this.setState({
    //         [name]: value
    //     });
    // }

    // loadData(){
    //     fetchCampaigns();
    //     this.setState({
    //         campaigns: campaignItems
    //     })
    // }

    togglePopup() {
        this.setState({
          showPopup: !this.state.showPopup
        });
    }

    render(){
        const { campaignItems, columns, selection } = this.state;
        return (
        <div classname="Home">
            <div className="container">
                <span>
                Total rows selected:
                {' '}
                {selection.length}
                </span>
                <Paper>
                    <Grid
                        rows={campaignItems}
                        columns={columns}
                    >
                        <PagingState
                        defaultCurrentPage={1}
                        pageSize={4}
                        />
                        <SelectionState
                        selection={selection}
                        onSelectionChange={this.changeSelection}
                        />
                        <IntegratedPaging />
                        <IntegratedSelection />
                        
                        <Button 
                        variant="fab"
                        color="primary"
                        aria-label="add"
                        onClick={this.togglePopup.bind(this)}>
                        +
                        </Button>

                        {this.state.showPopup ? 
                            <CreateCampaign
                                text='Close Me'
                                closePopup={this.togglePopup.bind(this)}
                            />
                            : null
                        }

                        <SortingState
                            defaultSorting={[
                                            { columnName: 'id', direction: 'asc' },
                                            { columnName: 'name', direction: 'asc' },
                                            { columnName: 'created_by', direction: 'asc' },
                                            { columnName: 'url', direction: 'asc' }
                                            ]}
                        />
                        <IntegratedSorting />
                        <SearchState defaultValue="" />
                        <IntegratedFiltering />
                        <Table />
                        <TableHeaderRow  showSortingControls />
                        <Toolbar />
                        <SearchPanel />
                        <TableSelection showSelectAll />
                        <PagingPanel />
                    </Grid>
                </Paper>
            </div>
        </div>
        );
    }
}

export default Home;
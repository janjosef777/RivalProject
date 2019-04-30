import React, { Component } from 'react';
import '../styles/home.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import jwt_decode from 'jwt-decode'

import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import {
    SelectionState,
    PagingState,
    IntegratedPaging,
    IntegratedSelection,
    SortingState,
    IntegratedSorting,
    SearchState,
    IntegratedFiltering,
    EditingState,
    DataTypeProvider
} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    Toolbar,
    SearchPanel,
    TableHeaderRow,
    TableSelection,
    PagingPanel,
    TableEditRow,
    TableEditColumn,
} from '@devexpress/dx-react-grid-material-ui';
import { withStyles } from '@material-ui/core/styles';
import CreateCampaign from './CampaignCrud/CreateCampaign';
import DeleteCampaign from './CampaignCrud/DeleteCampaign'

const getRowId = row => row.id;

const DateFormatter = ({ value }) => 
    value.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3/$2/$1')
    .replace(/T/, ' - ')
    .replace(/\..+/, '');
const DateTypeProvider = props => (
    <DataTypeProvider
        formatterComponent={DateFormatter}
        {...props}
    />
);

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            columns: [
                { name: 'id', title: 'ID' },
                { name: 'name', title: 'Campaign' },
                { name: 'createdBy', title: 'Created By' },
                { name: 'createdAt', title: 'Date Created' },
                { name: 'url', title: 'URL' },
                { name: 'isActive', title: 'Status' }
            ],
            dateColumns: ['createdAt'],
            campaignItems: [],
            selection: [],
            showCreatePopup: false,
            showDeletePopup: false,
            showUpdate: false,
            deleteId: null,
            updatedId: null,


        };
        this.changeSelection = selection => this.setState({ selection });
        this.fetchCampaigns = this.fetchCampaigns.bind(this);
        this.commitChanges = this.commitChanges.bind(this);
        this.toggleDeletePopup = this.toggleDeletePopup.bind(this);
        this.toggleUpdate = this.toggleUpdate.bind(this);
    }

    componentDidMount() {
        this.fetchCampaigns();
    }

    fetchCampaigns() {
        fetch('http://localhost:4000/api/campaigns', {
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(res => {
                sessionStorage.setItem('token', res.token);
                this.setState({ campaignItems: res.data });
                console.log(res.data)
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
                "Authorization": "Bearer " + sessionStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(res => {
                sessionStorage.setItem('token', res.token);
                console.log("deleted id: " + id)
                console.log(res.data)
            })
            .catch(err => {
                console.error(err);
            })
    }

    updatedCampaign(id) {
        fetch('http://localhost:4000/api/campaigns/' + id, {
            method:
                'PATCH',
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(res => {
                sessionStorage.setItem('token', res.token);
                console.log("updated id: " + id)
                console.log(res.data)
            })
            .catch(err => {
                console.error(err);
            })
    }

    commitChanges({ deleted, changed }) {
        let { campaignItems } = this.state;
            
        if (deleted) {
            this.setState({
                deleteId : deleted["0"]
            })
            this.toggleDeletePopup();

        }

        if ( changed ) {
            this.setState({
                updateId : changed["0"]
            })
            this.toggleUpdate();
            window.location.href = "/campaignview" + this.state.updateId;

        }
        this.setState({ campaignItems });
    }

    toggleCreatePopup() {
        this.setState({
            showCreatePopup: !this.state.showCreatePopup
        });
    }
    toggleDeletePopup() {
        this.setState({
            showDeletePopup: !this.state.showDeletePopup
        });
    }
    toggleUpdate() {
        this.setState({
            showUpdate: !this.state.showUpdate
        });
    }

    render() {
        const { campaignItems, columns, selection, dateColumns } = this.state;
        return (
            <div className="Home">
                <h2>Scratch & Win Campaigns</h2>
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
                            getRowId={getRowId}
                        >
                            <EditingState
                                onCommitChanges={this.commitChanges}
                            />
                            <DateTypeProvider
                                for={dateColumns}
                            />
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
                                className="add-btn"
                                onClick={this.toggleCreatePopup.bind(this)}>
                                +
                        </Button>

                            {this.state.showCreatePopup ?
                                <CreateCampaign
                                    closePopup={this.toggleCreatePopup.bind(this)}
                                />
                                : null
                            }

                            {this.state.showDeletePopup ?
                                <DeleteCampaign
                                    deleteId={this.state.deleteId}
                                    closePopup={this.toggleDeletePopup.bind(this)}
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
                            <TableHeaderRow showSortingControls />
                            <TableEditRow />
                            <TableEditColumn 
                            showEditCommand
                            showDeleteCommand />
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
import React, { Component } from 'react';
import '../styles/home.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link, Redirect } from 'react-router-dom';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import NavBarComponent from './NavBarComponent';
// import jwt_decode from 'jwt-decode'
import {
    Getter,
} from '@devexpress/dx-react-core';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';
import {
    // SelectionState,
    PagingState,
    IntegratedPaging,
    // IntegratedSelection,
    SortingState,
    IntegratedSorting,
    SearchState,
    IntegratedFiltering,
    EditingState,
    DataTypeProvider
} from '@devexpress/dx-react-grid';
import {
    Grid,
    VirtualTable,
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
import DeleteCampaign from './CampaignCrud/DeleteCampaign';
import CampaignView from './CampaignView/index';

const getRowId = row => row.id;

const DateFormatter = ({ value }) =>
    new Date(value).toLocaleString();
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
            popupVisible: false,
            activeRow: {},
            columns: [
                // { name: 'id', title: 'ID' }, COLUMN FOR ID
                { name: 'name', title: 'Campaign' },
                { name: 'createdBy', title: 'Created By' },
                { name: 'createdAt', title: 'Date Created' },
                { name: 'url', title: 'URL' },
            ],
            dateColumns: ['createdAt'],
            editingStateColumnExtensions: [
                { columnName: 'id', editingEnabled: false },
                { columnName: 'name', editingEnabled: false },
                { columnName: 'createdBy', editingEnabled: false },
                { columnName: 'createdAt', editingEnabled: false },
                { columnName: 'url', editingEnabled: false },
            ],
            campaignItems: [],
            // selection: [],
            showCreatePopup: false,
            showDeletePopup: false,
            showUpdate: false,
            deleteId: null,
            selectedCampaignId: null,


        };
        // this.changeSelection = selection => this.setState({ selection });
        this.fetchCampaigns = this.fetchCampaigns.bind(this);
        this.toggleDeletePopup = this.toggleDeletePopup.bind(this);
        this.closePopup = () => {
            this.setState({ popupVisible: false, activeRow: {} });
        };
        this.myUpdate = this.myUpdate.bind(this);
        this.myDelete = this.myDelete.bind(this);
    }

    componentDidMount() {
        this.fetchCampaigns();
    }

    fetchCampaigns() {
        fetch('api/campaigns', {
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

    renderRedirect = () => {
        if (this.state.showUpdate) {
            return <Redirect to={{
                pathname: '/campaignview',
                state: { selectedCampaignId: this.state.selectedCampaignId }
            }}
            />
        }
    }

    myUpdate(row){
        this.setState({
            selectedCampaignId : row.id,
            showUpdate: true
        })
    }
    myDelete(row){
        console.log(row.id)
        this.setState({
            deleteId: row.id,
            showDeletePopup: true
        })
    }

    render() {
        const {
            campaignItems,
            columns,
            // selection, SELECTION FUNCTIONALITY
            dateColumns,
            editingStateColumnExtensions,
            rows, popupVisible, activeRow
        } = this.state;
        const showDetails = row => {
            this.myUpdate(row)
        };
        const deleteCampaign = row => {
            this.myDelete(row)
        };
        const CellComponent = ({ children, row, ...restProps }) => (
            <TableEditColumn.Cell row={row} {...restProps}>
                {children}
                    <TableEditColumn.Command
                        id="custom"
                        class="fas fa-edit"
                        onExecute={() => {
                            showDetails(row);
                        }} // action callback
                    />
                    <TableEditColumn.Command
                        id="custom"
                        class="fas fa-trash"
                        onExecute={() => {
                            deleteCampaign(row);
                        }} // action callback
                    />
            </TableEditColumn.Cell>
        );

        const TableRow = ({ row, ...restProps }) => (
            <VirtualTable.Row
              {...restProps}
              // eslint-disable-next-line no-alert
              onClick={() => showDetails(row)}
              style={{
                cursor: 'pointer',
              }}
            />
          );
        
        return (

            <div>
                <NavBarComponent></NavBarComponent>
                <div className="Home">

                    <h2>Scratch & Win Campaigns</h2>
                    <div className="container">

                        {/* Selection functionality */}
                        {/* <span>
                            Total rows selected:
                            {' '}
                            {selection.length}
                        </span> */}
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

                                {/* Selection functionality */}
                                {/* <SelectionState
                                    selection={selection}
                                    onSelectionChange={this.changeSelection}
                                /> */}

                                {/* Selection functionality */}
                                {/* <IntegratedSelection /> */}

                                <Button
                                    variant="fab"
                                    color="primary"
                                    aria-label="add"
                                    className="add-btn"
                                    onClick={this.toggleCreatePopup.bind(this)}>
                                    +
                                </Button>

                                <i></i>

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

                                {this.renderRedirect()}

                                <SortingState
                                    defaultSorting={[
                                        // Column for ID
                                        // { columnName: 'id', direction: 'asc' },
                                        { columnName: 'name', direction: 'asc' },
                                        { columnName: 'created_by', direction: 'asc' },
                                        { columnName: 'url', direction: 'asc' }
                                    ]}
                                />
                                <IntegratedSorting />
                                <SearchState defaultValue="" />
                                <IntegratedFiltering />
                                <VirtualTable rowComponent={TableRow}/>
                                <TableHeaderRow showSortingControls />
                                <TableEditRow />
                                <TableEditColumn
                                    width={170}
                                    cellComponent={CellComponent}
                                />
                                <Getter
                                    name="tableColumns"
                                    computed={({ tableColumns }) => {
                                        const result = [
                                            ...tableColumns.filter(c => c.type !== TableEditColumn.COLUMN_TYPE),
                                            { key: 'editCommand', type: TableEditColumn.COLUMN_TYPE, width: 140 }
                                        ];
                                        return result;
                                    }
                                    }
                                />
                                <Toolbar />
                                <SearchPanel />
                                {/*  Selection Functionality */}
                                {/* <TableSelection showSelectAll /> */}
                            </Grid>
                            <Dialog onClose={this.closePopup} open={popupVisible}>
                                <DialogTitle id="responsive-dialog-title">Row Details</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        {columns.map(column => (
                                            <div key={column.name}>
                                                <strong>{column.title}</strong>: {activeRow[column.name]}
                                            </div>
                                        ))}
                                    </DialogContentText>
                                </DialogContent>
                            </Dialog>
                        </Paper>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
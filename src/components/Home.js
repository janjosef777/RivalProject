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

let campaignItems = [
    {
        id: 1,
        campaign: "Campaign example",
        dateCreated: "01-01-2019",
        isActive: true,
        hasPrizes: true
    },
    {
        id: 2,
        campaign: "Campaign example 2",
        dateCreated: "02-02-2019",
        isActive: false,
        hasPrizes: true
    },
    {
        id: 3,
        campaign: "Campaign example 3",
        dateCreated: "02-02-2019",
        isActive: false,
        hasPrizes: true
    },
    {
        id: 4,
        campaign: "Campaign example 4",
        dateCreated: "02-02-2019",
        isActive: false,
        hasPrizes: true
    },
    {
        id: 5,
        campaign: "Campaign example 5",
        dateCreated: "02-02-2019",
        isActive: false,
        hasPrizes: true
    },
    {
        id: 6,
        campaign: "Campaign example 6",
        dateCreated: "02-02-2019",
        isActive: false,
        hasPrizes: true
    },
    {
        id: 7,
        campaign: "Campaign example 7",
        dateCreated: "02-02-2019",
        isActive: false,
        hasPrizes: true
    }
];

const SORTERS = {
    NUMBER_ASCENDING: mapper => (a, b) => mapper(a) - mapper(b),
    NUMBER_DESCENDING: mapper => (a, b) => mapper(b) - mapper(a),
    STRING_ASCENDING: mapper => (a, b) => mapper(a).localeCompare(mapper(b)),
    STRING_DESCENDING: mapper => (a, b) => mapper(b).localeCompare(mapper(a))
  };
  
const getSorter = data => {
    const mapper = x => x[data.field];
    let sorter = SORTERS.STRING_ASCENDING(mapper);
  
    if (data.field === "id") {
      sorter =
        data.direction === "ascending"
          ? SORTERS.NUMBER_ASCENDING(mapper)
          : SORTERS.NUMBER_DESCENDING(mapper);
    } else {
      sorter =
        data.direction === "ascending"
          ? SORTERS.STRING_ASCENDING(mapper)
          : SORTERS.STRING_DESCENDING(mapper);
    }
  
    return sorter;
};

let count = campaignItems.length;

const service = {
    fetchItems: payload => {
      const { activePage, itemsPerPage } = payload.pagination;
      const start = (activePage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      let result = Array.from(campaignItems);
      result = result.sort(getSorter(payload.sort));
      return Promise.resolve(result.slice(start,end));
    },
    fetchTotal: payload => {
        return Promise.resolve(campaignItems.length);
    },
    create: campaignItem => {
      count += 1;
      campaignItems.campaign.push({
        ...campaignItem,
        id: count
      });
      return Promise.resolve(campaignItem);
    },
    update: data => {
      const campaignItem = campaignItems.find(t => t.id === data.id);
      campaignItem.isActive = data.isActive;
      return Promise.resolve(campaignItem);
    },
    delete: data => {
      const campaignItem = campaignItems.find(t => t.id === data.id);
      campaignItems = campaignItems.filter(t => t.id !== campaignItem.id);
      return Promise.resolve(campaignItem);
    }
  };


class Home extends Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="Home">
        
                <div className="container">
                <Table>
                    <CRUDTable
                    caption="Your Campaign"
                    fetchItems={payload => service.fetchItems(payload)}
                    >
            
                    <Fields>
                        <Field name="id" label="Id" hideInCreateForm />
                        <Field name="campaign" label="Campaign" />
                        <Field
                        name="dateCreated"
                        label="Date Created"
                        type="date"
                        hideInCreateForm
                        />
                        <Field
                        name="isActive"
                        label="Status"
                        type="bool"
                        hideInCreateForm
                        />
                        <Field
                        name="hasPrize"
                        label="Has Prize"
                        type="bool"
                        hideInCreateForm
                        />
                    </Fields>

                    <UpdateForm
                        title="Campaign Update Process"
                        message="Update Campaign"
                        trigger="Update"
                        onSubmit={campaignItem => service.update(campaignItem)}
                        submitText="Update"
                        validate={values => {
                        const errors = {};
                        
                        if (!values.id) {
                            errors.id = "Please, provide id";
                        }
                        if (!values.isActive) {
                            errors.isActive = "Please, provide Date Today";
                        }
                        return errors;
                        }}
                    />
                    
                    <DeleteForm
                        title="Campaign Delete Process"
                        message="Are you sure you want to delete the Campaign?"
                        trigger="Delete"
                        onSubmit={campaignItem => service.delete(campaignItem)}
                        submitText="Delete"
                        validate={values => {
                        const errors = {};
                        if (!values.id) {
                            errors.id = "Please, provide id";
                        }
                        return errors;
                        }}
                    />

                    <CreateForm
                        className="createButton"
                        campaign="Campaign Creation"
                        message="Create a new Campaign"
                        trigger="Create Campaign"
                        onSubmit={campaignItem => service.create(campaignItem.campaign)}
                        submitText="Create"
                        validate={values => {
                        const errors = {};
                        if (!values.campaign) {
                            errors.campaign = "Please, provide Campaign title";
                        }
                        return errors;
                        }}
                    >
                    <Button>Delete</Button>
                    </CreateForm>
                    <Pagination
                        itemsPerPage={5}
                        activePage={1}
                        defaultActivePage = {1}
                        fetchTotalOfItems={payload => service.fetchTotal(payload)}
                    />
                </CRUDTable>
                </Table>
                </div>
            </div>
        )
    }
}

export default Home;
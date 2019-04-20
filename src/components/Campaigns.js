import React, { Component } from 'react';
import Upload from '../upload/Upload';
import { Card, Button, CardTitle, CardText } from 'reactstrap'; 


class Campaigns extends React.Component {

    render(){
        return(
            <div className="Cards-Wrapper">
                <h2>Your Campaigns</h2>
                <ul></ul>
            </div>
        )
    }
}

export default Campaigns;
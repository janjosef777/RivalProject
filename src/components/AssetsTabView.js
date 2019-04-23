import React, { Component } from 'react';
import Upload from '../upload/Upload';
import { Card, Button, CardTitle, CardText } from 'reactstrap';
import '../styles/assetstabview.css'; 
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

class AssetTabView extends Component {

    constructor(props) {
        super(props);
        this.title = "Image";
        this.state = {
            campaigns: []
        }
    }


    render(){
        return(
            <div className="assetTabView">
                <h2>{this.title}</h2>
                    <Link to="/overlay">Overlay image</Link>
                    <Link to="/cardresult">Card Result</Link>
            </div>

        )
    }
}

export default AssetTabView;
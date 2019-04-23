import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import '../styles/login.css';
import logo from '../images/Rivallogo.png';
import Login from './Login'
import { Redirect } from 'react-router-dom'
class Logout extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
        this.logout = this.logout.bind(this);
    }

    logout() {
        localStorage.clear();
        window.location.href = '/';
    }

    componentDidMount(){
        this.logout();
    }
    render(){
        return (
            <div>
            </div>
         )
    }
}
export default Logout;
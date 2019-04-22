import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import '../styles/login.css';
import logo from '../images/Rivallogo.png';


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        fetch('http://localhost:4000/api/auth', {
            method: 'POST',
            body: JSON.stringify({ "username": this.state.username, "password": this.state.password }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            response.json()
                .then(responseJson => {
                    console.log(JSON.stringify(responseJson));
                    window.localStorage.setItem("token", JSON.stringify(responseJson));
                    window.setTimeout(function () {
                        window.location.href = "/";
                    }, 2000);
                })
        })
    }

    handleUsername(event) {
        this.setState({ username: event.target.value });
    }

    handlePassword(event) {
        this.setState({ password: event.target.value });
    }

    render() {
        return (
            <div className="loginPage" >
                <img src={logo} className="logoImage" />
                <Form>
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input type="text" id="username" value={this.state.username} onChange={this.handleUsername} placeholder="Username" name="username" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" value={this.state.password} onChange={this.handlePassword} name="password" id="password" placeholder="Password" />
                    </FormGroup>
                    <Button onClick={this.handleSubmit}>Login</Button>
                </Form>
            </div>
        )
    }
}

export default Login;
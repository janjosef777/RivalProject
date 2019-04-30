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
        })
            .then(res => res.json())
            .then(res => {
                if (res.status == 403) {
                    window.alert("Incorrect Username/Password. Please try again")
                } else {
                    sessionStorage.setItem("token", res.token)
                    window.location.href = '/';
                }
            }).catch(err => {
                console.error(err);
            })
    }

    logUserIn(json) {
        console.log(json);
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
                <div className="loginForm">
                    <img src={logo} className="logoImage" />
                    <Form>
                        <FormGroup>
                            <Input placeholder="Username..." type="text" id="username" value={this.state.username} onChange={this.handleUsername} placeholder="Username" name="username" />
                        </FormGroup>
                        <FormGroup>
                            <Input placeholder="Password..." type="password" value={this.state.password} onChange={this.handlePassword} name="password" id="password" placeholder="Password" />
                        </FormGroup>
                        <Button className="login-btn" onClick={this.handleSubmit}>Login</Button>
                    </Form>
                </div>
            </div>
        )
    }
}

export default Login;
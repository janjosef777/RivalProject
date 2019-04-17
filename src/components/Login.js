import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import '../styles/login.css';
import logo from '../images/Rivallogo.png';


class Login extends React.Component {

    render(){
        return(
            <div className="loginPage">
                <img src={logo} className="logoImage"/>
                <Form>
                    <FormGroup>
                      <Label for="username">Username</Label>
                      <Input type="text" name="username" id="usernameInput" placeholder="Username" />
                    </FormGroup>
                    <FormGroup>
                      <Label for="examplePassword">Password</Label>
                      <Input type="password" name="password" id="examplePassword" placeholder="Password" />
                    </FormGroup>  
                    <Button>Login</Button>
                </Form>
            </div>
        )
    }
}

export default Login;
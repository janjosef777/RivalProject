import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


class Login extends React.Component {

    render(){
        return(
            <Form>
                <FormGroup>
                  <Label for="username">Username</Label>
                  <Input type="text" name="username" id="usernameInput" placeholder="Username" />
                </FormGroup>
                <FormGroup>
                  <Label for="examplePassword">Password</Label>
                  <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
                </FormGroup>  
            </Form>
            
        )
    }
}

export default Login;
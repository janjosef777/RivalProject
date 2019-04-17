import React, { Component } from 'react';
import '../sass/App.scss';


class Login extends React.Component {

    render(){
        return(
            <div className="loginPage">
                <tbody className="loginContainer">
                    <tr>
                        <th></th>
                        <th>HELLO</th>
                        <th></th>
                    </tr>
                    <tr>
                        <td><p>Username: </p></td>
                        <td><input type="text"/></td>
                        <td></td>
                    </tr>
                    <tr> 
                        <td><p>Password: </p></td>
                        <td><input type="text"/></td>
                        <td></td>
                    </tr> 
                    <tr>
                        <td></td>
                        <td><input type="button" value="LOGIN" class="btn btn-success"/></td>
                        <td></td>
                    </tr>
                </tbody>
            </div>
        )
    }
}

export default Login;
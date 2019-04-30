import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import NavBarComponent from './components/NavBarComponent'
import Login from './components/Login'
import Welcome from './components/Welcome'

class EnsureLoggedIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false
        };
        this.checkToken = this.checkToken.bind(this)
    }
    checkToken() {
        var legit = window.sessionStorage.getItem('token')
        console.log(legit);
        if (legit !== null) {
            this.setState({
                isLoggedIn: true
            }, () => {
                console.log(this.state.isLoggedIn)
            })
        } else {
            this.setState({
                isLoggedIn: false
            }, () => {
                console.log(this.state.isLoggedIn)
            })
        }
    }

    componentDidMount() {
        this.checkToken();
    }
    render() {
        const invertCondition = this.props.invertCondition ? true : false;
        const gotoLogin = this.props.gotoLogin ? true : false;
        const renderNav = this.props.renderNav ? true : false;
        if (this.state.isLoggedIn == !invertCondition) {
            return this.props.children
        } else {
            // if (gotoLogin) {
            //     return <Redirect to='/login' />
            //     return <Login/>
            // } else {
            //     return null
            // }   
            if (renderNav) {
                return <div><NavBarComponent /><Welcome /></div>
            } else {
                return null
            }   
            //return null         
        }
    }
}
export default EnsureLoggedIn;
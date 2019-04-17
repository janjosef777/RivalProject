import React, { Component } from 'react';

class EnsureLoggedIn extends React.Component {
    isLoggedIn = true;

    render() {
        if (this.isLoggedIn) {
            return this.props.children
        } else {
            return null
        }
    }
}
export default EnsureLoggedIn;
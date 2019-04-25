import React, { Component } from 'react';
import Upload from '../upload/Upload';
import '../styles/prizes.css';
import { Card, Button, CardTitle, CardText } from 'reactstrap';


class Prizes extends Component {
    constructor(props) {
        super(props);
        this.title = "Choose from prizes";
        this.state = {
            prizes: []
        }
        this.fetchCards();
    }

    fetchCards() {
        fetch('http://localhost:4000/api/images')
            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.setState({ prizes: res });
            })
            .catch(err => {
                console.error(err);
            })
    }

    onUpload(err, res) {
        if (err) {
            console.error(err);
        } else {
            this.state.prizes.push(res);
            this.setState({
                prizes: this.state.prizes
            });
        }
    }


    render() {
        return (
            <div className="Cards-Wrapper">
                <Upload onUpload={this.onUpload.bind(this)} />
                <h5>{this.title}</h5>
                <ul>
                    {this.state.prizes.map((prize, idx) =>
                        <li key={idx}><img src={prize.path} alt="Prize Image" className="img-thumbnail" onClick={this.props.onClick} /></li>
                    )}
                </ul>
            </div>
        )
    }
}

export default Prizes;
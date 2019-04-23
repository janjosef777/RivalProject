import React, { Component } from 'react';
import Upload from '../upload/Upload';
import '../styles/nonprizes.css';
import { Card, Button, CardTitle, CardText } from 'reactstrap'; 


class Nonprizes extends Component {
    constructor(props) {
        super(props);
        this.title = "All Non-Prizes";
        this.state = {
            nonprizes: []
        }
        this.fetchCards();
    }

    fetchCards() {
        fetch('http://localhost:4000/api/images')
            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.setState({nonprizes: res});
            })
            .catch(err => {
                console.error(err);
            })
    }

    onUpload(err, res) {
        if(err) {
            console.error(err);
        } else {
            this.state.nonprizes.push(res);
            this.setState({
                nonprizes: this.state.nonprizes
            });
        }
    }


    render(){
        return(
            <div className="Cards-Wrapper">
                <h2>{this.title}</h2>
                <ul>
                    {this.state.nonprizes.map((nonprize,idx) => 
                        <li key={idx}><img src={nonprize.path} alt="Nonprizes Image" /></li>
                    )}
                    <li>  
                        <Upload onUpload={this.onUpload.bind(this)} />
                    </li>
                </ul>
            </div>
        )
    }
}

export default Nonprizes;
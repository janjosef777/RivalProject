import React, { Component } from 'react';
import Upload from '../upload/Upload';
import { Card, Button, CardTitle, CardText } from 'reactstrap';
import '../styles/cardresult.css';

class CardResult extends Component {
    constructor(props) {
        super(props);
        this.title = "Card Result";
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
                this.setState({prizes: res});
            })
            .catch(err => {
                console.error(err);
            })
    }

    onUpload(err, res) {
        if(err) {
            console.error(err);
        } else {
            this.state.prizes.push(res);
            this.setState({
                prizes: this.state.prizes
            });
        }
    }


    render(){
        return(
            <div className="cardResultTab">
                <div className="Cards-Wrapper">
                    <h2>{this.title}</h2>
                    <ul>
                        {this.state.prizes.map((prize,idx) => 
                            <li key={idx}><img src={prize.path} alt="Prize Image" /></li>
                        )}
                        <li>  
                            <Upload onUpload={this.onUpload.bind(this)} />
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}


export default CardResult;
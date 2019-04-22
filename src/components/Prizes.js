import React, { Component } from 'react';
import Upload from '../upload/Upload';
import '../styles/prizes.css';
import { Card, Button, CardTitle, CardText } from 'reactstrap'; 


class Prizes extends Component {
    constructor(props) {
        super(props);
        this.title = "All Prizes";
        this.state = {
            cards: []
        }
        this.fetchCards();
    }

    fetchCards() {
        fetch('http://localhost:4000/api/images')
            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.setState({cards: res});
            })
            .catch(err => {
                console.error(err);
            })
    }

    onUpload(err, res) {
        if(err) {
            console.error(err);
        } else {
            this.state.cards.push(res);
            this.setState({
                cards: this.state.cards
            });
        }
    }


    render(){
        return(
            <div className="Cards-Wrapper">
                <h2>{this.title}</h2>
                <ul>
                    {this.state.cards.map((card,idx) => 
                        <li key={idx}><img src={card.path} alt="Card Image" /></li>
                    )}
                    <li>  
                        <Upload onUpload={this.onUpload.bind(this)} />
                    </li>
                </ul>
            </div>
        )
    }
}

export default Prizes;
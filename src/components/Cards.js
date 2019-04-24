import React, { Component } from 'react';
import Upload from '../upload/Upload';
import '../styles/cards.css';
import CardCreation from './CardCreation';
import { Card, Button, CardTitle, CardText } from 'reactstrap'; 


class Cards extends Component {
    constructor(props) {
        super(props);
        this.title = "Add an overlay image from these cards";
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
                <Upload onUpload={this.onUpload.bind(this)} />
                <h5>{this.title}</h5>
                <ul>
                    {this.state.cards.map((card,idx) => 
                        <li key={idx}><img src={card.path} alt="Card Image" className="img-thumbnail" onClick={this.props.onClick}/></li>
                    )} 
                        
                </ul>


            </div>
        )
    }
}

export default Cards;
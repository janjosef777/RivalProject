import React, { Component } from 'react';
import '../../styles/campaignView.css';


class CampaignCardResults extends Component {
    constructor(props) {
        super(props)

        this.setSelectedIndex = this.setSelectedIndex.bind(this);

    }

    removeImage(e){
 
    }

    setSelectedIndex = (e, idx) => {
        this.props.setState({selectedIndex: idx});
        //console.log(this.props.selectedIndex);
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <ul className="results-list">
                    {this.props.results.map((cardresult,idx) => 
                        <li key={idx}><button onClick={this.removeImage.bind(this)} className="delete-img">X</button>
                        <img 
                            src={cardresult} 
                            onClick={(e) => {this.setSelectedIndex(e, idx)}}
                            alt="Selected Prize Image" 
                            className="img-thumbnail result-img" 
                        /></li>
                    )}
                </ul>
            </div>

        )
    }
}
export default CampaignCardResults;
import React, { Component } from 'react';
import '../../styles/campaignView.css';
import SetPrize from './SetPrize';
import { ImgThumbImg, ResultsList } from '../../styles/componentStyles';


class CampaignCardResults extends Component {
    constructor(props) {
        super(props)

        this.setSelectedIndex = this.setSelectedIndex.bind(this);
        this.triggerDelete=this.triggerDelete.bind(this);
    }

    triggerDelete(idx){
        let imageList = this.props.results;
        console.log(imageList);
        imageList.splice(idx, 1);
        this.props.setState({results: imageList});
        console.log(imageList);
    }

    setSelectedIndex = (idx) => {
        this.props.setState({selectedIndex: idx});
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <ul className="results-list">
                    {this.props.cardResults.map((cardResult,idx) => 
                        <ResultsList key={idx}>
                            <button 
                                style={{ margin: '5px' }}
                                onClick={(e) => {
                                    this.triggerDelete(idx)
                                }} className="delete-img"
                            >
                                X
                        </button>
                        <img 
                            src={cardresult.image} 
                            onClick={(e) => {this.setSelectedIndex(idx)}}
                            alt="Selected Prize Image" 
                            className="img-thumbnail result-img" 
                        />
                        <p>Title</p>
                        <p>- 1 +</p>
                        </li>
                    )}
                </ul>
            </div>

        )
    }
}
export default CampaignCardResults;
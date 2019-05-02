import React, { Component } from 'react';
import '../../styles/campaignView.css';
import SetPrize from './SetPrize';
import { ImgThumbImg } from '../../styles/componentStyles';


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
                        <li key={idx}>
                            <button onClick={(e) => {
                                this.triggerDelete(idx)
                            }} className="delete-img">
                                X
                            </button>
                            <ImgThumbImg 
                                src={cardResult.image} 
                                onClick={(e) => {this.setSelectedIndex(idx)}}
                                alt="Selected Prize Image" 
                            />
                            <SetPrize
                                {...this.props}
                                cardResult={cardResult}
                                idx={idx}
                            />
                        </li>
                    )}
                </ul>
            </div>

        )
    }
}
export default CampaignCardResults;
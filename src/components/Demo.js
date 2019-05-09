import React from 'react'
import SingleCardState from './CampaignView/SingleCardState'
import ApiHelper from '../helpers/ApiHelper';
import ScratchCard from '../scratch-card'
// import Flex from './scratch-card/flex'
// import FlexItem from './scratch-card/flex/flex-item'

class Demo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isCleared: false,
            campaign: {},
            overlay: {
                image: {}
            },
            result: {
                image: {}
            }
        }
        this.handleCleared = this.handleCleared.bind(this);
        this.setState = this.setState.bind(this);
        this.fetchRandom();
    }
    fetchRandom() {
        ApiHelper.fetch('/api/random/demo/' + this.props.match.params.campaignId, {
            method:
                'GET',
            headers: {
                "Content-type": "application/json"
            }
        }).then(res => {
            this.setState({
                campaign: res,
                overlay: res.template,
                result: res.result
            });
            delete res.template;
            delete res.result;
        }).catch(err => console.error(err));
    }

    handleCleared(e) {
        if (!this.state.isCleared){
            this.setState({isCleared: true});
        }
    }

    render() {
        // const title = 'Title';
        // const overlaySrc = 'hi.jpeg';//atob(this.props.match.params.overlaySrc);//'/uploads/IMG_20180902_150937.jpeg'
        // const overlayAlt = 'card overlay image'

        // const resultTitle = 'Yay';//atob(this.props.match.params.resultTitle);//'YOU WON A STARSHIP!'
        // const resultSrc = 'hi.jpeg';//atob(this.props.match.params.resultSrc);//'/uploads/mark-rademaker-posterfinal-3.jpeg'
        // const resultAlt = 'card result image'

        const imgWidth = 300;
        const imgHeight = 300;

        // No API response yet
        if(!this.state.overlay.image.path)
            return <div>Loading...</div>;
        return (
            <div>
                  <ScratchCard
                    isCleared={this.state.isCleared}
                    brush="brush"
                    width={300}
                    height={300}
                    percentToClear={50}
                    subRectRatio={0.7}
                    imgURL={this.state.overlay.image.path}
                    onClear={this.handleCleared}
                  >
                    <img
                      width={imgWidth}
                      height={imgHeight}
                      src={this.state.result.image.path}
                      alt="scratch card"
                    />
                  </ScratchCard>
                {/* {!this.state.isCleared &&
                
                <SingleCardState
                    {...this.state} setState={this.setState}
                    // title={title}
                    // imgSrc={overlaySrc}
                    // imgAlt={overlayAlt}
                    // imgWidth={imgWidth}
                    // imgHeight={imgHeight}
                    // handleCleared={this.handleCleared}
                />}   

                {this.state.isCleared &&
                <SingleCardState
                    title={resultTitle}
                    imgSrc={resultSrc}
                    imgAlt={resultAlt}
                    imgWidth={imgWidth}
                    imgHeight={imgHeight}
                    handleCleared={this.handleCleared}
                />}  */}

            </div>       
        )        
    }
}
export default Demo
        
// <div className="App">
//     <header className="App-header">
//         <div className="Game">
//             <h4 className="card-header">{title}</h4>
//             <Flex>
//                 <FlexItem margin="sm">
//                     <ScratchCard
//                         isCleared={isCleared}
//                         brush="brush"
//                         width={300}
//                         height={300}
//                         percentToClear={50}
//                         subRectRatio={0.7}
//                         imgURL={overlaySrc}
//                         onClear={this.handleCleared}
//                     >
//                         <img
//                             width={300}
//                             height={300}
//                             src={imgSrc}
//                             alt="scratch card"
//                         />
//                     </ScratchCard>
//                 </FlexItem>
//             </Flex>
//         </div>
//     </header>
// </div>

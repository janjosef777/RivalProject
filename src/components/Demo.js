import React from 'react'
import SingleCardState from './CampaignView/SingleCardState'
// import ScratchCard from './scratch-card'
// import Flex from './scratch-card/flex'
// import FlexItem from './scratch-card/flex/flex-item'

class Demo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isCleared: false
        }
        this.handleCleared = this.handleCleared.bind(this)
        console.log('on construct');
        console.log(this.props);
    }

    handleCleared(e) {
        if (!this.state.isCleared){
            this.setState({isCleared: true});
        }
    }
    componentDidMount() {
        console.log('on mount');
        console.log(this.props);
    }

    render() {
        const title = 'Title';
        const overlaySrc = 'hi.jpeg';//atob(this.props.match.params.overlaySrc);//'/uploads/IMG_20180902_150937.jpeg'
        const overlayAlt = 'card overlay image'

        const resultTitle = 'Yay';//atob(this.props.match.params.resultTitle);//'YOU WON A STARSHIP!'
        const resultSrc = 'hi.jpeg';//atob(this.props.match.params.resultSrc);//'/uploads/mark-rademaker-posterfinal-3.jpeg'
        const resultAlt = 'card result image'

        const imgWidth = 300;
        const imgHeight = 300;

        return (
            <div>

                {!this.state.isCleared &&
                <SingleCardState
                    title={title}
                    imgSrc={overlaySrc}
                    imgAlt={overlayAlt}
                    imgWidth={imgWidth}
                    imgHeight={imgHeight}
                    handleCleared={this.handleCleared}
                />}   

                {this.state.isCleared &&
                <SingleCardState
                    title={resultTitle}
                    imgSrc={resultSrc}
                    imgAlt={resultAlt}
                    imgWidth={imgWidth}
                    imgHeight={imgHeight}
                    handleCleared={this.handleCleared}
                />} 

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

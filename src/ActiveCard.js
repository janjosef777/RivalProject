import React from 'react'
import SingleCardState from './components/SingleCardState'
// import ScratchCard from './scratch-card'
// import Flex from './scratch-card/flex'
// import FlexItem from './scratch-card/flex/flex-item'

class ActiveCard extends React.Component {
    constructor() {
        super()
        this.state = {
            isCleared: false
        }
        this.handleCleared = this.handleCleared.bind(this)
    }

    handleCleared(e) {
        console.log("cleareed?")
        if (!this.state.isCleared){
            this.setState({isCleared: true});
        }
    }

    render() {
        const title = 'THANKS FOR PARTICIPATING!'
        const overlaySrc = '/uploads/IMG_20180902_150937.jpeg'
        const overlayAlt = 'card overlay image'

        const resultTitle = 'YOU WON A STARSHIP!'
        const resultSrc = '/uploads/mark-rademaker-posterfinal-3.jpeg'
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
export default ActiveCard
        
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

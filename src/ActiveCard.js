import React from 'react'

// import ScratchCard from './scratch-card'
// import Flex from './scratch-card/flex'
// import FlexItem from './scratch-card/flex/flex-item'

class ActiveCard extends React.Component {
    constructor() {
        super()
        this.state = {
            isCleared: false
        }
    }

    handleCleared() {
        this.setState({isCleared: true});
    }

    render() {
        const title = 'THANKS FOR PARTICIPATING!'
        const overlaySrc = '../images/IMG_20180902_150937.jpeg'
        const resultTitle = 'YOU WON A STARSHIP!'
        const imgSrc = './images/mark-rademaker-posterfinal-3.jpeg'
        const isCleared = this.state.isCleared;
        const imgWidth = 300;
        const imgHeight = 300;
        return (
            <div>

                { !isCleared &&
                <div>
                    <header>
                        <h1>{title}</h1>
                    </header>
                    <main>
                        <img
                            width={imgWidth}
                            height={imgHeight}
                            src={overlaySrc}
                            alt="scratch card overlay"
                        />
                    </main>
                </div> }   

                {isCleared &&
                <div>
                    <header>
                        <h1>{resultTitle}</h1>
                    </header>
                    <main>
                        <img
                            width={imgWidth}
                            height={imgHeight}
                            src={imgSrc}
                            alt="scratch card result image"
                        />
                    </main>
                </div>}  

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

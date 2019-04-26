import React from 'react'

import ScratchCard from './scratch-card'
import Flex from './scratch-card/flex'
import FlexItem from './scratch-card/flex/flex-item'

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
        const overlaySrc = 'IMG_20180902_150937.jpeg'
        const resultTitle = 'YOU WON A STARSHIP!'
        const imgSrc = 'mark-rademaker-posterfinal-3.jpeg'
        const isCleared = this.state.isCleared;
        return (
            true && (
                <div className="App">
                    <header className="App-header">
                        <div className="Game">
                            <h4 className="card-header">{title}</h4>
                            <Flex>
                                <FlexItem margin="sm">
                                    <ScratchCard
                                        isCleared={isCleared}
                                        brush="brush"
                                        width={300}
                                        height={300}
                                        percentToClear={50}
                                        subRectRatio={0.7}
                                        imgURL={overlaySrc}
                                        onClear={this.handleCleared}
                                    >
                                        <img
                                            width={300}
                                            height={300}
                                            src={imgSrc}
                                            alt="scratch card"
                                        />
                                    </ScratchCard>
                                </FlexItem>
                            </Flex>
                        </div>
                    </header>
                </div>
            )
        )
    }
}

export default ActiveCard

import React from 'react'
import styled from 'styled-components'

const CardFrame = styled.div`
    width: ${props => props.frameWidth + 'px'};
    padding-bottom: ${props => props.framePadding + 'px'};
    background-color: ${props => props.frameColor};
    border: ${props => props.borderStyle};
`;

const Title = styled.h1`
    font-size: 1.2em;
    text-align: center;
    padding: ${props => props.framePadding + 'px'}
    border-bottom: ${props => props.borderStyle};
`;

const Image = styled.img`
    object-fit: cover;
    display: block;
    margin: 0 auto;
    margin-top: ${props => props.framePadding + 'px'}
    border: ${props => props.borderStyle};
`;

class SingleCardState extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const framePadding = 25;
        const frameColor = 'lightgray';
        const borderStyle = 'solid black 1px';
        return (
            <CardFrame 
                frameWidth={this.props.imgWidth + 2 * framePadding}
                framePadding={framePadding}
                frameColor={frameColor}
                borderStyle={borderStyle}
            >
                <Title 
                    framePadding={framePadding}
                    borderStyle={borderStyle}
                >{this.props.title}</Title>
                <Image
                    width={this.props.imgWidth}
                    height={this.props.imgHeight}
                    src={this.props.imgSrc}
                    alt={this.props.imgAlt}
                    onClick={e => this.props.handleCleared(e)}
                    framePadding={framePadding}
                    borderStyle={borderStyle}
                />
            </CardFrame>
        )
    }
}
export default SingleCardState

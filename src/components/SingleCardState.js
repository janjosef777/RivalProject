import React from 'react'
import styled from 'styled-components'
import {Input} from 'reactstrap';

const CardFrame = styled.div`
    width: ${props => props.frameWidth + 'px'};
    padding-bottom: ${props => props.framePadding + 'px'};
    background-color: ${props => props.frameColor};
    border: ${props => props.borderStyle};
    display: block;
    margin 0 auto;
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

class EditableTitle extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            editing: false,
            titleVal: this.props.titleVal
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleClick = (e) => {
        if (this.props.overlay || this.props.cardResults[this.props.selectedIndex]) {
            this.setState({editing: true});
            this.setState({titleVal: this.props.titleVal});
        }   
    }

    handleChange(e) {

        this.setState({
            titleVal: e.target.value
        });
        this.titleVal = e.target.value
    }

    handleBlur = (e) => {
        this.setState({editing: false});

        if (this.props.overlay) {
            this.props.setState({
                title: e.target.value
            });
        } else if (this.props.index) {
            console.log(this.props.cardResults);
            var tempCardResults = this.props.cardResults;
            var tempEntry = tempCardResults[this.props.selectedIndex];
            tempEntry.title = e.target.value;
            tempCardResults.splice(this.props.selectedIndex, 1, tempEntry)
            this.props.setState({
                cardResults: tempCardResults
            });
        }
    }

    render() {
        if (!this.state.editing) {
            return (
                <Title
                    framePadding={this.props.framePadding}
                    borderStyle={this.props.borderStyle}
                    onClick={this.handleClick}
                >{this.props.titleVal}</Title>
            )
        } else {
            return (
                <Input
                    value={this.state.titleVal} 
                    onChange={this.handleChange} 
                    onBlur={this.handleBlur}
                />
            )
        }
    }
}

class SingleCardState extends React.Component {
    constructor(props) {
        super(props)       
    }

    render() {
        if (this.props.overlay) {
            this.titleVal = this.props.title;
            this.imgSrc = this.props.overlayImg;
            this.imgAlt = 'card overlay image'
        } else if (this.props.index) {
            // this is the case for viewing card results by index
            this.titleVal = this.props.cardResults[this.props.selectedIndex] ?
                this.props.cardResults[this.props.selectedIndex].title : '';
            this.imgAlt = 'card result image'
            this.imgSrc = this.props.cardResults[this.props.selectedIndex] ?
                this.props.cardResults[this.props.selectedIndex].image : '';
        } else {
            this.titleVal = this.props.title;
            this.imgSrc = this.props.imgSrc;
            this.imgAlt = this.props.imgAlt;
        }
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
                {this.props.editable ?
                <EditableTitle
                    {...this.props}
                    titleVal = {this.titleVal}
                    framePadding={framePadding}
                    borderStyle={borderStyle}
                ></EditableTitle>
                :
                <Title
                    {...this.props}
                    titleVal = {this.titleVal}
                    framePadding={framePadding}
                    borderStyle={borderStyle}
                >{this.props.title}</Title>}
                <Image
                    {...this.props}
                    width={this.props.imgWidth}
                    height={this.props.imgHeight}
                    src={this.imgSrc}
                    alt={this.imgAlt}
                    onClick={this.props.handleCleared ? e => this.props.handleCleared(e) : undefined}
                    framePadding={framePadding}
                    borderStyle={borderStyle}
                />
            </CardFrame>
        )
    }
}
export default SingleCardState

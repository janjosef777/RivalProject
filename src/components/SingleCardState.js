import React from 'react'


class SingleCardState extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <header>
                    <h1>{this.props.title}</h1>
                </header>
                <main>
                    <img
                        width={this.props.imgWidth}
                        height={this.props.imgHeight}
                        src={this.props.imgSrc}
                        alt={this.props.imgAlt}
                        onClick={e => this.props.handleCleared(e)}
                    />
                </main>
            </div>
        )
    }
}
export default SingleCardState

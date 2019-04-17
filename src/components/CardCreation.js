import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';

class CardCreation extends React.Component {
    render(){
        return(
            <div className="CardCreation">

                <Dropzone
                    multiple={false}
                    accept="image/*"
                    onDrop={this.onImageDrop.bind(this)}>
                    <p>Drop an image or click to select a file to upload.</p>
                </Dropzone>

            </div>
        )
    }
}

export default CardCreation;
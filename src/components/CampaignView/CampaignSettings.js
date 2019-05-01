import React, { Component } from 'react';


class CampaignSettings extends Component {
    constructor(props) {
        super(props)

    }

    componentDidMount() {

    }

    render() {
        return (

                <div className='wrapper'>
                    <div className='wrapper'>
                        <div className="input-section">
                            <h6>Campaign Name: </h6>
                            <input type="text" value={this.props.selectedCampaign.name} placeholder="Campaign Name..."/>
                        </div>
                        <div className="input-section">
                            <h6>Estimated Participants: </h6>
                            <input type="text" value={this.props.selectedCampaign.estimatedParticipants}  placeholder="Estimated Participants..."/>
                        </div>
                        <div className="input-section activation-switch">
                            <h6>Activation Status: {this.props.selectedCampaign.isActive} </h6>
                            <label class="switch">
                                <input type="checkbox" defaultChecked />
                                <span className="slider round"></span>
                            </label>
                        </div>
                        <div className="input-section">
                            <h6><i class="fas fa-link"></i></h6>
                        </div>
                    </div>
                </div>

                )
            }
        }
        export default CampaignSettings;

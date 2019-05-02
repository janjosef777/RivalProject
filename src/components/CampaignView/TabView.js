import React, { Component } from 'react';
//import Upload from '../upload/Upload';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import '../../styles/campaignView.css';
//import { } from '../../styles/componentStyles';
import CardTemplateView from './CardTemplateView';
import CampaignCardResults from './CampaignCardResults';
import SetPrize from './SetPrize';
import { BorderBox } from '../../styles/componentStyles';


class TabView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updateId: this.props.updateId
        }
        this.selectedCampaign = []
        this.toggle = this.toggle.bind(this);
    }

    toggle(tab) {
        if (this.props.activeTab !== tab) {
            this.props.setState({
                activeTab: tab
            });
        }
    }

    componentDidMount() {
        this.loadCampaign()
    }
    loadCampaign(){
        fetch('http://localhost:4000/api/campaigns/' + this.state.updateId, {
            headers: { 
                "Authorization": "Bearer " + sessionStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                sessionStorage.setItem('token', res.token);
                this.selectedCampaign = res.data;
                this.props.setState({ selectedCampaign: this.selectedCampaign })
            })
            .catch(err => {
                console.error(err);
            })
    }
    
    render() {
        return (
            <div className='wrapper'>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.props.activeTab === '1' })}
                            onClick={() => { this.toggle('1'); }}
                        >
                            Overlay Image
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.props.activeTab === '2' })}
                            onClick={() => { this.toggle('2'); }}
                        >
                            Card Results
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.props.activeTab}>
                    <TabPane tabId="1">
                        <Row>
                            <Col sm="12">
                                <h4>Overlay image for the scratch card</h4>
                                <CardTemplateView 
                                    overlay
                                    {...this.props}
                                ></CardTemplateView>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            <Col sm="12">
                                <h4>A collection of card results for the campaign</h4>
                                <CardTemplateView
                                    index
                                    {...this.props}
                                ></CardTemplateView>
                                <BorderBox>
                                    <SetPrize {...this.props} idx={this.props.selectedIndex}/>
                                </BorderBox>
                                <CampaignCardResults {...this.props}></CampaignCardResults>
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
            </div>

        )
    }
}

export default TabView;
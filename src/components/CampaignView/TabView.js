import React, { Component } from 'react';
//import Upload from '../upload/Upload';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import '../../styles/campaignView.css';
import CardTemplateView from './CardTemplateView';
import CampaignCardResults from './CampaignCardResults';


class TabView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // updateId: this.props.updateId
        }

        this.toggle = this.toggle.bind(this);
    }

    toggle(tab) {
        if (this.props.activeTab !== tab) {
            this.props.setState({
                activeTab: tab
            });
        }
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
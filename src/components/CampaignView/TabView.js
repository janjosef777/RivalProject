import React, { Component } from 'react';
//import Upload from '../upload/Upload';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import '../../styles/campaignView.css';
import CardTemplateView from './CardTemplateView';
import CampaignCardResults from './CampaignCardResults';
import CampaignSettings from './CampaignSettings';

class TabView extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          activeTab: '1'
        };
      }
    
      toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
      }

    componentDidMount() {

    }

    render() {
        return (
            <div className='wrapper'>
                    <Nav tabs>
                    <NavItem>
                        <NavLink
                        className={classnames({ active: this.state.activeTab === '1' })}
                        onClick={() => { this.toggle('1'); }}
                        >
                        Overlay Image
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                        className={classnames({ active: this.state.activeTab === '2' })}
                        onClick={() => { this.toggle('2'); }}
                        >
                        Card Results
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                        className={classnames({ active: this.state.activeTab === '3' })}
                        onClick={() => { this.toggle('3'); }}
                        >
                        Campaign Settings
                        </NavLink>
                    </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <Row>
                        <Col sm="12">
                            <h4>Overlay image for the scratch card</h4>
                            <CardTemplateView {...this.props} setState={this.props.setState}></CardTemplateView>
                        </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                    <Row>
                        <Col sm="12">
                            <h4>A collection of card results for the campaign</h4>
                            <CampaignCardResults {...this.props} setState={this.props.setState}></CampaignCardResults>
                        </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="3">
                    <Row>
                        <Col sm="12">
                            <h4>The Campaign Settings</h4>
                            <CampaignSettings {...this.props} setState={this.props.setState}></CampaignSettings>
                        </Col>
                        </Row>
                    </TabPane>
                </TabContent>
            </div>

        )
    }
}

export default TabView;
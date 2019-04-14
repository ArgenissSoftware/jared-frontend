import React, { Component } from "react";
import { Tab } from "semantic-ui-react";
import RolesTab from "../RolesTab/roles-tab";
import UserForm from "../Users/UserForm";
import ContactForm from "./ContactForm";
import ClientsAssign from "../Users/ClientsAssign";

/**
 * User Tabs Component
 */
export default class UserTabs extends Component {

  /**
   * Render
   */
  render(){
    const panes = [
      {
        menuItem: "User Data",
        pane: (
          <Tab.Pane key={0}>
            <UserForm history={this.props.history} match={this.props.match} />
          </Tab.Pane>
        )
      },
      {
        menuItem: "Contact",
        pane: (
          <Tab.Pane key={1}>
            <ContactForm history={this.props.history} match={this.props.match} />
          </Tab.Pane>
        )
      },
      {
        menuItem: "Clients",
        pane: (
          <Tab.Pane key={2}>
            <ClientsAssign history={this.props.history} match={this.props.match} />
          </Tab.Pane>
        )
      },
      {
        menuItem: "Roles",
        pane: (
          <Tab.Pane key={3}>
            <RolesTab history={this.props.history} match={this.props.match} />
          </Tab.Pane>
        )
      }
    ];

    return (
      <div className="ui container center aligned">
        <Tab panes={panes} renderActiveOnly={false} key={panes} />
      </div>
    );
  }
}
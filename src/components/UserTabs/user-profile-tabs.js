import React, { Component } from "react";
import { Tab } from "semantic-ui-react";
import UserDataTab from "../UserDataTab/user-data-tab";
import ContactTab from "../ContactTab/contact-tab";
import ClientsTab from "../ClientsTab/clients-tab";

export default class UserTabs extends Component {
  constructor(props) {
    super(props);


  }

  render(){
    const panes = [
      {
        menuItem: "User Data",
        pane: (
          <Tab.Pane key={0}>
            <UserDataTab history={this.props.history} match={this.props.match} />
          </Tab.Pane>
        )
      },
      {
        menuItem: "Contact",
        pane: (
          <Tab.Pane key={1}>
            <ContactTab history={this.props.history} match={this.props.match} />
          </Tab.Pane>
        )
      },
      {
        menuItem: "Clients",
        pane: (
          <Tab.Pane key={2}>
            <ClientsTab history={this.props.history} match={this.props.match} />
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
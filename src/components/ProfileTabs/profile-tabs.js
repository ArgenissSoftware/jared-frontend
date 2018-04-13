import React, { Component } from "react";
import { Tab } from "semantic-ui-react";
import PersonalDataTab from "../PersonalDataTab/personal-data-tab";
import ContactTab from "../ContactTab/contact-tab";
import ClientsTab from "../ClientsTab/clients-tab";
import { observer } from "mobx-react";

const panes = [
  {
    menuItem: "Personal Data",
    pane: (
      <Tab.Pane key={0}>
        <PersonalDataTab />
      </Tab.Pane>
    )
  },
  {
    menuItem: "Contact",
    pane: (
      <Tab.Pane key={1}>
        <ContactTab />
      </Tab.Pane>
    )
  },
  {
    menuItem: "Clients",
    pane: (
      <Tab.Pane key={2}>
        <ClientsTab />
      </Tab.Pane>
    )
  }
];

const ProfileTabs = observer(
  class ProfileTabs extends Component {
    render() {
      return (
        <div className="ui container center aligned">
          <Tab panes={panes} renderActiveOnly={false} key={panes} />
        </div>
      );
    }
  }
);

export default ProfileTabs;

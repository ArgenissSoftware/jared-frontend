import React, { Component } from "react";
import { Tab } from "semantic-ui-react";
import PersonalDataForm from "./PersonalDataForm";
import ContactForm from "../Users/ContactForm";

let panes = [];

/**
 * Profile Tabs Component
 */
export default class ProfileTabs extends Component {
  constructor(props) {
    super(props);

    panes = [
      {
        menuItem: "Personal Data",
        pane: (
          <Tab.Pane key={0}>
            <PersonalDataForm />
          </Tab.Pane>
        )
      },
      {
        menuItem: "Contact",
        pane: (
          <Tab.Pane key={1}>
            <ContactForm />
          </Tab.Pane>
        )
      }
    ];
  }

  render() {
    return (
      <div className="ui container center aligned">
        <Tab panes={panes} renderActiveOnly={false} key={panes} />
      </div>
    );
  }
}

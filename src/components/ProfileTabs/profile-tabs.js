import React, { Component } from "react";
import { Tab } from "semantic-ui-react";
import PersonalDataTab from "../PersonalDataTab/personal-data-tab";
import ContactTab from "../ContactTab/contact-tab";
import { Button } from "semantic-ui-react";
import axios from "axios";
import { observer } from "mobx-react";
import store from "../../DataStore";

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
  { menuItem: "Clients", pane: "Tab 3 Content" }
];

const ProfileTabs = observer(
  class ProfileTabs extends Component {
    constructor(props) {
      super(props);
    }

    async save() {
      await axios
        .put(store.getUrl + "/api/user/"+store.username, { 
      //.put( store.getUrl + "/api/user", {
          username: "cuti@mail.com", //quitar requerimiento de username del backends
          id: "5aafebbe1e8d500010c038aa",
          name: store.firstName,
          surname: store.lastName,
          birthday: store.dateOfBirth,
          cuil: store.CUIL,
          passport: store.passport,
          visa: store.USVisa,
          startWorkDate: store.startDate,
          status: store.careerStatus,
          relation: store.status ,
          career: store.career,
          careerStatus: store.status,
          chidrenCount: store.children,
          alarmCode: store.alarmCode,
          address: store.address,
          phone: store.phoneNumber,
          cellphone: store.cellPhone,
          email: store.emailAddress,
          skype: store.skype,
          githubID: store.githubID
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    }

    render() {
      return (
        <div className="ui container center aligned">
          <Tab panes={panes} renderActiveOnly={false} key={panes} />
          <Button onClick={this.save}>Save</Button>
        </div>
      );
    }
  }
);

export default ProfileTabs;

import React, { Component } from "react";
import { Tab } from "semantic-ui-react";
import PersonalDataTab from "../PersonalDataTab/personal-data-tab";
import ContactTab from "../ContactTab/contact-tab";
import { Button } from "semantic-ui-react";
import axios from "axios";
import { observer } from "mobx-react";
import ProfileStore from "../../stores/ProfileStore";
import AppStore from "../../stores/AppStore";

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
    async save() {
      await axios
        .put(AppStore.getUrl + "/api/user/"+ProfileStore.username, {
      //.put( store.getUrl + "/api/user", {
          username: "cuti@mail.com", //quitar requerimiento de username del backends
          id: "5aafebbe1e8d500010c038aa",
          name: ProfileStore.firstName,
          surname: ProfileStore.lastName,
          birthday: ProfileStore.dateOfBirth,
          cuil: ProfileStore.CUIL,
          passport: ProfileStore.passport,
          visa: ProfileStore.USVisa,
          startWorkDate: ProfileStore.startDate,
          status: ProfileStore.careerStatus,
          relation: ProfileStore.status ,
          career: ProfileStore.career,
          careerStatus: ProfileStore.status,
          chidrenCount: ProfileStore.children,
          alarmCode: ProfileStore.alarmCode,
          address: ProfileStore.address,
          phone: ProfileStore.phoneNumber,
          cellphone: ProfileStore.cellPhone,
          email: ProfileStore.email,
          skype: ProfileStore.skype,
          githubID: ProfileStore.githubID
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

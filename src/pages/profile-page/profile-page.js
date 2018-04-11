import React, { Component } from "react";
import { observer } from "mobx-react";
import "./profile-page.css";
import ProfileTabs from "../../components/ProfileTabs/profile-tabs";
import { Button } from "semantic-ui-react";
import axios from "axios";
import AppStore from "../../stores/AppStore";
import ProfileStore from "../../stores/ProfileStore";
import TopNavBar from "../../components/TopNavBar/top-nav-bar";

const ProfilePage = observer(
  class ProfilePage extends Component {
    constructor(props) {
      super(props);
      this.save = this.save.bind(this);
    }

    async save() {
      await axios
        .put(AppStore.URL + "/api/user/", {
          username: ProfileStore.username,
          id: ProfileStore.id,
          name: ProfileStore.firstName,
          surname: ProfileStore.lastName,
          birthday: ProfileStore.dateOfBirth,
          cuil: ProfileStore.CUIL,
          passport: ProfileStore.passport,
          visa: ProfileStore.USVisa,
          startWorkDate: ProfileStore.startDate,
          status: ProfileStore.careerStatus,
          relation: ProfileStore.status,
          career: ProfileStore.career,
          careerStatus: ProfileStore.status,
          childrenCount: ProfileStore.children,
          alarmCode: ProfileStore.alarmCode,
          address: ProfileStore.address,
          phone: ProfileStore.phoneNumber,
          cellphone: ProfileStore.cellPhone,
          email: ProfileStore.email,
          skype: ProfileStore.skype,
          githubID: ProfileStore.githubID
        })
        .then(
          function(response) {
            this.props.history.push("home");
          }.bind(this)
        )
        .catch(function(error) {
          console.log(error);
        });
    }

    render() {
      return (
        <div>
          <TopNavBar history={this.props.history} />
          <div className="ui container center aligned">
            <ProfileTabs /> <Button onClick={this.save}>Save</Button>
          </div>
        </div>
      );
    }
  }
);

export default ProfilePage;

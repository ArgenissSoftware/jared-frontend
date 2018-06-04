import React, { Component } from "react";
import { observer } from "mobx-react";
import "./profile-page.css";
import ProfileTabs from "../../components/ProfileTabs/profile-tabs";
import { Button } from "semantic-ui-react";
import axios from "axios";
import AppStore from "../../stores/AppStore";
import ProfileStore from "../../stores/ProfileStore";
import TopNavBar from "../../components/TopNavBar/top-nav-bar";

import signUpStore from "../../stores/SignUpStore";
import { Redirect } from "react-router-dom";

let updateSuccessMessage = false;

const ProfilePage = observer(
  class ProfilePage extends Component {
    constructor(props) {
      super(props);
      this.save = this.save.bind(this);
      signUpStore.navigate = false;
    }

    handleChange(e) {
      signUpStore[e.target.name] = e.target.value;
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
          githubID: ProfileStore.githubID,
          clients: ProfileStore.clients
        })
        .then(
          function(response) {
            updateSuccessMessage = true;
            signUpStore.navigate = true;
            this.props.history.push("home");
          }.bind(this)
        )
        .catch(function(error) {
          console.log(error);
        });
    }

    render() {
      if (signUpStore.navigate){
        return <Redirect to={{ pathname: "/home", state: { updateSuccessMessage: updateSuccessMessage } }} push={true} />;
      }
      return (
        <div>
          <TopNavBar history={this.props.history} />
          <div className="ui container center aligned">
            <ProfileTabs history={this.props.history} /> <Button onClick={this.save}>Save</Button>
          </div>
        </div>
      );
    }
  }
);

export default ProfilePage;

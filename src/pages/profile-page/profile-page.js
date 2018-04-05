import React, { Component } from "react";
import { observer } from "mobx-react";
import "./profile-page.css";
import { Tab } from "semantic-ui-react";
import ProfileTabs from "../../components/ProfileTabs/profile-tabs";

const ProfilePage = observer(
  class ProfilePage extends Component {
    render() {
      return (
        <div>
          <ProfileTabs />
        </div>
      );
    }
  }
);

export default ProfilePage;

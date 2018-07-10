import React, { Component } from "react";
import { observer } from "mobx-react";
import "./profile-page.css";
import ProfileTabs from "../../components/ProfileTabs/profile-tabs";
import { Button } from "semantic-ui-react";
import axios from "axios";
import AppStore from "../../stores/AppStore";
import TopNavBar from "../../components/TopNavBar/top-nav-bar";
import signUpStore from "../../stores/SignUpStore";
import { Redirect } from "react-router-dom";
import userStore from "../../stores/UserStore";

let updateSuccessMessage = false;

const ProfilePage = observer(
  class ProfilePage extends Component {
    constructor(props) {
      super(props);
      signUpStore.navigate = false;
    }

    handleChange(e) {
      signUpStore[e.target.name] = e.target.value;
    }

    save() {
      userStore.updateUser().then((response) => {
        if (response.data.message = "User updated!"){
          updateSuccessMessage = true;
          signUpStore.navigate = true;
        }
      });
    }

    setUser(user){
      this.user = user;
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

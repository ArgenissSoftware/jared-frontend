import React, { Component } from "react";
import { Button, Message } from "semantic-ui-react";
import { observer } from "mobx-react";

import ProfileTabs from "../../components/ProfileTabs/profile-tabs";
import signUpStore from "../../stores/SignUpStore";
import userStore from "../../stores/UserStore";
import authStore from "../../stores/AuthStore";



export default observer(
  class ProfileComponent extends Component {
    constructor(props) {
      super(props);
    }

    handleChange(e) {
      signUpStore[e.target.name] = e.target.value;
    }

    save() {
      userStore.updateUser();
    }

    componentDidMount() {
      userStore.getUserById(authStore.user._id);
    }

    setUser(user) {
      this.user = user;
    }

    render() {
      return (
        <div className="ui container center aligned">
          {(userStore.error) ? <Message negative
            header="Error"
            content={userStore.error}
          /> : null}
          <ProfileTabs history={this.props.history} />
          <Button onClick={this.save}>Save</Button>
        </div>
      );
    }
  }
);

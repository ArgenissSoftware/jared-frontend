import React, { Component } from "react";
import { observer } from "mobx-react";
import ProfileTabs from "../../components/ProfileTabs/profile-tabs";
import { Button } from "semantic-ui-react";
import signUpStore from "../../stores/SignUpStore";
import userStore from "../../stores/UserStore";

let updateSuccessMessage = false;

const ProfileComponent = observer(
  class ProfileComponent extends Component {
    constructor(props) {
      super(props);
    }

    handleChange(e) {
      signUpStore[e.target.name] = e.target.value;
    }

    save() {
      userStore.updateUser().then((response) => {
        if (response.data.message = "User updated!"){
          updateSuccessMessage = true;
        }
      });
    }

    setUser(user){
      this.user = user;
    }

    render() {

      return (
          <div className="ui container center aligned">
            <ProfileTabs history={this.props.history} /> <Button onClick={this.save}>Save</Button>
          </div>
      );
    }
  }
);

export default ProfileComponent;

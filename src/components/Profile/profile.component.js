import React, { Component } from "react";
import { 
  Button, 
  Message 
} from "semantic-ui-react";
import { observer } from "mobx-react";

import ProfileTabs from "../../components/ProfileTabs/profile-tabs";
import signUpStore from "../../stores/SignUpStore";
import userStore from "../../stores/UserStore";
import authStore from "../../stores/AuthStore";
import ErrorMessage from "../ErrorMessage/error-message";



export default observer(
  class ProfileComponent extends Component {
    constructor(props) {
      super(props);
      this.state = { errorText: "" };
    }

    save = async () => {
      this.setState({ errorText: "" });
      userStore.updateUser()
      .catch((error) => {
        this.setState({ errorText: error.response.request.responseText });
      });
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
          { this.state.errorText ? (
            <ErrorMessage message = { this.state.errorText }/>
            ) : null
          }
        </div>
      );
    }
  }
);

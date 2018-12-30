import React, { Component } from "react";
import { Button, Message } from "semantic-ui-react";
import { observer } from "mobx-react";

import UserProfileTabs from "../../components/UserTabs/user-profile-tabs";
import signUpStore from "../../stores/SignUpStore";
import userStore from "../../stores/UserStore";

export default observer(
  class UserProfileComponent extends Component {
    constructor(props) {
      super(props);
      this.state = { newClient: false}
    }

    handleChange(e) {
      signUpStore[e.target.name] = e.target.value;
    }

    save() {
      if(this.state.newClient){
        userStore.add(userStore.user);
      }else{
      userStore.updateUser();
      }
    }

    setTitle(){
      let url = (window.location.href).split("/");
      if(url[url.length -1] == 'new'){ 
        this.setState({ newClient: true });
      }
    }

    componentDidMount(){
      userStore.getUserById(userStore.user._id)
    }

    render() {
      return (
        <div className="ui container center aligned">
          {(userStore.error) ? <Message negative
            header="Error"
            content={userStore.error}
          /> : null}
          <UserProfileTabs history={this.props.history}/>
          <Button onClick={this.save}>Save</Button>
        </div>
      );
    }
  }
);
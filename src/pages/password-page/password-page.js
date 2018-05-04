import React, { Component } from "react";
import { observer } from "mobx-react";
import "./password-page.css";
import { Button } from "semantic-ui-react";
import axios from "axios";
import AppStore from "../../stores/AppStore";
import ProfileStore from "../../stores/ProfileStore";
import TopNavBar from "../../components/TopNavBar/top-nav-bar";
import PasswordForm from "../../components/PasswordForm/password-form";

const PasswordPage = observer(
  class PasswordPage extends Component {
    constructor(props) {
      super(props);
      this.save = this.save.bind(this);
    }

    save() {
      //call API
    }

    render() {
      return (
        <div>
          <TopNavBar history={this.props.history} />
          <div className="ui container center aligned">
            <PasswordForm />
            </div>
            <div className="ui container center aligned">
            <Button onClick={this.save}>Save</Button>
          </div>
        </div>
      );
    }
  }
);

export default PasswordPage;

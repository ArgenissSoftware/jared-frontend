import React, { Component } from "react";
import { observer } from "mobx-react";
import "./forgot-password-page.css";
import LoginTopNavBar from "../../components/LoginTopNavBar/login-top-nav-bar";
import signInStore from "../../stores/SignInStore";
import ForgotPasswordForm from "../../components/ForgotPasswordForm/forgot-password-form";

const ForgotPasswordPage = observer(
  class ForgotPasswordPage extends Component {
    constructor(props) {
      super(props);
    }

    save() {
      //call API
    }

    render() {
      return (
        <div>
          <LoginTopNavBar store={signInStore} />
          <div className="ui container center aligned">
            <ForgotPasswordForm />
          </div>
        </div>
      );
    }
  }
);

export default ForgotPasswordPage;

import React, { Component } from "react";
import "./login-page.css";
import LoginTopNavBar from "../../components/LoginTopNavBar/login-top-nav-bar";
import RegisterForm from "../../components/RegisterForm/register-form";
import { observer } from "mobx-react";
import signInStore from "../../stores/SignInStore";
import signUpStore from "../../stores/SignUpStore";

const LoginPage = observer(
  class LoginPage extends Component {
    render() {
      return (
        <div>
          <div className="App">
            <LoginTopNavBar history={this.props.history} store={signInStore} />
            <RegisterForm store={signUpStore} />
          </div>
        </div>
      );
    }
  }
);

export default LoginPage;

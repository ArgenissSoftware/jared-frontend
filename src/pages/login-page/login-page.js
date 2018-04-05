import React, { Component } from "react";
import "./login-page.css";
import TopNavBar from "../../components/TopNavBar/top-nav-bar";
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
            <TopNavBar store={signInStore} />
            <RegisterForm store={signUpStore} />
          </div>
        </div>
      );
    }
  }
);

export default LoginPage;

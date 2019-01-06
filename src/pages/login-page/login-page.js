import React, { Component } from "react";
import "./login-page.css";
import { observer } from "mobx-react";
import LoginForm from '../../components/Login/LoginForm';

const LoginPage = observer(
  class LoginPage extends Component {
    render() {
      return (
        <LoginForm history={this.props.history} />
      );
    }
  }
);

export default LoginPage;

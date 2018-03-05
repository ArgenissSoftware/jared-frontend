import React, { Component } from "react";
import "./login-page.css";
import TopNavBar from "../../components/TopNavBar/top-nav-bar";
import RegisterForm from "../../components/RegisterForm/register-form";
import { observer } from "mobx-react";
import store from "../../DataStore";

@observer
class LoginPage extends Component {
  render() {
    return (
      <div>
        <div className="App">
          <TopNavBar store={store} />
        </div>
        <RegisterForm store={store} />
      </div>
    );
  }
}

export default LoginPage;

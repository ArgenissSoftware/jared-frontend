import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import { observer } from "mobx-react";
import signInStore from "../../stores/SignInStore";
import AppStore from "../../stores/AppStore";
import logo from "../../images/logo1.png";
import axios from "axios";
import { Redirect } from "react-router-dom";
import profileStore from "../../stores/ProfileStore";

const LoginTopNavBar = observer(
  class LoginTopNavBar extends Component {
    constructor(props) {
      super(props);
      signInStore.navigate = false;
      this.state = {
        haveError: false
      }
    }

    /**
     * set the values for the inputs
     */
    handleChange = (e) => {
      console.log('hahaha');
      signInStore[e.target.name] = e.target.value;
      this.setState({ haveError: false });
    }

    /**
     * execute the login method
     */
    logIn = () => {
      this.setState({ haveError: false });

      axios
        .post(AppStore.URL + "/api/login", {
          email: signInStore.email,
          password: signInStore.password
        })
        .then((success) => {
          profileStore.getUserData(signInStore.email);
          signInStore.navigate = true;
          signInStore.email = "";
          signInStore.password = "";
        })
        .catch((error) => {
          this.setState({ haveError: true });
        });
    }

    render() {
      if (signInStore.navigate) {
        return <Redirect to="/home" push={true} />;
      }

      return (
        <div>
          <div className="ui menu">
            <div className="header small item">
              <img src={logo} alt="" />
              Jared
            </div>

            <div className="right menu">
              <div className="item">
                <Form onSubmit={this.handleSubmit} error={this.state.haveError}>
                  <Form.Group>
                    <Form.Input
                      className={this.state.haveError ? "error" : ""}
                      type="text"
                      placeholder="Email or username"
                      name="email"
                      onChange={this.handleChange}
                    />
                    <Form.Input
                      className={this.state.haveError ? "error" : ""}
                      type="password"
                      placeholder="password"
                      name="password"
                      onChange={this.handleChange}
                    />
                    <Form.Button disabled={!(signInStore.email && signInStore.password)} content="Login" onClick={this.logIn} />
                  </Form.Group>
                </Form>
              </div>
            </div>
          </div>
          {this.state.haveError ? (
            <div className="ui error message">
              <div className="header">Login failed!</div>
              <p>Invalid email/username or password</p>
            </div>
          ) : null}
        </div>
      );
    }
  }
);

export default LoginTopNavBar;

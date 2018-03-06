import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import { observer } from "mobx-react";
import store from "../../DataStore";
import logo from "../../images/logo1.png";
import axios from "axios";

let loginErrorMessage = false;

const TopNavBar = observer(
  class TopNavBar extends Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
      store[e.target.name] = e.target.value;
      loginErrorMessage = false;
    }

    async logIn() {
      loginErrorMessage = false;

      await axios
        .post(store.URL + "/api/login", {
          email: store.email,
          password: store.password
        })
        .then(function(response) {
          //mover a homepage
        })
        .catch(function(error) {
          console.log(error);
          loginErrorMessage = true;
        });

      store.email = "";
      store.password = "";
    }

    render() {
      return (
        <div>
          <div className="ui large menu">
            <div className="header item">
              <img src={logo} alt="" />
              Jared
            </div>

            <div className="right menu">
              <div className="item">
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group>
                    <Form.Input
                      className={loginErrorMessage ? "error" : ""}
                      type="text"
                      placeholder="Email"
                      name="email"
                      value={store.email}
                      onChange={this.handleChange}
                    />
                    <Form.Input
                      className={loginErrorMessage ? "error" : ""}
                      type="password"
                      placeholder="password"
                      name="password"
                      value={store.password}
                      onChange={this.handleChange}
                    />
                    <Form.Button content="Login" onClick={this.logIn} />
                  </Form.Group>
                </Form>
              </div>
            </div>
          </div>
          {loginErrorMessage ? (
            <div className="ui error message">
              <div className="header">Login failed!</div>
              <p>Invalid email or password</p>
            </div>
          ) : null}
        </div>
      );
    }
  }
);

export default TopNavBar;

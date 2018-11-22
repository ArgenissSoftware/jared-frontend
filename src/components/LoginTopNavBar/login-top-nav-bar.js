import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import { observer } from "mobx-react";
import signInStore from "../../stores/SignInStore";
import logo from "../../images/logo1.png";
import authStore from "../../stores/AuthStore";

const LoginTopNavBar = observer(class LoginTopNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      haveError: false
    }
  }

  handleChange = (e) => {
    signInStore[e.target.name] = e.target.value;
    this.setState({ haveError: false });
  }

  logIn = () => {
    this.setState({ haveError: false });
    let data = {
      email: signInStore.username,
      password: signInStore.password
    };
    authStore
      .login(data)
      .then(() => {
        this.props.history.push("/home");
      })
      .catch(err => {
        this.setState({ haveError: true });
      });
  }

  render() {
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
                    name="username"
                    onChange={this.handleChange}/>
                  <Form.Input
                    className={this.state.haveError ? "error" : ""}
                    type="password"
                    placeholder="password"
                    name="password"
                    onChange={this.handleChange} />
                  <Form.Button
                    disabled={!(signInStore.username && signInStore.password)}
                    content="Login"
                    onClick={this.logIn} />
                </Form.Group>
              </Form>
            </div>
          </div>
        </div>
        {this.state.haveError
          ? (
            <div className="ui error message">
              <div className="header">Login failed!</div>
              <p>Invalid email/username or password</p>
            </div>
          )
          : null}
      </div>
    );
  }
});

export default LoginTopNavBar;

import React, { Component } from "react";
import { observer } from "mobx-react";
import store from "../../DataStore";
import "./register-form.css";
import axios from "axios";
import { Redirect } from "react-router-dom";

let registerErrorMessage = false;
let errorText;

const RegisterForm = observer(
  class RegisterForm extends Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      store.navigate = false;
    }

    handleChange(e) {
      store[e.target.name] = e.target.value;
      registerErrorMessage = false;
    }

    async register() {
      if (store.passwordRegister === store.repeatPassword) {
        await axios
          .post(store.getUrl() + "/api/user/", {
            username: store.emailRegister, //quitar requerimiento de username del backends
            email: store.emailRegister,
            password: store.passwordRegister
          })
          .then(function(response) {
            console.log(response);
            store.navigate = true;
          })
          .catch(function(error) {
            console.log(error);
            errorText = "Please check your email and password";
            registerErrorMessage = true;
          });
      } else {
        errorText = "Passwords do not match";
        registerErrorMessage = true;
      }

      store.emailRegister = "";
      store.passwordRegister = "";
      store.repeatPassword = "";
    }

    render() {
      if (store.navigate) {
        return <Redirect to="/home" push={true} />;
      }
      return (
        <div className="form-div">
          <div className="ui middle aligned center aligned grid">
            <div className="column">
              <h2 className="ui image header">
                <div className="content">Create a new account</div>
              </h2>
              <form className="ui form">
                <div className="ui stacked secondary  segment">
                  <div
                    className={registerErrorMessage ? "field error" : "field"}
                  >
                    <div className="ui left icon input">
                      <i className="user icon" />
                      <input
                        type="email"
                        name="emailRegister"
                        value={store.emailRegister}
                        placeholder="E-mail address"
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div
                    className={registerErrorMessage ? "field error" : "field"}
                  >
                    <div className="ui left icon input">
                      <i className="lock icon" />
                      <input
                        type="password"
                        name="passwordRegister"
                        value={store.passwordRegister}
                        placeholder="Password"
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div
                    className={registerErrorMessage ? "field error" : "field"}
                  >
                    <div className="ui left icon input">
                      <i className="lock icon" />
                      <input
                        type="password"
                        name="repeatPassword"
                        value={store.repeatPassword}
                        placeholder="Repeat Password"
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div
                    className="ui fluid large teal submit button"
                    onClick={this.register}
                  >
                    Create
                  </div>
                </div>
              </form>
              {registerErrorMessage ? (
                <div className="ui error message">
                  <div className="header">Registration failed!</div>
                  <p>{errorText}</p>
                </div>
              ) : null}

              <div className="ui message">
                Forgot your password?{" "}
                <a href="https://s.codepen.io/voltron2112/debug/PqrEPM?">
                  Click Here
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
);

export default RegisterForm;

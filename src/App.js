import React, {Component} from "react";
import "./App.css";
import SignInStore from "./stores/SignInStore";
import {BrowserRouter as Router, Route} from "react-router-dom";
import LoginPage from "./pages/login-page/login-page";
import HomePage from "./pages/home/home.page";
import ForgotPasswordPage from "./pages/forgot-password-page/forgot-password-page";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={LoginPage} store={SignInStore}/>
          <Route path="/home" component={HomePage} store={SignInStore}/>
          <Route
            exact
            path="/forgot_password"
            component={ForgotPasswordPage}
          />
        </div>
      </Router>
    );
  }
}

export default App;
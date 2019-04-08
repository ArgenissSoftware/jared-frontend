import React, {Component} from "react";
import "./App.css";
import SignInStore from "./stores/SignInStore";
import {BrowserRouter as Router, Route} from "react-router-dom";
import HomePage from "./pages/home/home.page";
import ForgotPasswordPage from "./pages/forgot-password-page/forgot-password-page";
import LoginForm from './components/Login/LoginForm';
import RegisterForm from './components/Register/register-form';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={LoginForm} store={SignInStore}/>
          <Route exact path="/register" component={RegisterForm} store={SignInStore}/>
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
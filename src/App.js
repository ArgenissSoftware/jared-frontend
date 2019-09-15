import React, {Component} from "react";
import "./App.css";
import {BrowserRouter as Router, Route} from "react-router-dom";
import HomePage from "./pages/home/home.page";
import ForgotPasswordPage from "./pages/forgot-password-page/forgot-password-page";
import LoginForm from './components/Login/LoginForm';
import { AuthStoreProvider } from "./stores/AuthStore";

class App extends Component {
  render() {
    return (
      <Router>
        <AuthStoreProvider>
          <Route exact path="/" component={LoginForm}/>
          <Route path="/home" component={HomePage}/>
          <Route
            exact
            path="/forgot_password"
            component={ForgotPasswordPage}
          />
        </AuthStoreProvider>
      </Router>
    );
  }
}

export default App;
import React, {Component} from "react";
import "./App.css";
import SignInStore from "./stores/SignInStore";
import ClientsStore from "./stores/ClientsStore";
import {BrowserRouter as Router, Route} from "react-router-dom";
import LoginPage from "./pages/login-page/login-page";
import HomePage from "./pages/home/home.page";
import ClientDetailPage from "./pages/client-detail-page/client-detail-page";
import ForgotPasswordPage from "./pages/forgot-password-page/forgot-password-page";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={LoginPage} store={SignInStore} />
          <Route exact path="/home" component={HomePage} store={SignInStore} />
          <Route
            exact
            path="/profile"
            component={ProfilePage}
            store={UserStore}
          />
          <Route
            path="/clients/:id"
            component={ClientDetailPage}
            store={ClientsStore}
          />
          <Route
            exact
            path="/clients"
            component={ClientsPage}
            store={ClientsStore}
          />
          <Route
            exact
            path="/change_password"
            component={PasswordPage}
            store={ClientsStore}
          />
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
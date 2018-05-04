import React, { Component } from "react";
import "./App.css";
import SignInStore from "./stores/SignInStore";
import ProfileStore from "./stores/ProfileStore";
import ClientsStore from "./stores/ClientsStore";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginPage from "./pages/login-page/login-page";
import HomePage from "./pages/home-page/home-page";
import ProfilePage from "./pages/profile-page/profile-page";
import ClientsPage from "./pages/clients-page/clients-page";
import PasswordPage from "./pages/password-page/password-page";
import ClientDetailPage from "./pages/client-detail-page/client-detail-page";

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
            store={ProfileStore}
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
            path="/password"
            component={PasswordPage}
            store={ClientsStore}
          />
        </div>
      </Router>
    );
  }
}

export default App;

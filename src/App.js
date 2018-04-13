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

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={LoginPage} store={SignInStore} />
          <Route path="/home" component={HomePage} store={SignInStore} />
          <Route path="/profile" component={ProfilePage} store={ProfileStore} />
          <Route path="/clients" component={ClientsPage} store={ClientsStore} />
          </div>
      </Router>
    );
  }
}

export default App;

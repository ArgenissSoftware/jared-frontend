import React, { Component } from "react";
import "./App.css";
import SignInStore from "./stores/SignInStore";
import ProfileStore from "./stores/ProfileStore";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import LoginPage from "./pages/login-page/login-page";
import HomePage from "./pages/home-page/home-page";
import ProfilePage from "./pages/profile-page/profile-page";


class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={LoginPage} store={SignInStore} />

          {/* <Route exact render={() => <LoginPage store={store} />} path="/" /> */}

          <Route path="/home" component={HomePage} store={SignInStore} />
          <Route path="/profile" component={ProfilePage} store={ProfileStore} />
        </div>
      </Router>
    );
  }
}

export default App;

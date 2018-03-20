import React, { Component } from "react";
import "./App.css";
import store from "./DataStore";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import LoginPage from "./pages/login-page/login-page";
import HomePage from "./pages/home-page/home-page";


class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={LoginPage} store={store} />
          <Route path="/home" component={HomePage} store={store} />
        </div>
      </Router>
    );
  }
}

export default App;

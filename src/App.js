import React, {Component} from "react";
import "./App.css";
import SignInStore from "./stores/SignInStore";
import ClientsStore from "./stores/ClientsStore";
import {BrowserRouter as Router, Route} from "react-router-dom";
import LoginPage from "./pages/login-page/login-page";
import HomePage from "./pages/home/home.page";
import ClientDetailPage from "./pages/client-detail-page/client-detail-page";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={LoginPage} store={SignInStore}/>
          <Route path="/home" component={HomePage} store={SignInStore}/>
        </div>
      </Router>
    );
  }
}

export default App;

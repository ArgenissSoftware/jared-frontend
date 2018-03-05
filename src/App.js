import React, { Component } from "react";
import "./App.css";
import { observer } from "mobx-react";
import store from "./DataStore";
import LoginPage from "./pages/login-page/login-page";

@observer
class App extends Component {
  render() {
    return (
      <div>
        <LoginPage store={store} />
      </div>
    );
  }
}

export default App;

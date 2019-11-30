import React from "react";
import "./App.css";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import HomePage from "./pages/home/home.page";
import ForgotPasswordPage from "./pages/forgot-password-page/forgot-password-page";
import LoginForm from './components/Login/LoginForm';
import { AuthStoreProvider } from "./stores/AuthStore";
import { observer } from "mobx-react-lite";
import PrivateRoute from "./utils/PrivateRoute";



const App = observer((props) => {


  return (
    <Router>
      <AuthStoreProvider>
        <Switch>
          <Route exact path="/" component={LoginForm}/>
          <PrivateRoute path="/home">
            <HomePage/>
          </PrivateRoute>
          <Route
            exact
            path="/forgot_password"
            component={ForgotPasswordPage}
          />
        </Switch>
      </AuthStoreProvider>
    </Router>
  );

});

export default App;
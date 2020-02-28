import React, {Component} from "react";
import {Switch, Route} from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import ClientsList from "./components/Clients/ClientsList";
import ChangePassword from "./components/ChangePassword/ChangePassword";
import UsersList from "./components/Users/UsersList";
import ClientEdit from "./components/Clients/ClientEdit";
import UserEdit from "./components/Users/UserEdit";
import WorkedHours from "./components/workedHours/WorkedHours";
import MyClientsList from "./components/Users/MyClientsList";

export default class HomepageRouter extends Component {
  render() {
    return (
      <TransitionGroup>
          <CSSTransition
            key={this.props.location.key}
            classNames="fade"
            timeout={300}
          >
            <Switch location={this.props.location}>

              <Route
                exact
                path='/home'
                render={(props) => <div className="page"><Home {...props}/></div>}
              />

              <Route
                exact
                path='/home/profile'
                render={(props) => <div className="page"><Profile {...props}/></div>}
              />
              <Route
                exact
                path='/home/clients'
                render={(props) => <div className="page"><ClientsList {...props}/></div>}
              />

              <Route
                exact
                path='/home/users'
                render={(props) => <div className="page"><UsersList {...props}/></div>}
              />

              <Route
                path='/home/users/:id'
                render={(props) => <div className="page"><UserEdit {...props}/></div>}
              />

              <Route
                exact
                path='/home/change_password'
                render={(props) => <div className="page"><ChangePassword {...props}/></div>}
              />

              <Route
                exact
              path='/home/workedHours'
              render={(props) => <div className="page"><WorkedHours {...props}/></div>}
                path='/home/myclientslist'
                render={(props) => <div className="page"><MyClientsList {...props}/></div>}
              />

              <Route
                exact
                path='/home/clients/:id'
                render={(props) => <div className="page"><ClientEdit {...props}/></div>}
              />

            </Switch>
          </CSSTransition>
      </TransitionGroup>
    )
  }
}
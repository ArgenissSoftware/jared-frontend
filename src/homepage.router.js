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
                render={(props) => <div className="page container"><Home/></div>}
              />

              <Route
                exact
                path='/home/profile'
                render={(props) => <div className="page container"><Profile {...props}/></div>}
              />
              <Route
                exact
                path='/home/clients'
                render={(props) => <div className="page container"><ClientsList {...props}/></div>}
              />

              <Route
                exact
                path='/home/users'
                render={(props) => <div className="page container"><UsersList {...props}/></div>}
              />

              <Route
                path='/home/users/:id'
                render={(props) => <div className="page container"><UserEdit {...props}/></div>}
              />

              <Route
                exact
                path='/home/change_password'
                render={(props) => <div className="page container"><ChangePassword {...props}/></div>}
              />

              <Route
                exact
                path='/home/clients/:id'
                render={(props) => <div className="page container"><ClientEdit {...props}/></div>}
              />

            </Switch>
          </CSSTransition>
      </TransitionGroup>
    )
  }
}
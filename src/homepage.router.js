import React, {Component} from "react";
import {Switch, Route} from 'react-router-dom'
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import ClientsList from "./components/Clients/ClientsList";
import ChangePassword from "./components/ChangePassword/ChangePassword";
import UsersList from "./components/Users/UsersList";
import ClientEdit from "./components/Clients/ClientEdit";
import UserEdit from "./components/Users/UserEdit";

class HomepageRouter extends Component {
    render() {
        return (
            <Switch>

                <Route exact path='/home' component={Home}/>

                <Route
                    exact
                    path='/home/profile'
                    render={(props) => <Profile {...props}/>}/>

                <Route
                    exact
                    path='/home/clients'
                    render={(props) => <ClientsList {...props}/>}/>

                <Route
                    exact
                    path='/home/users'
                    render={(props) => <UsersList {...props}/>}/>

                <Route
                    path='/home/users/:id'
                    render={(props) => <UserEdit {...props}/>}/>

                <Route
                    exact
                    path='/home/change_password'
                    render={(props) => <ChangePassword {...props}/>}/>

                <Route
                    exact
                    path='/home/clients/:id'
                    render={(props) => <ClientEdit {...props}/>}/>

            </Switch>
        )
    }
}

export default HomepageRouter
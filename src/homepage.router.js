import React, {Component} from "react";
import {Switch, Route} from 'react-router-dom'
import HomeComponent from "./components/Home/home.component";
import ProfileComponent from "./components/Profile/profile.component";
import ClientListComponent from "./components/Clients/clientList.component";
import ChangePasswordComponent from "./components/ChangePassword/changePassword.component";
import UserListComponent from "./components/Users/userList.component";
import ClientDetailComponent from "./components/Clients/clientDetail.component";
import UserProfileComponent from "./components/UserProfile/UserProfile.component";

class HomepageRouter extends Component {
    render() {
        return (
            <Switch>

                <Route exact path='/home' component={HomeComponent}/>

                <Route
                    exact
                    path='/home/profile'
                    render={(props) => <ProfileComponent history={props.history}/>}/>

                <Route
                    exact
                    path='/home/clients'
                    render={(props) => <ClientListComponent history={props.history}/>}/>
                
                <Route
                    exact
                    path='/home/users'
                    render={(props) => <UserListComponent history={props.history}/>}/>

                <Route
                    path='/home/users/new'
                    render={(props) => <UserProfileComponent history={props.history}/>}/>

                <Route
                    path='/home/users/:id'
                    render={(props) => <UserProfileComponent history={props.history}/>}/>

                <Route
                    exact
                    path='/home/change_password'
                    render={(props) => <ChangePasswordComponent history={props.history}/>}/>

                <Route
                    exact
                    path='/home/clients/:id'
                    render={(props) => <ClientDetailComponent history={props.history}/>}/>

            </Switch>
        )
    }
}

export default HomepageRouter
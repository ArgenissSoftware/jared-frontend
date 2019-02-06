import React, {Component} from "react";
import {Switch, Route} from 'react-router-dom'
import HomeComponent from "./components/Home/home.component";
import ProfileComponent from "./components/Profile/profile.component";
import ClientListComponent from "./components/Clients/clientList.component";
import ChangePasswordComponent from "./components/ChangePassword/changePassword.component";
import UserListComponent from "./components/Users/userList.component";
import ClientDetailComponent from "./components/Clients/clientDetail.component";
import UserProfileComponent from "./components/UserProfile/UserProfile.component";
import {AdminAuth} from "./RolesAuth";

class HomepageRouter extends Component {
    render() {
        return (
            <Switch>

                <Route exact path='/home' component={HomeComponent}/>

                <Route
                    exact
                    path='/home/profile'
                    render={(props) => <ProfileComponent {...props}/>}/>

                <Route
                    exact
                    path='/home/clients'
                    render={(props) => <ClientListComponent {...props}/>}/>

                <Route
                    exact
                    path='/home/users'
                    component ={AdminAuth(UserListComponent)}/>

                <Route
                    path='/home/users/:id'
                    component= {AdminAuth(UserProfileComponent)} />

                <Route
                    exact
                    path='/home/change_password'
                    render={(props) => <ChangePasswordComponent {...props}/>}/>

                <Route
                    exact
                    path='/home/clients/:id'
                    component= { AdminAuth(ClientDetailComponent)} />

            </Switch>
        )
    }
}

export default HomepageRouter
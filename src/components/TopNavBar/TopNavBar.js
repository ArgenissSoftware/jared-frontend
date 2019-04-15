import React, { Component } from "react";
import { observer } from "mobx-react";
import { Redirect } from "react-router-dom";
import logo from "../../images/logo1.png";
import {
  Dropdown,
  Menu,
  Icon,
  Image
} from "semantic-ui-react";
import "./TopNavBar.css";
import authStore from "../../stores/AuthStore";
import LogoToolbar from '../Common/LogoToolbar';
import { hasRoleShow } from "../Common/Auth";

const RoleDropdownItem = hasRoleShow(Dropdown.Item);
const RoleDropdown = hasRoleShow(Dropdown);

const TopNavBar = observer(class TopNavBar extends Component {

  /**
   * Nav
   */
  handleItemClick = (e, {name}) => this.props.history.push(name);
  /**
   * Logout and nav to /
   */
  logout = (e, {name}) => {
    authStore.clearAuth();
    this.props.history.push(name);
  }

  render() {
    if (!authStore.isLoggedIn()){
      return <Redirect to={{ pathname: "/" }} push={false} />;
    }
    const trigger = (
      <span>
        <Image avatar src={authStore.getAvatar('d=mp')} /> {authStore.user.name} {authStore.user.surname}
      </span>
    )
    return (
      <LogoToolbar logo={logo} history={this.props.history}>
        <Dropdown item text="User">
          <Dropdown.Menu>
            <Dropdown.Item name="/home/users" onClick={this.handleItemClick} >
              <Icon name='list'/>
              User List
            </Dropdown.Item>
            <RoleDropdownItem name="/home/users/new" onClick={this.handleItemClick} auth="Admin">
              <Icon name='plus'/>
              New user
            </RoleDropdownItem>
          </Dropdown.Menu>
        </Dropdown>

        <RoleDropdown item text="Client" auth="Admin">
          <Dropdown.Menu>
            <Dropdown.Item name="/home/clients" onClick={this.handleItemClick}>
              <Icon name='list'/>
              Client List
            </Dropdown.Item>

          </Dropdown.Menu>
        </RoleDropdown>

        <Menu.Menu position="right">
          <Dropdown item trigger={trigger}>
            <Dropdown.Menu>
              <Dropdown.Item name="/home/profile" onClick={this.handleItemClick}>
                <Icon name='user'/>
                My Profile
              </Dropdown.Item>
              <Dropdown.Item name="/home/change_password" onClick={this.handleItemClick}>
                <Icon name='lock'/>
                Change Password
              </Dropdown.Item>
              <Dropdown.Item name="/" onClick={this.logout}>
                <Icon name='sign out'/>
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </LogoToolbar>
    );
  }
});

export default TopNavBar;

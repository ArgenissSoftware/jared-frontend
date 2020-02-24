import React from "react";
import { observer } from "mobx-react-lite";
import { Redirect } from "react-router-dom";
import logo from "../../images/logo1.png";
import {
  Dropdown,
  Menu,
  Icon,
  Image
} from "semantic-ui-react";
import "./TopNavBar.css";
import LogoToolbar from '../Common/LogoToolbar';
import { hasRoleShow } from "../Common/Auth";
import { useAuthStore } from "../../stores/AuthStore";

const RoleDropdownItem = hasRoleShow(Dropdown.Item);
const RoleDropdown = hasRoleShow(Dropdown);
const RoleMenuItem = hasRoleShow(Menu.Item);

/**
 * Top Nav Bar Component
 */
export default observer((props) => {

  const authStore = useAuthStore();

  const handleItemClick = (e, {name}) => props.history.push(name);

  const logout = (e) => {
    authStore.clearAuth();
  }

  // if you are not logged in redirect back to login
  if (!authStore.isLoggedIn){
    return <Redirect to={{ pathname: "/" }} push={false} />;
  }

  const trigger = (
    <span>
      <Image avatar src={authStore.getAvatar('d=mp')} /> {authStore.user.name} {authStore.user.surname}
    </span>
  )
  return (
    <LogoToolbar logo={logo} history={props.history}>
      <RoleMenuItem name="/home/myclientslist" onClick={handleItemClick} auth="Developer">My clients</RoleMenuItem>
      <RoleDropdown item text="User" auth="Admin">
        <Dropdown.Menu>
          <Dropdown.Item name="/home/users" onClick={handleItemClick} >
            <Icon name='list'/>
            User List
          </Dropdown.Item>
          <RoleDropdownItem name="/home/users/new" onClick={handleItemClick} auth="Admin">
            <Icon name='plus'/>
            New user
          </RoleDropdownItem>
        </Dropdown.Menu>
      </RoleDropdown>

      <RoleDropdown item text="Client" auth="Admin">
        <Dropdown.Menu>
          <Dropdown.Item name="/home/clients" onClick={handleItemClick}>
            <Icon name='list'/>
            Client List
          </Dropdown.Item>

        </Dropdown.Menu>
      </RoleDropdown>

      <Menu.Menu position="right">
        <Dropdown item trigger={trigger}>
          <Dropdown.Menu>
            <Dropdown.Item name="/home/profile" onClick={handleItemClick}>
              <Icon name='user'/>
              My Profile
            </Dropdown.Item>
            <Dropdown.Item name="/home/change_password" onClick={handleItemClick}>
              <Icon name='lock'/>
              Change Password
            </Dropdown.Item>
            <Dropdown.Item name="/" onClick={logout}>
              <Icon name='sign out'/>
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    </LogoToolbar>
  );
});

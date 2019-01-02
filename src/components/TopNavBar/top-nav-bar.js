import React, {Component} from "react";
import {observer} from "mobx-react";
import { Redirect } from "react-router-dom";
import logo from "../../images/logo1.png";
import {Dropdown, Menu, Icon} from "semantic-ui-react";
import "./top-nav-bar.css";
import authStore from "../../stores/AuthStore";

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
    return (
      <Menu size="huge">
        <Menu.Item name="/home" onClick={this.handleItemClick}>
          <img src={logo} alt=""/>
          <b>Jared</b>
        </Menu.Item>

        <Dropdown item text="User">
          <Dropdown.Menu>
            <Dropdown.Item name="../home/users" onClick={this.handleItemClick}>
              <Icon name='list'/>
              User List
            </Dropdown.Item>

          </Dropdown.Menu>
        </Dropdown>

        <Dropdown item text="Client">
          <Dropdown.Menu>
            <Dropdown.Item name="../home/clients" onClick={this.handleItemClick}>
              <Icon name='list'/>
              Client List
            </Dropdown.Item>

          </Dropdown.Menu>
        </Dropdown>

        <Menu.Menu position="right">
          <Dropdown item text={"Welcome " + authStore.user.username}>
            <Dropdown.Menu>
              <Dropdown.Item name="../home/profile" onClick={this.handleItemClick}>
                <Icon name='user'/>
                My Profile
              </Dropdown.Item>
              <Dropdown.Item name="../home/change_password" onClick={this.handleItemClick}>
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
      </Menu>
    );
  }
});

export default TopNavBar;

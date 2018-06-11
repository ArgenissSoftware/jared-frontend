import React, { Component } from "react";
import { observer } from "mobx-react";
import logo from "../../images/logo1.png";
import profileStore from "../../stores/ProfileStore";
import { Dropdown, Menu, Icon } from "semantic-ui-react";
import "./top-nav-bar.css";

const TopNavBar = observer(
  class TopNavBar extends Component {
    handleItemClick = (e, { name }) => this.props.history.push(name);

    render() {
      return (
        <Menu size="huge">
          <Menu.Item name="../home" onClick={this.handleItemClick}>
            <img src={logo} alt="" />
            <b>Jared</b>
          </Menu.Item>
          <Menu.Menu position="right">
            <Dropdown item text={"Welcome " + profileStore.username}>
              <Dropdown.Menu>
                <Dropdown.Item name="../profile" onClick={this.handleItemClick}>
                <Icon name='user' />
                  My Profile
                </Dropdown.Item>
                <Dropdown.Item name="change_password" onClick={this.handleItemClick}>
                <Icon name='lock' />
                  Change Password
                </Dropdown.Item>
                <Dropdown.Item name="/" onClick={this.handleItemClick}>
                <Icon name='sign out' />
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        </Menu>
      );
    }
  }
);

export default TopNavBar;

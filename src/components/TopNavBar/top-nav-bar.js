import React, {Component} from "react";
import {observer} from "mobx-react";
import logo from "../../images/logo1.png";
import UserStore from "../../stores/UserStore";
import {Dropdown, Menu, Icon} from "semantic-ui-react";
import "./top-nav-bar.css";

const TopNavBar = observer(class TopNavBar extends Component {
  handleItemClick = (e, {name}) => this
    .props
    .history
    .push(name);

  render() {
    return (
      <Menu >
        <Menu.Item name="../home" onClick={this.handleItemClick}>
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
          <Dropdown item text={"Welcome " + UserStore.user.username}>
            <Dropdown.Menu>
              <Dropdown.Item name="../home/profile" onClick={this.handleItemClick}>
                <Icon name='user'/>
                My Profile
              </Dropdown.Item>
              <Dropdown.Item name="../home/change_password" onClick={this.handleItemClick}>
                <Icon name='lock'/>
                Change Password
              </Dropdown.Item>
              <Dropdown.Item name="/" onClick={this.handleItemClick}>
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

import React, { PureComponent } from "react";
import RecordsDropdown from "./RecordsDropdown";
import usersService from "../../services/users.service";

/**
 * User Search Dropdown
 */
export class UsersDropdown extends PureComponent {
  render() {
    return (
      <RecordsDropdown
        dataSource={usersService}
        displayProperty="username"
        placeholder={this.props.placeholder}
        onChange={this.props.onChange}
      />
    );
  }
}

export default UsersDropdown;

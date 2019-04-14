import React, { PureComponent } from "react";
import RecordsDropdown from "./RecordsDropdown";
import clientsService from "../../services/clients.service";

export class ClientsDropdown extends PureComponent {
  render() {
    return (
      <RecordsDropdown
        dataSource={clientsService}
        displayProperty="name"
        placeholder={this.props.placeholder}
        onChange={this.props.onChange}
      />
    );
  }
}

export default ClientsDropdown;

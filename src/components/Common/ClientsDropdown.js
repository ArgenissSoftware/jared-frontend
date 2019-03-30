import React, { PureComponent } from "react";
import {
  Form
} from "semantic-ui-react";

import clientsService from "../../services/clients.service";

/**
 * Client Dropdown
 */
class ClientsDropdown extends PureComponent {

  /**
   * state
   */
  state = {options: []}

  /**
   * On search change
   * @param {Object} e
   * @param {Object} value
   */
  onSearchChange = async (e, value) => {
    try {
      const results = await clientsService.getList(1, 15, value.searchQuery);
      if (results && results.data && results.data.data.list) {
        this.setState({
          options: results.data.data.list
        });
      }
    } catch (err) {
      console.log(err)
    }
  }

  /**
   * On option selected
   * @param {Object} e
   * @param {Object} data
   */
  onChange = (e, data) => {
    const client = this.state.options.find(c => c._id === data.value);
    this.props.onChange && this.props.onChange(client);
  }

  /**
   * Render
   */
  render() {
    const options = this.state.options.map(({ _id, name }) => {
      return { value: _id, text: name };
    });

    return (
      <Form.Dropdown
        onSearchChange={this.onSearchChange}
        search
        selection
        options={options}
        onChange={this.onChange}
      />
    )
  }
};

export default ClientsDropdown;

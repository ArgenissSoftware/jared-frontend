import React, { PureComponent } from "react";
import { Form } from "semantic-ui-react";

class RecordsDropdown extends PureComponent {
  state = {options: []}

  onSearchChange = async (e, value) => {
    try {
      const results = await this.props.dataSource.getList(1, 15, value.searchQuery);
      if (results && results.data && results.data.data.list) {
        this.setState({
          options: results.data.data.list
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  onChange = (e, data) => {
    const record = this.state.options.find(r => r._id === data.value);
    this.props.onChange && this.props.onChange(record);
  }

  render() {
    const options = this.state.options.map(record => {
      return {
        value: record._id,
        text: record[this.props.displayProperty]
      };
    });

    return (
      <Form.Dropdown
        placeholder={this.props.placeholder}
        onSearchChange={this.onSearchChange}
        search
        selection
        clearable
        options={options}
        onChange={this.onChange}
      />
    );
  }
};

export default RecordsDropdown;

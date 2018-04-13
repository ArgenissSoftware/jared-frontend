import React, { Component } from "react";
import { observer } from "mobx-react";
import "./clients-tab.css";
import {List, Dropdown } from "semantic-ui-react";
import ClientsStore from "../../stores/ClientsStore";

const ClientsTab = observer(
  class ClientsTab extends Component {
    constructor(props) {
      super(props);
      ClientsStore.getUserData();
    }

    handleChange = (e, { value }) => console.log(value);

    getRenderedClientsList(clientName) {
      return (
        <List.Item key={clientName}>
          <List.Icon name="user" size="large" verticalAlign="middle" />
          <List.Content>
            <List.Header as="a">{clientName}</List.Header>
            <List.Description as="a">Project Description</List.Description>
          </List.Content>
        </List.Item>
      );
    }

    render() {
      const options = ClientsStore.clients.map(({ id, name }) => ({
        value: id,
        text: name
      }));

      return (
        <div className="ui container">
          <Dropdown
            placeholder="Add a new client"
            selection
            search
            options={options}
            onChange={this.handleChange}
          />

          <div className="ui container aligned">
            <List divided relaxed>
              {ClientsStore.clients.map(client =>
                this.getRenderedClientsList(client.name)
              )}
            </List>
          </div>
        </div>
      );
    }
  }
);

export default ClientsTab;

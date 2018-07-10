import React, { Component } from "react";
import { observer } from "mobx-react";
import "./clients-tab.css";
import { List, Dropdown, Button } from "semantic-ui-react";
import ClientsStore from "../../stores/ClientsStore";
import axios from "axios";
import UserStore from "../../stores/UserStore";
import AppStore from "../../stores/AppStore";

let selectedClientID;

const ClientsTab = observer(
  class ClientsTab extends Component {
    constructor(props) {
      super(props);
      ClientsStore.getClientsList();
    }

    save(e, { value }) {
      UserStore.clients.push(value);
    }

    async GoToDetail(id) {
      await ClientsStore.getClient(id);

      this.props.history.push("clients/" + id);
    }

    getRenderedClientsList(clientName, clientID) {
      return (
        <List.Item key={clientName}>
          <List.Icon name="user" size="large" verticalAlign="middle" />
          <List.Content onClick={() => this.GoToDetail(clientID)}>
            <List.Header as="a">{clientName}</List.Header>
            <List.Description as="a">Project Description</List.Description>
          </List.Content>
        </List.Item>
      );
    }

    addClient() {}

    render() {
      const options = ClientsStore.clients.map(({ _id, name }) => ({
        value: _id,
        text: name
      }));

      return (
        <div className="ui container">
          <Dropdown
            placeholder="Add a new client"
            selection
            search
            options={options}
            onChange={this.save}
          />

          <Button onClick={() => this.addClient()}>ADD</Button>

          <div className="ui container aligned">
            <List divided relaxed>
              {ClientsStore.clients.map(client =>
                this.getRenderedClientsList(client.name, client._id)
              )}
            </List>
          </div>
        </div>
      );
    }
  }
);

export default ClientsTab;

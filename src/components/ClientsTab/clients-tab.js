import React, { Component } from "react";
import { observer } from "mobx-react";
import "./clients-tab.css";
import { List, Dropdown, Button } from "semantic-ui-react";
import ClientsStore from "../../stores/ClientsStore";
import axios from "axios";
import profileStore from "../../stores/ProfileStore";
import AppStore from "../../stores/AppStore";

let selectedClientID;

const ClientsTab = observer(
  class ClientsTab extends Component {
    constructor(props) {
      super(props);
      ClientsStore.getClientsData();
    }

    async save(e, { value }) {
      profileStore.clients.push(value);

      console.log(profileStore.clients);

      /*await axios
        .put(AppStore.URL + "/api/user/", {
          id: profileStore.id,
          //  clients: profileStore.clients
          clients: [
            {
              employees: [],
              _id: "5acfa901da19220021b5714d",
              name: "Jared",
              active: true,
              __v: 0
            }
          ]
        })
        .then()
        .catch(function(error) {
          console.log(error);
        });*/
    }

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

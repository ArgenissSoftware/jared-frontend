import React, { Component } from "react";
import { observer } from "mobx-react";
import { Button, Input, List, Header, Divider } from "semantic-ui-react";
import ClientsStore from "../../stores/ClientsStore";

const ClientListComponent = observer(
  class ClientListComponent extends Component {
    constructor(props) {
      super(props);
      ClientsStore.getClientsList();
      this.addClient = this.addClient.bind(this);
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

    addClient() {
      ClientsStore.addClient();
    }

    handleMessage(e) {
      ClientsStore.newClientsInput = e.target.value;
    }

    render() {
      return (
        <div className="ui container aligned">
          <Header as="h3" icon="user" content="CLIENTS LIST" />
          <Divider />
          <Input
            onChange={this.handleMessage.bind(this)}
            action={<Button onClick={() => this.addClient()}>ADD</Button>}
            placeholder="Add a new client..."
            value={ClientsStore.newClientsInput}
          />
          <List divided relaxed>
            {ClientsStore.clients.map(client =>
              this.getRenderedClientsList(client.name)
            )}
          </List>
        </div>

      );
    }
  }
);

export default ClientListComponent;

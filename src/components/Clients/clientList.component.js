import React, { Component } from "react";
import { observer } from "mobx-react";
import { 
  Button, 
  List, 
  Header, 
  Divider 
} from "semantic-ui-react";
import clientsStore from "../../stores/ClientsStore";

const ClientListComponent = observer(
  class ClientListComponent extends Component {
    constructor(props) {
      super(props);
      clientsStore.getClientsList();
      this.addClient = this.addClient.bind(this);
    }

    getRenderedClientsList(client) {
      return (
        <List.Item key={client.id}>
          <List.Icon name="user" size="large" verticalAlign="middle" />
          <List.Content onClick={() => this.goToDetail(client._id)}>
            <List.Header as="a">{client.name}</List.Header>
            <List.Description as="a">Project Description</List.Description>
          </List.Content>
        </List.Item>
      );
    }

    addClient() {
      this.props.history.push('/home/clients/new');
    }

    goToDetail(id) {
      this.props.history.push("clients/" + id);
    }

    render() {
      return (
        <div className="ui container aligned">
          <Header as="h3" icon="user" content="CLIENTS LIST" />
          <Divider />
          <Button onClick={() => this.addClient()}>NEW CLIENT</Button>
          <List divided relaxed>
            {clientsStore.clients.map(client =>
              this.getRenderedClientsList(client)
            )}
          </List>
        </div>
      );
    }
  }
);

export default ClientListComponent;

import React, { Component } from "react";
import { observer } from "mobx-react";
import { 
  Button, 
  List, 
  Header, 
  Divider 
} from "semantic-ui-react";
import clientsStore from "../../stores/ClientsStore";
import ClientCard from "../ClientCard/clientCard.component"

const ClientListComponent = observer(
  class ClientListComponent extends Component {
    constructor(props) {
      super(props);
      clientsStore.getClientsList();
      this.addClient = this.addClient.bind(this);
    }

    addClient() {
      this.props.history.push('/home/clients/new');
    }

    render() {
      return (
        <div className="ui container aligned">
          <Header as="h3" icon="user" content="CLIENTS LIST" />
          <Divider />
          <Button onClick={() => this.addClient()}>NEW CLIENT</Button>
          <List divided relaxed>
            {clientsStore.clients.map(client =>
              <ClientCard key={client._id.toString()} 
                          name = {client.name}
                          _id = {client._id}
                          history = {this.props.history}/>
            )}
          </List>
        </div>
      );
    }
  }
);

export default ClientListComponent;

import React, { Component } from "react";
import { observer } from "mobx-react";
import { 
  Button, 
  List, 
  Header, 
  Divider,
  Pagination,
  Container,
  Grid
} from "semantic-ui-react";
import clientsStore from "../../stores/ClientsStore";
import _ from 'lodash';

const ClientListComponent = observer(
  class ClientListComponent extends Component {
    constructor(props) {
      super(props);
      clientsStore.getClientsList(1);
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

    handlePageChange(e, data) {
      clientsStore.getClientsList(_.ceil(data.activePage));
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
          <Container>
            <Grid>
              <Grid.Row centered>
               <Pagination
                  defaultActivePage={1}
                  firstItem={null}
                  lastItem={null}
                  pointing
                  secondary
                  totalPages={clientsStore.clientCount / clientsStore.pageSize}
                  onPageChange={this.handlePageChange}
                />
              </Grid.Row>
            </Grid>
          </Container>
        </div>
      );
    }
  }
);

export default ClientListComponent;

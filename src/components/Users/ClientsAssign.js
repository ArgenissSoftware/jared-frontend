import React, { Component } from "react";
import { observer } from "mobx-react";
import {
  List,
  Button,
  Grid,
  Segment,
  Container,
  Divider,
  Form
} from "semantic-ui-react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import clientsStore from "../../stores/ClientsStore";
import userStore from "../../stores/UserStore";
import _ from 'lodash';
import ClientsDropdown from "../Common/ClientsDropdown";

const ClientsAssign = observer(
  class ClientsAssign extends Component {
    constructor(props) {
      super(props);
      this.state = {
        options: [],
        selected: null,
        errorObj: null
      };
      this.setOptions();
    }

    async setOptions() {
      await clientsStore.getClientsList(1, 0);
      const clients = clientsStore.clients.map(({ _id, name }) => {
        return { value: _id, text: name };
      });
      this.setState({ options: clients });
    }

    async GoToDetail(id) {
      await clientsStore.getClient(id);

      this.props.history.push("clients/" + id);
    }

    getRenderedClientsList(clientName, clientId) {
      return (
        <List.Item key={clientName}>
        <List.Content floated='right' >
          <Button  circular icon='delete' onClick={() => this.deleteClient(clientId)}></Button>
        </List.Content>
        <List.Icon name="user" size="large"/>
        <List.Content onClick={() => this.GoToDetail(clientId)}>
          <List.Header as="a">{clientName}</List.Header>
          <List.Description as="a">Project Description</List.Description>
        </List.Content>
        </List.Item>
      );
    }

    handleChange = (client) => {
      this.setState({ selected: client });
    }

    async addClient() {
      if(this.state.selected) {
        if( _.find(userStore.user.clients, (client) => {
          return client._id === this.state.selected._id;
          })) {
            this.setState({ errorObj: "The developer is already working with this client" });
        } else {
          await userStore.addRelation(this.state.selected);
        }
      }
    }

    async deleteClient(clientId) {
      const client = _.find(clientsStore.clients, (client) => {
        return client._id === clientId;
      });
      await userStore.removeRelation(client);
    }

    render() {
      return (
        <div className="ui container">
        { this.state.errorObj ? (
          <ErrorMessage message = { this.state.errorObj } />
          ) : null}
          <Container>
            <Form>
              <Form.Group widths='equal'>
                <ClientsDropdown
                  onChange={this.handleChange}
                  placeholder="Add a new client"/>
                <Button onClick={() => this.addClient()}>ADD</Button>
                </Form.Group>
                <Grid>
                  <Grid.Row centered>
                  <Divider />
                    <Form.Group widths='equal'>
                      { userStore.user.clients ? (
                        <List divided relaxed verticalAlign='middle'>
                          { userStore.user.clients.map(client =>
                            this.getRenderedClientsList(client.name, client._id)
                          ) }
                        </List>
                        ) : null
                      }
                    </Form.Group>
                  </Grid.Row>
                </Grid>
              </Form>
            </Container>
          </div>
      );
    }
  }
);

export default ClientsAssign;

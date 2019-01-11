import React, { Component } from "react";
import { observer } from "mobx-react";
import "./clients-tab.css";
import { 
  List, 
  Dropdown, 
  Button,
  Grid,
  Segment,
  Container,
  Divider
} from "semantic-ui-react";
import ErrorMessage from "../ErrorMessage/error-message";
import clientsStore from "../../stores/ClientsStore";
import userStore from "../../stores/UserStore";
import _ from 'lodash';


const ClientsTab = observer(
  class ClientsTab extends Component {    
    constructor(props) {
      super(props);
      this.state = {  options: [], 
                      selected: {},
                      errorObj: null
                    };
      this.setOptions();
    }

    async setOptions() {
      await clientsStore.getClientsList();
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
          <Button color='red' onClick={() => this.deleteClient(clientId)}>Delete</Button>
        </List.Content>
        <List.Icon name="user" size="large"/>
        <List.Content onClick={() => this.GoToDetail(clientId)}>
          <List.Header as="a">{clientName}</List.Header>
          <List.Description as="a">Project Description</List.Description>
        </List.Content>
        </List.Item>
      );
    }

    handleChange = (e, data) => {
      this.setState({ selected: data.value });
    }

    async addClient() {
      if( _.find(userStore.user.clients, (client) => {
        return client._id === this.state.selected;
        })) {
          this.setState({ errorObj: "The developer is already working with this client" });
      } else {
        const client = _.find(clientsStore.clients, (client) => {
          return client._id === this.state.selected;
        });      
        await userStore.addRelation(client);
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
          <Segment>
            <Grid>
              <Grid.Row centered>
                <Dropdown
                  placeholder="Add a new client"
                  selection
                  search
                  value={this.state.selected}
                  options={this.state.options}
                  onChange={this.handleChange}
                />
               <Button onClick={() => this.addClient()}>ADD</Button>
              </Grid.Row>
            </Grid>

            <Divider />
            <div className="ui container aligned">
              { userStore.user.clients ? (
                <List divided relaxed verticalAlign='middle'>
                  {userStore.user.clients.map(client =>
                    this.getRenderedClientsList(client.name, client._id)
                  )}
                </List> 
                ) : null
              }
              
            </div>
            </Segment>
        </Container>

        </div>
      );
    }
  }
);

export default ClientsTab;

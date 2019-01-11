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
import clientsStore from "../../stores/ClientsStore";
import userStore from "../../stores/UserStore";
import _ from 'lodash';


const ClientsTab = observer(
  class ClientsTab extends Component {    
    constructor(props) {
      super(props);
      this.state = { options: [] };
      this.setOptions();
    }

    async setOptions() {
      await clientsStore.getClientsList();
      const diff = _.difference(clientsStore.clients, userStore.user.clients)
        .map(({ _id, name }) => {
          return { value: _id, text: name };
        });
        console.log("Diferencia: "+diff);
        console.log(userStore.user._id);
        
      this.setState({ options: diff });
    }

    handleChange(e, { value }) {      
      userStore.clients.push(value);
    }

    async GoToDetail(id) {
      await clientsStore.getClient(id);

      this.props.history.push("clients/" + id);
    }

    getRenderedClientsList(clientName, clientID) {
      return (
        <List.Item key={clientName}>
        <List.Content floated='right' >
          <Button color='red' onClick={() => this.deleteClient(clientID)}>Delete</Button>
        </List.Content>
        <List.Icon name="user" size="large"/>
        <List.Content onClick={() => this.GoToDetail(clientID)}>
          <List.Header as="a">{clientName}</List.Header>
          <List.Description as="a">Project Description</List.Description>
        </List.Content>
        </List.Item>
      );
    }

    async addClient() { 
      console.log(userStore.clients[userStore.clients.length-1]);
      
      await userStore.addRelation(userStore.clients[userStore.clients.length-1]);
    }

    async deleteClient(clientId) {
      await userStore.removeRelation(clientId);
    }

    

    render() {
      return (
        <div className="ui container">
        <Container>
          <Segment>
            <Grid>
              <Grid.Row centered>
                <Dropdown
                  placeholder="Add a new client"
                  selection
                  search
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

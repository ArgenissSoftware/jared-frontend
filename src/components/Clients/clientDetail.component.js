import React, { Component } from "react";
import { observer } from "mobx-react";
import {
  Button,
  Form,
  Grid,
  Segment,
  Container,
  Divider,
  Header,
  List
} from "semantic-ui-react";
import clientsStore from "../../stores/ClientsStore";
import ErrorMessage from "../ErrorMessage/error-message";
import userStore from "../../stores/UserStore";
import _ from 'lodash';

const ClientDetailComponent = observer(
  class ClientDetailComponent extends Component {
    state = { errorObj: null,
              options: [],
              selected: {}
            };
    constructor(props) {
      super(props);
      this.setTitle();
      this.setOptions();
      clientsStore.clearClient();
    }

    async setOptions() {
      await userStore.getUsersList();
      const users = userStore.userList.map(({ _id, name }) => {
        return { value: _id, text: name };
      });
      this.setState({ options: users });
    }

    handleChange = (e, data) => {
      if(data.type === 'dropdown') {
        this.setState({ selected: data.value });
      } else {
        
        if(e.target.value.trim() !== ''){
          e.target.name !== 'address' ? 
              clientsStore.client[e.target.name] = e.target.value.trim():
              clientsStore.client[e.target.name] = e.target.value;
        }else{
          if(clientsStore.client[e.target.name] !== undefined){
            delete clientsStore.client[e.target.name]
          }
        }
      }
    }

    toggle = () => clientsStore.client.active = !clientsStore.client.active;

    async setTitle() {
      const id = this.props.match.params.id;
      if (id  === 'new') {
        this.title = "NEW CLIENT";
      } else {
        this.title = "CLIENT DETAILS";
        // TODO: add loading state
        await clientsStore.getClient(id);
      }
    }

    save = async (path) => {
      if (this.props.match.params.id === 'new') {
        clientsStore.addClient().then(() => {
          this.setState({ errorObj: "" });
          this.props.history.push(path);
        }).catch((error) => {
          this.setState({ errorObj: error.response.data });
        });
      } else {
        clientsStore.update().then(() => {
          this.setState({ errorObj: ""});
          this.props.history.push(path);
        }).catch((error) => {
          this.setState({ errorObj: error.response.data });
        });
      }
    }

    addDeveloper = async () => {
      if( _.find(clientsStore.client.employees, (client) => {
        return client._id === this.state.selected;
        })) {
          this.setState({ errorObj: "The client is already working with this developer" });
      } else {
        const client = _.find(userStore.userList, (user) => {
          return user._id === this.state.selected;
        });      
        await clientsStore.addRelation(client);
      }
    }

    async deleteDeveloper(userId) {
      const user = _.find(userStore.userList, (user) => {
        return user._id === userId;
      }); 
      await clientsStore.removeRelation(user);
    }

    getRenderedUsersList(userName, userId) {
      return (
        <List.Item key={userName}>
        <List.Content floated='right' >
          <Button circular icon='delete' onClick={() => this.deleteDeveloper(userId)}></Button>
        </List.Content>
        <List.Icon name="user" size="large"/>
        <List.Content>
          <List.Header as="a">{userName}</List.Header>
          <List.Description as="a">Project Description</List.Description>
        </List.Content>
        </List.Item>
      );
    }

    render() {
      return (
        <div className="ui container aligned">
          <Header as="h3" icon="user" content={this.title} />
          <Divider />
          { this.state.errorObj ? (
                <ErrorMessage message = { this.state.errorObj } />
              ) : null}
          <Container>
            <Grid>
              <Grid.Row centered>
                <Segment compact>
                  <Form>
                    <Form.Group>
                      <Form.Input
                        name="name"
                        label="Name"
                        placeholder="Name"
                        value={clientsStore.client.name}
                        defaultValue={clientsStore.client.name}
                        onChange={this.handleChange}
                      />
                      <Form.Input
                        name="contactName"
                        label="Contact Name"
                        placeholder="Contact Name"
                        value={clientsStore.client.contactName}
                        defaultValue={clientsStore.client.contactName}
                        onChange={this.handleChange}
                      />
                      </Form.Group>
                      <Form.Group>
                      <Form.Input
                        name="email"
                        label="Email"
                        placeholder="Email"
                        value={clientsStore.client.email}
                        defaultValue={clientsStore.client.email}
                        onChange={this.handleChange}
                      />
                      <Form.Input
                        name="address"
                        label="Address"
                        placeholder="Address"
                        value={clientsStore.client.address}
                        defaultValue={clientsStore.client.address}
                        onChange={this.handleChange}
                      />
                      </Form.Group>
                      <Form.Group>
                      <Form.Input
                        name="url"
                        label="URL"
                        placeholder="URL"
                        value={clientsStore.client.url}
                        defaultValue={clientsStore.client.url}
                        onChange={this.handleChange}
                      />
                      </Form.Group>
                      <Form.Group>
                      <Form.Checkbox
                        name="active"
                        label="Active"
                        checked = {clientsStore.client.active}
                        defaultValue={clientsStore.client.active}
                        onChange={this.toggle}
                      />
                      </Form.Group>
                      <Form.Group>
                      <Form.Dropdown
                        type='dropdown'
                        placeholder="Add a new Developer"
                        selection
                        search
                        value={this.state.selected}
                        options={this.state.options}
                        onChange={this.handleChange}
                      />
                      <Button onClick={() => this.addDeveloper()}>ADD</Button>
                      </Form.Group>
                      <Divider/>
                        <Grid>
                          <Grid.Row centered>
                            <Form.Group >
                              { clientsStore.client.employees ? (
                                <List divided verticalAlign='middle'>
                                {clientsStore.client.employees.map(user =>
                                  this.getRenderedUsersList(user.name, user._id)
                                )}
                                </List> 
                              ) : null
                              }
                            </Form.Group>
                          </Grid.Row>
                        </Grid>
                      </Form>
                    </Segment>
                  </Grid.Row>
                </Grid>
              <div className="ui container center aligned">
              <Button onClick={() => this.save('/home/clients')}>Save</Button>
            </div>
          </Container>
        </div>
      );
    }
  }
);

export default ClientDetailComponent;

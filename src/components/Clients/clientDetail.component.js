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
  Dropdown
} from "semantic-ui-react";
import clientsStore from "../../stores/ClientsStore";
import ErrorMessage from "../ErrorMessage/error-message";
import userStore from "../../stores/UserStore";
import _ from 'lodash';

const ClientDetailComponent = observer(
  class ClientDetailComponent extends Component {
    state = { errorObj: null, users: [] };
    constructor(props) {
      super(props);
      this.setTitle();
      this.setUsersList();
      clientsStore.clearClient();
    }

    setUsersList= async () => {
      await userStore.getUsersList()
      .then(() => {
        let usersList = [];
        userStore.userList.forEach(user => {
          usersList.push({ key: user.name, value: user._id, text: user.name });
        });
        this.setState({ users: usersList });
      })
      .catch((error) => {
        console.log(error);
      })
    }

    handleChange = (e, data) => {
      if(data.type === 'dropdown') {
          this.checkChange(data);
      } else {
        clientsStore.client[e.target.name] = e.target.value;
      }
    }

    async checkChange(data) {
      if(clientsStore.client.employees.length > data.value.length) {        
        const diff = _.difference(clientsStore.client.employees, data.value);
        await clientsStore.removeRelation(diff[0]);
      } else {
        await clientsStore.addRelation(data.value[data.value.length-1]);
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
                        <Dropdown
                          type="dropdown"
                          name="employees"
                          label="Developers"
                          placeholder='Developers'
                          value={clientsStore.client.employees && clientsStore.client.employees.slice()}
                          onChange={this.handleChange}
                          fluid multiple search selection
                          options={this.state.users}
                        />
                      </Form.Group>
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

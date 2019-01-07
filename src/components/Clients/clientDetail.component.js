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
import ClientsStore from "../../stores/ClientsStore";
import ErrorMessage from "../ErrorMessage/error-message";
import userStore from "../../stores/UserStore";

const ClientDetailComponent = observer(
  class ClientDetailComponent extends Component {
    constructor(props) {
      super(props);
      this.state= { errorText: "", users: [] };
      this.setUsersList();
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
      .catch((error) =>{
        console.log(error);
      })
    }

    handleChange(e, event) {
      if(event.type === 'dropdown'){
          ClientsStore.client[event.name] = event.value;
        console.log(ClientsStore.client[event.name]);
      }else{
      ClientsStore.client[e.target.name] = e.target.value;
      console.log(ClientsStore.client[e.target.name]);      
      }
    }

    toggle = () => ClientsStore.client.active = !ClientsStore.client.active;


    save = async (path) => {
      ClientsStore.update().then(() => {
        this.setState({ errorText: ""});
        this.props.history.push(path);
      }).catch((error) => {
        this.setState({ errorText: error.response.request.responseText});
      });
    }

    render() {
      return (
        <div className="ui container">
          <Header as="h3" icon="user" content="CLIENT DETAIL" />
          <Divider />
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
                        value={ClientsStore.client.name}
                        defaultValue={ClientsStore.client.name}
                        onChange={this.handleChange}
                      />
                      <Form.Input
                        name="contactName"
                        label="Contact Name"
                        placeholder="Contact Name"
                        value={ClientsStore.client.contactName}
                        defaultValue={ClientsStore.client.contactName}
                        onChange={this.handleChange}
                      />
                      </Form.Group>
                      <Form.Group>
                      <Form.Input
                        name="email"
                        label="Email"
                        placeholder="Email"
                        value={ClientsStore.client.email}
                        defaultValue={ClientsStore.client.email}
                        onChange={this.handleChange}
                      />
                      <Form.Input
                        name="address"
                        label="Address"
                        placeholder="Address"
                        value={ClientsStore.client.address}
                        defaultValue={ClientsStore.client.address}
                        onChange={this.handleChange}
                      />
                      </Form.Group>
                      <Form.Group>
                      <Form.Input
                        name="url"
                        label="URL"
                        placeholder="URL"
                        value={ClientsStore.client.url}
                        defaultValue={ClientsStore.client.url}
                        onChange={this.handleChange}
                      />
                      </Form.Group>
                      <Form.Group>
                      <Form.Checkbox
                        name="active"
                        label="Active"
                        checked={ClientsStore.client.active}
                        defaultValue={ClientsStore.client.active}
                        onChange={this.toggle}
                      />
                      </Form.Group>
                      <Form.Group>
                        <Dropdown
                          type="dropdown"
                          name="employees"
                          label="Developers"
                          placeholder='Developers'
                          defaultValue={ClientsStore.client.employees}
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
              <Button onClick={() => this.save("/home/profile")}>Save</Button>
            </div>
          </Container>
          { this.state.errorText ? (
                <ErrorMessage message = { this.state.errorText } />
              ) : null}
        </div>
      );
    }
  }
);

export default ClientDetailComponent;

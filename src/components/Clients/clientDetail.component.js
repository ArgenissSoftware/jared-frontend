import React, { Component } from "react";
import { observer } from "mobx-react";
import {
  Button,
  Form,
  Grid,
  Segment,
  Container,
  Divider,
  Header
} from "semantic-ui-react";
import clientsStore from "../../stores/ClientsStore";
import ErrorMessage from "../ErrorMessage/error-message";

const ClientDetailComponent = observer(
  class ClientDetailComponent extends Component {
    constructor(props) {
      super(props);
      this.setTitle();
      this.state= { errorObj: null };
      clientsStore.clearClient();
    }

    handleChange(e) {
      clientsStore.client[e.target.name] = e.target.value;
    }

    toggle = () => clientsStore.client.active = !clientsStore.client.active;

    setTitle(){
      const id = this.props.match.params.id;
      if (id  === 'new') {
        this.title = "NEW CLIENT";
      } else {
        this.title = "CLIENT DETAILS";
        // TODO: add loading state
        clientsStore.getClient(id);
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

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
import ClientsStore from "../../stores/ClientsStore";
import ErrorMessage from "../ErrorMessage/error-message";

const ClientDetailComponent = observer(
  class ClientDetailComponent extends Component {
    constructor(props) {
      super(props);
      let title;
      this.setTitle();
      this.state= { errorText: ""};
    }

    handleChange(e) {
      ClientsStore.client[e.target.name] = e.target.value;
    }
    toggle = () => ClientsStore.client.active = !ClientsStore.client.active;

    setTitle(){
      let url = (window.location.href).split("/");
      if(url[url.length -1] == 'new'){ 
        this.title = "NEW CLIENT";       
      }else{
        this.title = "CLIENT DETAILS";       
      }
    }

    save = async (path) => {
      if(this.title == "NEW CLIENT"){
        ClientsStore.addClient().then(() => {
          this.setState({ errorText: "" });
          this.props.history.push(path);
        }).catch((error) => {
          this.setState({ errorText: error.response.request.responseText });
        });
      }else{
        ClientsStore.update().then(() => {
          this.setState({ errorText: ""});
          this.props.history.push(path);
        }).catch((error) => {
          this.setState({ errorText: error.response.request.responseText });
        });
      } 
    }   

    render() {
      return (
        <div className="ui container aligned">
          <Header as="h3" icon="user" content={this.title} />
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
                        checked = {ClientsStore.client.active}
                        defaultValue={ClientsStore.client.active}
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
          { this.state.errorText ? (
                <ErrorMessage message = { this.state.errorText } />
              ) : null}
        </div>
      );
    }
  }
);

export default ClientDetailComponent;

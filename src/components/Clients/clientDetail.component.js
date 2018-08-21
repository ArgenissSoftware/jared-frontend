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
import axios from "axios";
import ClientsStore from "../../stores/ClientsStore";
import AppStore from "../../stores/AppStore";
import authStore from "../../stores/AuthStore";


const ClientDetailComponent = observer(
  class ClientDetailComponent extends Component {
    constructor(props) {
      super(props);
    }

    handleChange(e) {
      ClientsStore.client[e.target.name] = e.target.value;
    }

    async save() {
      await axios
        .put(AppStore.URL + "/clients/" + ClientsStore.client._id, {
          name: ClientsStore.client.name,
          id: ClientsStore.client.id
        }, {
          headers: {
            Authorization: "Bearer " + authStore.token
          }
        })
        .then(
          function(response) {
            //confirmation semantic modal
          }.bind(this)
        )
        .catch(function(error) {
          console.log(error);
        });
    }

    render() {
      return (
          <div className="ui container aligned">
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
                          label="Client's name"
                          placeholder="Name"
                          defaultValue={ClientsStore.client.name}
                          onChange={this.handleChange}
                        />
                      </Form.Group>
                    </Form>
                  </Segment>
                </Grid.Row>
              </Grid>
              <div className="ui container center aligned">
                <Button onClick={this.save}>Save</Button>
              </div>
            </Container>
          </div>
      );
    }
  }
);

export default ClientDetailComponent;

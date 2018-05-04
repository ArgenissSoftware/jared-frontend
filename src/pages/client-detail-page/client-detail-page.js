import React, { Component } from "react";
import { observer } from "mobx-react";

import {
  Button,
  Input,
  List,
  Form,
  Grid,
  Segment,
  Container
} from "semantic-ui-react";
import axios from "axios";
import ClientsStore from "../../stores/ClientsStore";
import AppStore from "../../stores/AppStore";
import TopNavBar from "../../components/TopNavBar/top-nav-bar";

let client;

const ClientDetailPage = observer(
  class ClientDetailPage extends Component {
    constructor(props) {
      super(props);
    }

    handleChange(e) {
      ClientsStore.client[e.target.name] = e.target.value;
    }

    async save() {
      await axios
        .put(AppStore.URL + "/api/clients/" + ClientsStore.client._id, {
          name: ClientsStore.client.name,
          id: ClientsStore.client.id
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
        <div>
          <TopNavBar history={this.props.history} />
          <div className="ui container center aligned">
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
        </div>
      );
    }
  }
);

export default ClientDetailPage;

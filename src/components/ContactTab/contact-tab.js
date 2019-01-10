import React, { Component } from "react";
import { 
  Form,
  Grid,
  Segment,
  Container 
} from "semantic-ui-react";
import "./contact-tab.css";
import { observer } from "mobx-react";
import UserStore from "../../stores/UserStore";

const ContactTab = observer(
  class ContactTab extends Component {
    constructor(){
      super();
    }
    
    handleChange(e) {
      UserStore.user[e.target.name] = e.target.value;
    }

    render() {
      return (
        <div className="ui container aligned">
          <Container>
            <Grid>
              <Grid.Row centered>
                <Segment compact>
                  <Form>
                    <Form.Group>
                      <Form.Input
                        name="address"
                        label="Address"
                        placeholder="Address"
                        defaultValue={UserStore.user.address}
                        onChange={this.handleChange}
                      />
                      <Form.Input
                        name="phone"
                        label="Phone number"
                        placeholder="Phone number"
                        defaultValue={UserStore.user.phone}
                        onChange={this.handleChange}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Input
                        name="cellPhone"
                        label="Cell phone"
                        placeholder="Cell phone"
                        defaultValue={UserStore.user.cellPhone}
                        onChange={this.handleChange}
                      />
                      <Form.Input
                        name="email"
                        label="Email address"
                        placeholder="Email address"
                        defaultValue={UserStore.user.email}
                        onChange={this.handleChange}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Input
                        name="skype"
                        label="Skype"
                        placeholder="Skype"
                        defaultValue={UserStore.user.skype}
                        onChange={this.handleChange}
                      />
                      <Form.Input
                        name="githubID"
                        label="Github ID"
                        placeholder="Github ID"
                        defaultValue={UserStore.user.githubID}
                        onChange={this.handleChange}
                      />
                    </Form.Group>
                  </Form>
                </Segment>
              </Grid.Row>
            </Grid>
          </Container>
         
        </div>
      );
    }
  }
);

export default ContactTab;

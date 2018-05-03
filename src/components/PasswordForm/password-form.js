import React, { Component } from "react";
import { Form, Segment, Container, Grid } from "semantic-ui-react";
import "./password-form.css";
import { observer } from "mobx-react";
import ProfileStore from "../../stores/ProfileStore";


const PasswordForm = observer(
  class PasswordForm extends Component {

    handleChange(e) {
      ProfileStore[e.target.name] = e.target.value;
    }

    render() {
      return (
        <Container>
          <Grid>
            <Grid.Row centered>
              <Segment compact>
                <Form>
                  <Form.Group>
                    <Form.Input
                      name="oldPassword"
                      label="Old Password"
                      placeholder="Old Password"
                      onChange={this.handleChange}
                      type="password"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Input
                      name="newPassword"
                      label="New Password"
                      placeholder="New Password"
                      onChange={this.handleChange}
                      type="password"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Input
                      name="newPassword2"
                      label="Repeat New Password"
                      placeholder="Repeat New Password"
                      onChange={this.handleChange}
                      type="password"
                    />
                  </Form.Group>
                </Form>
              </Segment>
            </Grid.Row>
          </Grid>
        </Container>
      );
    }
  }
);

export default PasswordForm;

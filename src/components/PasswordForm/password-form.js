import React, { Component } from "react";
import {
  Form,
  Segment,
  Container,
  Header,
  Button,
  Grid
} from "semantic-ui-react";
import "./password-form.css";
import UserStore from "../../stores/UserStore";

class PasswordForm extends Component {

  state = {
    password_old: '',
    password_confirmation: '',
    password: '',
  }

  handleChange = (e) => {
    const state = {}
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  save = () => {
    this.props.onSave && this.props.onSave(this.state);
  }

  render() {
    return (
      <Container>
        <Grid>
          <Grid.Row centered>
            <Segment compact textAlign="left">
              <Header>Change Password</Header>
              <Form>
                <Form.Group widths='equal'>
                  <Form.Input
                    name="password_old"
                    label="Old Password"
                    placeholder="Old Password"
                    onChange={this.handleChange}
                    value={this.state.password_old}
                    type="password"
                  />
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Input
                    name="password"
                    label="New Password"
                    placeholder="New Password"
                    onChange={this.handleChange}
                    value={this.state.password}
                    type="password"
                  />
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Input
                    name="password_confirmation"
                    label="Repeat New Password"
                    placeholder="Repeat New Password"
                    onChange={this.handleChange}
                    value={this.state.password_confirmation}
                    type="password"
                  />
                </Form.Group>
              </Form>
              <Button onClick={this.save}>Save</Button>
            </Segment>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default PasswordForm;

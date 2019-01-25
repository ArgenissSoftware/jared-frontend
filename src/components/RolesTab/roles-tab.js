import React, { Component } from "react";
import { Form, Container, Label, Icon } from "semantic-ui-react";
import { observer } from "mobx-react";
import rolesStore from "../../stores/RolesStore";
import usersStore from "../../stores/UserStore";
import ErrorMessage from "../ErrorMessage/error-message";

const RolesTab = observer(
  class RolesTab extends Component {
    constructor(props) {
      super(props);
      this.state = {
        errorObj: null,
        options: [],
      };
      this.handleOptions = this.handleOptions.bind(this);
      this.setRoles = this.setRoles.bind(this);
      this.setOptions()
    }

    setRoles() {
      let roles = []
      if(usersStore.user.roles){  
        usersStore.user.roles.forEach(u => {
          rolesStore.roles.forEach(r => {
            if (r._id === u) {
              roles.push({ _id: r._id, name: r.name })
            }
          });
        })}
      return roles;
    }

    async setOptions() {
      await rolesStore.getRolesList();
      let options = []
      rolesStore.roles.forEach(r => {
        options.push({ _id: r._id, text: r.name })
      });
      this.setState({ options: options });
    }

    handleOptions(data) {
      this.state.options.forEach(({ _id, text }) => {
        if (text === data.target.innerText) {
          usersStore.addUserRole(_id)
        }
      });
    }

    setRolesLabel(role) {
      return (
        <Label key={role._id.toString()}>
          {role.name}
          <Icon name='delete' onClick={() => usersStore.deleteUserRole(role)} />
        </Label>
      )
    }

    render() {
      let roles = this.setRoles();
      return (
        <div className="ui container aligned">
          {this.state.errorObj ? (
            <ErrorMessage message={this.state.errorObj} />
          ) : null}
          <Container>
            <Form>
              <Form.Group widths='equal'>
                <Form.Dropdown
                  type='dropdown'
                  label="Select Role"
                  selection
                  search
                  options={this.state.options}
                  onChange={this.handleOptions}
                />
              </Form.Group>
            </Form>
            {roles.map(userRoles => this.setRolesLabel(userRoles))}
          </Container>
        </div>
      );
    }
  }
);

export default RolesTab;

import React, { Component } from "react";
import { Form, Container, Label, Icon } from "semantic-ui-react";
import { observer } from "mobx-react";
import rolesStore from "../../stores/RolesStore";
import usersStore from "../../stores/UserStore";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const RolesTab = observer(
  class RolesTab extends Component {
    constructor(props) {
      super(props);
      this.state = {
        errorObj: null,
        options: [],
      };
      this.handleOptions = this.handleOptions.bind(this);
      this.removeUserRole = this.removeUserRole.bind(this);
      this.setOptions()
    }

    setRoles() {
      if (usersStore.user.roles) {
        return rolesStore.roles.filter(roles =>
          usersStore.user.roles.find(userRoles =>
            roles._id === userRoles
          ))
      }
    }

    async setOptions() {
      await rolesStore.getList();
      let options = rolesStore.roles.map(r =>
        ({ _id: r._id, text: r.name })
      );
      this.setState({ options: options });
    }

    handleOptions(data) {
      usersStore.addUserRole(
        this.state.options.find(o =>
          o.text === data.target.innerText
        )._id
      )
    }

    removeUserRole(roleId) {
      if (usersStore.user.roles.length === 1) {
        this.setState({ errorObj: "You need at least one role by user" })
      } else {
        usersStore.removeUserRole(roleId)
      }
    }

    setRolesLabel(role) {
      return (
        <Label key={role._id.toString()}>
          {role.name}
          <Icon name='delete' onClick={() => this.removeUserRole(role._id)} />
        </Label>
      )
    }

    render() {
      let roles = this.setRoles();
      return (
        <div className="ui container aligned">
          <Container>
            <Form>
              <Form.Group widths='equal'>
                <Form.Dropdown
                  type='dropdown'
                  label="Select Role"
                  selection
                  options={this.state.options}
                  onChange={this.handleOptions}
                />
              </Form.Group>
            </Form>
            {roles ? roles.map(role => this.setRolesLabel(role)) : null}
          </Container>
          {this.state.errorObj ? (
            <ErrorMessage message={this.state.errorObj} />
          ) : null}
        </div>
      );
    }
  }
);

export default RolesTab;

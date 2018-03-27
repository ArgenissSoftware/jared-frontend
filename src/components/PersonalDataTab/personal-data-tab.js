import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import "./personal-data-tab.css";
import { observer } from "mobx-react";
import store from "../../DataStore";

const PersonalDataTab = observer(
  class PersonalDataTab extends Component {
    constructor(props) {
      super(props);
    }

    handleChange(e) {
      store[e.target.name] = e.target.value;
    }

    render() {
      return (
        <div className="ui container">
          <Form>
            <Form.Group>
              <Form.Input
                name="firstName"
                label="First name"
                placeholder="First name"
                width={8}
                value={store.firstName}
                onChange={this.handleChange}
              />
              <Form.Input
                name="lastName"
                label="Last name"
                placeholder="Last name"
                width={8}
                value={store.lastName}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                name="dateOfBirth"
                label="Date of birth"
                placeholder="Date of birth"
                width={8}
                value={store.dateOfBirth}
                onChange={this.handleChange}
              />
              <Form.Input
                name="CUIL"
                label="CUIL"
                placeholder="CUIL"
                width={8}
                value={store.CUIL}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                name="passport"
                label="Passport"
                placeholder="Passport"
                width={8}
                value={store.passport}
                onChange={this.handleChange}
              />
              <Form.Input
                name="USVisa"
                label="US VISA"
                placeholder="US VISA"
                width={8}
                value={store.USVisa}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                name="startDate"
                label="Start date"
                placeholder="Start date"
                width={8}
                value={store.startDate}
                onChange={this.handleChange}
              />
              <Form.Input
                name="status"
                label="Status"
                placeholder="Status"
                width={8}
                value={store.status}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                name="career"
                label="Career"
                placeholder="Career"
                width={8}
                value={store.career}
                onChange={this.handleChange}
              />
              <Form.Input
                name="careerStatus"
                label="Career status"
                placeholder="Career status"
                width={8}
                value={store.careerStatus}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                name="children"
                label="Children"
                placeholder="Children"
                width={8}
                value={store.children}
                onChange={this.handleChange}
              />
              <Form.Input
                name="alarmCode"
                label="Alarm Code"
                placeholder="Alarm Code"
                width={8}
                value={store.alarmCode}
                onChange={this.handleChange}
              />
            </Form.Group>
          </Form>
        </div>
      );
    }
  }
);

export default PersonalDataTab;

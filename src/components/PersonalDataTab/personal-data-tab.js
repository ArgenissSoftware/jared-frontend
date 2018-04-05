import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import "./personal-data-tab.css";
import { observer } from "mobx-react";
import ProfileStore from "../../stores/ProfileStore";

const PersonalDataTab = observer(
  class PersonalDataTab extends Component {
    handleChange(e) {
      ProfileStore[e.target.name] = e.target.value;
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
                value={ProfileStore.firstName}
                onChange={this.handleChange}
              />
              <Form.Input
                name="lastName"
                label="Last name"
                placeholder="Last name"
                width={8}
                value={ProfileStore.lastName}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                name="dateOfBirth"
                label="Date of birth"
                placeholder="Date of birth"
                width={8}
                value={ProfileStore.dateOfBirth}
                onChange={this.handleChange}
              />
              <Form.Input
                name="CUIL"
                label="CUIL"
                placeholder="CUIL"
                width={8}
                value={ProfileStore.CUIL}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                name="passport"
                label="Passport"
                placeholder="Passport"
                width={8}
                value={ProfileStore.passport}
                onChange={this.handleChange}
              />
              <Form.Input
                name="USVisa"
                label="US VISA"
                placeholder="US VISA"
                width={8}
                value={ProfileStore.USVisa}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                name="startDate"
                label="Start date"
                placeholder="Start date"
                width={8}
                value={ProfileStore.startDate}
                onChange={this.handleChange}
              />
              <Form.Input
                name="status"
                label="Status"
                placeholder="Status"
                width={8}
                value={ProfileStore.status}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                name="career"
                label="Career"
                placeholder="Career"
                width={8}
                value={ProfileStore.career}
                onChange={this.handleChange}
              />
              <Form.Input
                name="careerStatus"
                label="Career status"
                placeholder="Career status"
                width={8}
                value={ProfileStore.careerStatus}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                name="children"
                label="Children"
                placeholder="Children"
                width={8}
                value={ProfileStore.children}
                onChange={this.handleChange}
              />
              <Form.Input
                name="alarmCode"
                label="Alarm Code"
                placeholder="Alarm Code"
                width={8}
                value={ProfileStore.alarmCode}
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

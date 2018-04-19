import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import "./personal-data-tab.css";
import { observer } from "mobx-react";
import ProfileStore from "../../stores/ProfileStore";

const PersonalDataTab = observer(
  class PersonalDataTab extends Component {
    handleChange(e) {
      ProfileStore[e.target.name] = e.target.value;
      console.log(ProfileStore);
    }

    setStatus(e, { value }) {
      ProfileStore.status = value;
      console.log(ProfileStore);
    }

    getStatusTypes() {
      let typesOptions = [
        {
          text: "hired",
          value: "hired"
        },
        {
          text: "freelancer",
          value: "freelancer"
        }
      ];
      return typesOptions;
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
                defaultValue={ProfileStore.firstName}
                onChange={this.handleChange}
              />
              <Form.Input
                name="lastName"
                label="Last name"
                placeholder="Last name"
                width={8}
                defaultValue={ProfileStore.lastName}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                name="dateOfBirth"
                label="Date of birth"
                placeholder="Date of birth"
                width={8}
                defaultValue={ProfileStore.dateOfBirth}
                onChange={this.handleChange}
                type="date"
              />
              <Form.Input
                name="CUIL"
                label="CUIL"
                placeholder="CUIL"
                width={8}
                defaultValue={ProfileStore.CUIL}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                name="passport"
                label="Passport"
                placeholder="Passport"
                width={8}
                defaultValue={ProfileStore.passport}
                onChange={this.handleChange}
              />
              <Form.Input
                name="USVisa"
                label="US VISA"
                placeholder="US VISA"
                width={8}
                defaultValue={ProfileStore.USVisa}
                onChange={this.handleChange}
                type="date"
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                name="startDate"
                label="Start date"
                placeholder="Start date"
                width={8}
                defaultValue={ProfileStore.startDate}
                onChange={this.handleChange}
                type="date"
              />
              <Form.Dropdown
                name="status"
                label="Status"
                placeholder="Status"
                width={8}
                onChange={this.setStatus}
                fluid
                selection
                options={this.getStatusTypes()}
                defaultValue={ProfileStore.status}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                name="career"
                label="Career"
                placeholder="Career"
                width={8}
                defaultValue={ProfileStore.career}
                onChange={this.handleChange}
              />
              <Form.Input
                name="careerStatus"
                label="Career status"
                placeholder="Career status"
                width={8}
                defaultValue={ProfileStore.careerStatus}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                name="children"
                label="Children"
                placeholder="Children"
                width={8}
                defaultValue={ProfileStore.children}
                onChange={this.handleChange}
              />
              <Form.Input
                name="alarmCode"
                label="Alarm Code"
                placeholder="Alarm Code"
                width={8}
                defaultValue={ProfileStore.alarmCode}
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

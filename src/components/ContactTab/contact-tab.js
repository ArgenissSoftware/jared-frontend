import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import "./contact-tab.css";
import { observer } from "mobx-react";
import store from "../../DataStore";

const ContactTab = observer(
  class ContactTab extends Component {
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
              <Form.Input label="Address" placeholder="Address" width={8} />
              <Form.Input
                name="phoneNumber"
                label="Phone number"
                placeholder="Phone number"
                width={8}
                value={store.phoneNumber}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                name="cellPhone"
                label="Cell phone"
                placeholder="Cell phone"
                width={8}
                value={store.cellPhone}
                onChange={this.handleChange}
              />
              <Form.Input
                name="emailAddress"
                label="Email address"
                placeholder="Email address"
                width={8}
                value={store.emailAddress}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                name="skype"
                label="Skype"
                placeholder="Skype"
                width={8}
                value={store.skype}
                onChange={this.handleChange}
              />
              <Form.Input
                name="githubID"
                label="Github ID"
                placeholder="Github ID"
                width={8}
                value={store.githubID}
                onChange={this.handleChange}
              />
            </Form.Group>
          </Form>
        </div>
      );
    }
  }
);

export default ContactTab;

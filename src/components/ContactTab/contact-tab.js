import React, { Component } from "react";
import { Form } from "semantic-ui-react";
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
        <div className="ui container">
          <Form>
            <Form.Group>
              <Form.Input
                name="address"
                label="Address"
                placeholder="Address"
                width={8}
                defaultValue={UserStore.user.address}
                onChange={this.handleChange}
              />
              <Form.Input
                name="phone"
                label="Phone number"
                placeholder="Phone number"
                width={8}
                defaultValue={UserStore.user.phone}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                name="cellPhone"
                label="Cell phone"
                placeholder="Cell phone"
                width={8}
                defaultValue={UserStore.user.cellPhone}
                onChange={this.handleChange}
              />
              <Form.Input
                name="email"
                label="Email address"
                placeholder="Email address"
                width={8}
                defaultValue={UserStore.user.email}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                name="skype"
                label="Skype"
                placeholder="Skype"
                width={8}
                defaultValue={UserStore.user.skype}
                onChange={this.handleChange}
              />
              <Form.Input
                name="githubID"
                label="Github ID"
                placeholder="Github ID"
                width={8}
                defaultValue={UserStore.user.githubID}
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

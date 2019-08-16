import React from "react";
import {
  Form,
  Container
} from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import FieldInput from "../Common/FieldInput";

/**
 * Contact Form Component
 */
export default observer((props) => {
  const store = props.store;

  return (
    <Container>
      <Form>
        <Form.Group widths='equal'>
          <FieldInput
            name="address"
            label="Address"
            placeholder="Address"
            store={store}
          />
          <FieldInput
            name="phone"
            label="Phone number"
            placeholder="Phone number"
            store={store}
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <FieldInput
            name="cellPhone"
            label="Cell phone"
            placeholder="Cell phone"
            store={store}
          />
          <FieldInput
            name="email"
            label="Email address"
            placeholder="Email address"
            store={store}
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <FieldInput
            name="skype"
            label="Skype"
            placeholder="Skype"
            store={store}
          />
          <FieldInput
            name="githubID"
            label="Github ID"
            placeholder="Github ID"
            store={store}
          />
        </Form.Group>
      </Form>
    </Container>
  );
});

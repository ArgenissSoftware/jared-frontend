import React from "react";
import {
  Form,
} from "semantic-ui-react";
import { observer } from "mobx-react-lite";

/**
 * Reactive Field Input
 * with error indicator
 * @param {Object} props
 */
export default observer((props) => {
  const {
    store,
    name,
    ...otherProps
  } = props;

  const value = (props.type && props.type === 'date' && store.entity[name]) ? store.entity[name].substr(0,10) : store.entity[name];

  return (
    <Form.Input
      name={name}
      value={value}
      onChange={store.setEntityFromEvent}
      error={store.fieldsWithErrors[name]}
      {...otherProps}
    />
  );
});


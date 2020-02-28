import React from "react";

import { observer } from 'mobx-react-lite';

import {
  Button,
} from "semantic-ui-react";

/**
 * Action button
 */
export default observer((props) => {
  const {children, store, ...otherProps} = props;

  return <Button loading={store.running} {...otherProps}>{props.children}</Button>;
});

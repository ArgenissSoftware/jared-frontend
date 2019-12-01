import React from "react";
import {
  Menu,
  Button,
  Icon
} from "semantic-ui-react";

import usersService from "../../services/users.service";
import EntityList from "../Common/EntityList";
import UserListItem from "./UserListItem";

/**
 * Users List Component
 * @param {Object} props
 */
export default function(props) {

  const add = () => {
    props.history.push('users/new');
  }

  const newButton = (
    <Menu.Item onClick={add} name="New User">
      <Button primary icon labelPosition='right'><Icon name='plus' /> New User</Button>
    </Menu.Item>
  );

  return (
    <EntityList
      title="Users"
      service={usersService}
      toolbar={newButton}
      renderItem={(user) => (<UserListItem user={user} history={props.history}/>)}
    />
  );
};

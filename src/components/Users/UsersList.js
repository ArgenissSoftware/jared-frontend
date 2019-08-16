import React from "react";
import {
  Button,
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

  return (
    <EntityList
      title="Users"
      service={usersService}
      toolbar={ <Button onClick={add}>New User</Button> }
      renderItem={(user) => (<UserListItem user={user} history={props.history}/>)}
    />
  );
};

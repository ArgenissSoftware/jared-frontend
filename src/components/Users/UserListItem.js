import React, {useCallback} from "react";
import {
  List,
  Image
} from "semantic-ui-react";
import getAvatar from '../../utils/getAvatar';

/**
 * User List Item
 */
export default function(props) {
  const user = props.user;

    return (
    <List.Item key={user.username}>
      <Image avatar src={getAvatar(user.email,'d=mp')} />
      <List.Content onClick={useCallback(() => props.history.push("users/" + user._id))}>
        <List.Header as="a" size={'medium'}>{user.name} {user.surname}</List.Header>
        <List.Description as="a">{user.email}</List.Description>
      </List.Content>
    </List.Item>
  )
}
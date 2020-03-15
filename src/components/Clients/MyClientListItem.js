import React, { useCallback } from "react";
import {
  List
} from "semantic-ui-react";

/**
 * my Client List Item
 */
export default function(props) {
  const client = props.client;
  const onClick = useCallback(
    () => props.history.push(`/home/clients/${props.client._id}/workedHours/`, {name: props.client.name}),
    [props.client, props.history]
  );
  return (
    <List.Item>
      <List.Icon name="user" size="large" verticalAlign="middle" />
      <List.Content onClick={onClick}>
        <List.Header as="a">{client.name}</List.Header>
        <List.Description as="a">Project Description</List.Description>
      </List.Content>
    </List.Item>
  )
}
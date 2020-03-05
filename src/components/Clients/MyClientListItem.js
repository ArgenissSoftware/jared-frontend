import React, { useCallback } from "react";
import {
  List
} from "semantic-ui-react";

/**
 * my Client List Item
 */
export default function(props) {
  const client = props.client;
  return (
    <List.Item key={client.id}>
      <List.Icon name="user" size="large" verticalAlign="middle" />
      <List.Content onClick={useCallback(() => props.history.push("workedHours/"))}>
        <List.Header as="a">{client.name}</List.Header>
        <List.Description as="a">Project Description</List.Description>
      </List.Content>
    </List.Item>
  )
}
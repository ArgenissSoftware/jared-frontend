import React, {useCallback} from "react";
import { List } from "semantic-ui-react"; 
/**
 * Worked Hour Item
 */

 export default function(props) {
  const whItem = props.item;
  
  return (
      <List.Item key={whItem._id}>
          <List.Content> 
            <List.Header as="a" size={'medium'}> Day: {whItem.day.slice(0,9)}</List.Header>
            <List.Description as="a">{whItem.clientId} Hours: {whItem.hours}</List.Description>
          </List.Content>
        </List.Item>
  )};
//onClick={useCallback(() => props.history.push("workedhours/" + whItem._id))}
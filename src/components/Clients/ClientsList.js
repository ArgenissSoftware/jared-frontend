import React, { useCallback } from "react";
import {
  Button,
  Menu,
  Icon
} from "semantic-ui-react";
import _ from 'lodash';
import clientsService from "../../services/clients.service";
import EntityList from "../Common/EntityList";
import ClientListItem from "./ClientListItem";

/**
 * Clients List Component
 * @param {Object} props
 */
export default function(props) {

  const add = useCallback(() => {
    props.history.push('clients/new');
  }, [props.history]);

  const newButton = (
    <Menu.Item onClick={add} name="New User">
      <Button primary icon labelPosition='right'><Icon name='plus' /> New Client</Button>
    </Menu.Item>
  );

  return (
    <EntityList
      title="Clients"
      service={clientsService}
      toolbar={newButton}
      renderItem={(client) => <ClientListItem client={client} history={props.history}/>}
    />
  );
};

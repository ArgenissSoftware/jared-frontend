import React, { useCallback } from "react";
import {
  Button,
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
  });

  return (
    <EntityList
      title="Clients"
      service={clientsService}
      toolbar={ <Button onClick={add}>New Client</Button> }
      renderItem={(client) => <ClientListItem client={client} history={props.history}/>}
    />
  );
};

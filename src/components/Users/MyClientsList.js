import React, { useCallback } from "react";
import _ from 'lodash';
import EntityList from "../Common/EntityList";
import ClientListItem from "../Clients/ClientListItem";
import myClientsService from "../../services/myClients.service";

/**
 *MyClients List Component
 * @param {Object} props
 */
export default function(props) {

  return (
      <EntityList
        title="My Clients"
        service={myClientsService}
        renderItem={(client) =>  <ClientListItem client={client} history={props.history}/> }              
    />
  );
};

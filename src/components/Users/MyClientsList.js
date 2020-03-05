import React, { useCallback } from "react";
import _ from 'lodash';
import EntityList from "../Common/EntityList";
import MyClientListItem from "../Clients/MyClientListItem";
import myClientsService from "../../services/myClients.service";

/**
 * MyClients List Component
 * @param {Object} props
 */
export default function(props) {

  /**
   * Render
   */
  return (
    <EntityList
      title="My Clients"
      service={myClientsService}
      renderItem={(client) =>  <MyClientListItem client={client} history={props.history}/> }
    />
  );
};

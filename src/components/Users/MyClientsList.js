import React, { useCallback } from "react";
import _ from 'lodash';
import clientsService from "../../services/clients.service";
import EntityList from "../Common/EntityList";
import ClientListItem from "../Clients/ClientListItem";
import { useAuthStore } from "../../stores/AuthStore";

/**
 *MyClients List Component
 * @param {Object} props
 */
export default function(props) {

  const authStore = useAuthStore();

  const myClients = 
    client => { 
      if(client.employees.includes(authStore.user._id)){
  return <ClientListItem client={client} history={props.history}/>}
   }
  


  return (
      <EntityList
        title="My Clients"
        service={clientsService}
        renderItem={(client) => myClients(client)}              
    />
  );
};

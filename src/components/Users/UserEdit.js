import React, { useEffect, useCallback } from "react";
import {
  Button,
  Header,
  Divider,
  Image,
  Form
} from "semantic-ui-react";
import { observer, useLocalStore } from "mobx-react-lite";


import UserTabs from "../Users/UserTabs";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { hasRoleShow } from "../Common/Auth";
import usersService from "../../services/users.service";
import getAvatar from "../../utils/getAvatar";
import { createCrudStore } from "../../stores/CreateCrudStore";

const RoleButton = hasRoleShow(Button);

const defaultEntity = {
  "active":true,
  "relation":"",
  "alarmCode": "",
  "clients":[],
  "roles":[],
  "name":"",
  "surname":"",
  "password":"",
  "username":"",
  "email":"",
  "birthday":"",
  "startWorkDate":"",
  "visa":""
};

/**
 * User Edit Component
 */
export default observer((props) => {

  const store = useLocalStore(createCrudStore(usersService, defaultEntity));

  const isNew = props.match.params.id === 'new';

  // Load entity
  useEffect(() => {
    if (!isNew) {
      store.get(props.match.params.id);
    } else {
      store.clearEntity();
    }
  }, [props.match.params.id]);


  const save = useCallback(async () => {
    const path = '/home/users';
    if (await store.save()) {
      props.history.push(path);
    }
  });

  const remove = useCallback(async() => {
    try {
      await store.remove();
      props.history.push("/home/users");
    } catch (error) {
      console.log("Fail to delete. Error: " + error);
    }
  });

  return (
    <div className="ui container aligned">
      { store.errorObj ? <ErrorMessage message = { store.errorObj } /> : null }
      <Header as="h3" icon={<Image avatar src={getAvatar(store.entity.email,'d=mp')} size='mini' />} content={(`Users / ${store.entity.name} ${store.entity.surname}`)} />
      <Divider />
      <UserTabs history={props.history} match={props.match} store={store}/>
      <Form>
        <RoleButton positive onClick={save} auth="Admin">Save</RoleButton>
        { !isNew ? (
          <RoleButton negative onClick={remove} auth="Admin">Delete</RoleButton>
          ) : null
        }
      </Form>

    </div>
  );

});
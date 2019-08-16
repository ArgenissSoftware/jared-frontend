import React, { useEffect } from "react";
import {
  Button,
} from "semantic-ui-react";

import { observer, useLocalStore } from "mobx-react-lite";

import ProfileTabs from "./ProfileTabs";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useAuthStore } from "../../stores/AuthStore";
import { createCrudStore } from "../../stores/CreateCrudStore";
import usersService from "../../services/users.service";

/**
 * Profile Component
 */
export default observer((props) => {
  const authStore = useAuthStore();
  const store = useLocalStore(createCrudStore(usersService));

  // Load entity
  useEffect(() => {
    store.get(authStore.user._id);
  }, []);



  return (
    <div className="ui container center aligned">
      { store.errorObj ? <ErrorMessage message = { store.errorObj } /> : null }
      <ProfileTabs history={props.history} store={store} />
      <Button onClick={store.save}>Save</Button>
    </div>
  );
});
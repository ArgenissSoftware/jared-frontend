import React, { useEffect, useCallback } from "react";
import { observer, useLocalStore } from 'mobx-react-lite'
import {
  Button,
  Form,
  Grid,
  Segment,
  Divider,
  Dimmer,
  Loader,
  Header,
  List
} from "semantic-ui-react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import UsersDropdown from "../Common/UsersDropdown";
import { createCrudStore } from "../../stores/CreateCrudStore";
import clientsService from "../../services/clients.service";
import { hasRoleShow } from "../Common/Auth";
import { createRelationStore } from "../../stores/CreateRelationStore";
import FieldInput from "../Common/FieldInput";

const RoleButton = hasRoleShow(Button);

const defaultEntity = {
  employees: [],
  active: true,
  name: '',
  contactName: '',
  address: '',
  email: '',
  url: ''
};

/**
 * Client Edit Component
 */
export default observer((props) => {

  const store = useLocalStore(createCrudStore(clientsService, defaultEntity));
  const developerStore = useLocalStore(createRelationStore(store, '/assign/developer/', 'employees' ));

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
    const path = '/home/clients';
    if (await store.save()) {
      props.history.push(path);
    }
  });

  const remove = useCallback(async() => {
    try {
      await store.remove();
      props.history.push("/home/clients");
    } catch (error) {
      console.log("Fail to delete. Error: " + error);
    }
  });

  return (
    <div className="ui container aligned">
      <Header as="h3" icon="user" content={`Clients / ${store.entity.name}`} />
      <Divider />
      { store.errorObj ? <ErrorMessage message = { store.errorObj } /> : null }
      <Dimmer.Dimmable as={Segment} dimmed={store.loading}>
        <Dimmer active={store.loading} inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
        <Form>
          <Form.Group widths='equal'>
            <FieldInput
              name="name"
              label="Name"
              placeholder="Name"
              store={store}
            />
            <FieldInput
              name="contactName"
              label="Contact Name"
              placeholder="Contact Name"
              store={store}
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <FieldInput
              name="email"
              label="Email"
              placeholder="Email"
              store={store}
            />
            <FieldInput
              name="address"
              label="Address"
              placeholder="Address"
              store={store}
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <FieldInput
              name="url"
              label="URL"
              placeholder="URL"
              store={store}
            />
          </Form.Group>
          <Form.Group>
            <Form.Checkbox
              name="active"
              label="Active"
              checked = {store.entity.active}
              value={store.entity.active}
              onChange={store.toggleActive}
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <UsersDropdown
              placeholder="Add a new Developer"
              onChange={developerStore.handleSelectionChange}
            />
            <Button onClick={() => developerStore.add()} disabled={!developerStore.selected}>ADD</Button>
          </Form.Group>
          <Divider/>
          <Grid>
            <Grid.Row centered>
              <Form.Group >
                { store.entity.employees ? (
                  <List divided verticalAlign='middle'>
                  {store.entity.employees.map(user => (
                    <List.Item key={user.name}>
                      <List.Content floated='right' >
                        <Button circular icon='delete' onClick={() => developerStore.delete(user)}></Button>
                      </List.Content>
                      <List.Icon name="user" size="large"/>
                      <List.Content>
                        <List.Header as="a">{user.name} {user.surname}</List.Header>
                        <List.Description as="a">{user.username}</List.Description>
                      </List.Content>
                    </List.Item>
                  ))}
                  </List>
                ) : null
                }
              </Form.Group>
            </Grid.Row>
          </Grid>
        </Form>
        <div className="ui container center aligned">
          <RoleButton positive onClick={save} auth="Admin">Save</RoleButton>
          { !isNew ? (
            <RoleButton negative onClick={remove} auth="Admin">Delete</RoleButton>
            ) : null
          }
        </div>
      </Dimmer.Dimmable>
    </div>
  );
});
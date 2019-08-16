import React, { useEffect } from "react";
import { Form, Container, Label, Icon } from "semantic-ui-react";
import { observer, useLocalStore } from "mobx-react-lite";
import rolesService from "../../services/roles.service";
import { createListStore } from "../../stores/CreateListStore";
import RecordsDropdown from "../Common/RecordsDropdown";

/**
 * Roles Tab Component
 */
export default observer((props) => {

  const rolesStore = useLocalStore(createListStore(rolesService));

  const localStote = useLocalStore(() => ({
    addUserRole(value) {
      if (props.store.entity.roles.indexOf(value._id) === -1){
        props.store.entity.roles.push(value)
      }

    },
    removeUserRole(role) {
      var i = props.store.entity.roles.indexOf(role)
      props.store.entity.roles.splice(i, 1);
    }
  }));

  useEffect(() => {
    rolesStore.loadPage();
  }, []);

  return (
    <div className="ui container aligned">
      <Container>
        <Form>
          <Form.Group widths='equal'>
            <RecordsDropdown
              autoload
              dataSource={rolesService}
              displayProperty="name"
              placeholder="Role"
              onChange={localStote.addUserRole}
            />
          </Form.Group>
        </Form>
        {props.store.entity.roles.map(role => (
          <Label key={role._id.toString()}>
            {role.name}
            <Icon name='delete' onClick={() => localStote.removeUserRole(role._id)} />
          </Label>
        ))}
      </Container>
    </div>
  );
});

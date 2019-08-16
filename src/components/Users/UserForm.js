import React from "react";
import {
  Form,
  Header,
  Input,
  Divider,
  Dimmer,
  Loader,
  Container,
} from "semantic-ui-react";
import { observer, useLocalStore } from "mobx-react-lite";
import usersService from "../../services/users.service";
import { runInAction } from "mobx";
import FieldInput from "../Common/FieldInput";

const typesOptions = [
  {
    text: "hired",
    value: "hired"
  },
  {
    text: "freelance",
    value: "freelance"
  }
];

/**
 * User Form Component
 */
export default observer((props) => {
  const store = props.store;

  const gitHubStore = useLocalStore(() => ({
    githubUser: '',
    error: '',
    setGithubUser(e, data) {
      this.githubUser = data.value;
    },
    searchOnGithub() {
      usersService.getGitHubUser(gitHubStore.githubUser).then(res => {
        let completeName = res.data.name
        if (completeName) {
          const splited = completeName.split(" ");
          runInAction(() => {
            store.setEntityProperty('name', splited[0]);
            store.setEntityProperty('surname', splited[1]);
            store.setEntityProperty('githubID', gitHubStore.githubUser);
          });
        }
      })
    }
  }))

  return (
      <Dimmer.Dimmable as={Container} dimmed={store.loading}>
        <Dimmer active={store.loading} inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>

        <Header as="h3">
          Update the profile by searching him in GitHub
        </Header>
        <Input
          name="github"
          label="https://github.com/"
          placeholder="GitHub ID"
          action={{ color: 'teal', icon: "search", onClick: gitHubStore.searchOnGithub }}
          width={8}
          onChange={gitHubStore.setGithubUser}
          error={gitHubStore.error}
        />
        <Divider/>
        <Form>
          <Form.Group widths='equal'>
            <FieldInput
              name="name"
              store={store}
              label="First name"
              placeholder="First name"
            />
            <FieldInput
              name="surname"
              store={store}
              label="Last name"
              placeholder="Last name"
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <FieldInput
              name="birthday"
              store={store}
              label="Date of birth"
              placeholder="Date of birth"
              type="date"
            />
            <FieldInput
              name="cuil"
              store={store}
              label="CUIL"
              placeholder="CUIL"
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <FieldInput
              name="passport"
              store={store}
              label="Passport"
              placeholder="Passport"
            />
            <FieldInput
              name="visa"
              store={store}
              label="US VISA"
              placeholder="US VISA"
              type="date"
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <FieldInput
              name="startWorkDate"
              store={store}
              label="Start date"
              placeholder="Start date"
              type="date"
            />
            <Form.Dropdown
              name="relation"
              label="Status"
              placeholder="Status"
              onChange={store.setEntityFromEvent}
              fluid
              selection
              options={typesOptions}
              value={store.entity.relation}
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <FieldInput
              name="career"
              store={store}
              label="Career"
              placeholder="Career"
            />
            <FieldInput
              name="status"
              store={store}
              label="Career status"
              placeholder="Career status"
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <FieldInput
              name="childrenCount"
              store={store}
              label="Children"
              placeholder="Children"
            />
            <FieldInput
              name="alarmCode"
              store={store}
              label="Alarm Code"
              placeholder="Alarm Code"
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <FieldInput
              name="username"
              store={store}
              label="Username"
              placeholder="Username"
            />
            { !store.entity._id ?
            <FieldInput
              name="password"
              store={store}
              label="Password"
              placeholder="Password"
            /> : null }
          </Form.Group>
        </Form>
      </Dimmer.Dimmable>
  );
});
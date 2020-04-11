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
 * Personal Data Form Component
 */
export default observer((props) => {
  const store = props.store;

  const gitHubStore = useLocalStore(() => ({
    githubUser: '',
    error: '',
    setGithubUser(e, data) {
      this.githubUser = data.value;
    }
  }))

  const searchOnGithub = function() {
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

  return (
    <div className="ui container">
      <Container>
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
          action={{ color: 'teal', icon: "search", onClick: searchOnGithub }}
          width={8}
          onChange={gitHubStore.setGithubUser}
          error={gitHubStore.error}
        />
        <Divider/>
        <Form>
          <Form.Group widths='equal'>
            <FieldInput
              name="name"
              label="First name"
              placeholder="First name"
              store={store}

            />
            <FieldInput
              name="surname"
              label="Last name"
              placeholder="Last name"
              store={store}
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <FieldInput
              name="birthday"
              label="Date of birth"
              placeholder="Date of birth"
              store={store}
              type="date"
            />
            <FieldInput
              name="cuil"
              label="CUIL"
              placeholder="CUIL"
              store={store}
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <FieldInput
              name="passport"
              label="Passport"
              placeholder="Passport"
              store={store}
            />
            <FieldInput
              name="visa"
              label="US VISA"
              placeholder="US VISA"
              store={store}
              type="date"
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <FieldInput
              name="startWorkDate"
              label="Start date"
              placeholder="Start date"
              store={store}
              type="date"
            />
            <Form.Dropdown
              name="relation"
              label="Status"
              placeholder="Status"
              fluid
              selection
              options={typesOptions}
              store={store}
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <FieldInput
              name="career"
              label="Career"
              placeholder="Career"
              store={store}
            />
            <FieldInput
              name="status"
              label="Career status"
              placeholder="Career status"
              store={store}
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <FieldInput
              name="childrenCount"
              label="Children"
              placeholder="Children"
              store={store}
            />
            <FieldInput
              name="alarmCode"
              label="Alarm Code"
              placeholder="Alarm Code"
              store={store}
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <FieldInput
              name="username"
              label="Username"
              placeholder="Username"
              store={store}
            />
            { !store.entity._id ?
            <FieldInput
              name="password"
              label="Password"
              placeholder="Password"
              store={store}
            /> : null }
          </Form.Group>
        </Form>
      </Container>
    </div>
  );
});
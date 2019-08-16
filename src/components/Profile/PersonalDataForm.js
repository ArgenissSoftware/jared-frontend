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
            <Form.Input
              name="name"
              label="First name"
              placeholder="First name"
              value={store.entity.name}
              onChange={store.setEntityFromEvent}

            />
            <Form.Input
              name="surname"
              label="Last name"
              placeholder="Last name"
              value={store.entity.surname}
              onChange={store.setEntityFromEvent}
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input
              name="birthday"
              label="Date of birth"
              placeholder="Date of birth"
              value={store.entity.birthday}
              onChange={store.setEntityFromEvent}
              type="date"
            />
            <Form.Input
              name="cuil"
              label="CUIL"
              placeholder="CUIL"
              value={store.entity.cuil}
              onChange={store.setEntityFromEvent}
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input
              name="passport"
              label="Passport"
              placeholder="Passport"
              value={store.entity.passport}
              onChange={store.setEntityFromEvent}
            />
            <Form.Input
              name="visa"
              label="US VISA"
              placeholder="US VISA"
              value={store.entity.visa}
              onChange={store.setEntityFromEvent}
              type="date"
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input
              name="startWorkDate"
              label="Start date"
              placeholder="Start date"
              value={store.entity.startWorkDate}
              onChange={store.setEntityFromEvent}
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
            <Form.Input
              name="career"
              label="Career"
              placeholder="Career"
              value={store.entity.career}
              onChange={store.setEntityFromEvent}
            />
            <Form.Input
              name="status"
              label="Career status"
              placeholder="Career status"
              value={store.entity.status}
              onChange={store.setEntityFromEvent}
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input
              name="childrenCount"
              label="Children"
              placeholder="Children"
              value={store.entity.childrenCount}
              onChange={store.setEntityFromEvent}
            />
            <Form.Input
              name="alarmCode"
              label="Alarm Code"
              placeholder="Alarm Code"
              value={store.entity.alarmCode}
              onChange={store.setEntityFromEvent}
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input
              name="username"
              label="Username"
              placeholder="Username"
              value={store.entity.username}
              onChange={store.setEntityFromEvent}
            />
            { !store.entity._id ?
            <Form.Input
              name="password"
              label="Password"
              placeholder="Password"
              value={store.entity.password}
              onChange={store.setEntityFromEvent}
            /> : null }
          </Form.Group>
        </Form>
      </Container>
    </div>
  );
});
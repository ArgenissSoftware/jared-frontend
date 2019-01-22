import React, { Component } from "react";
import {
  Form,
  Header,
  Input,
  Divider,
  Dimmer,
  Loader,
  Container,
  Grid,
  Segment
} from "semantic-ui-react";
import "./personal-data-tab.css";
import { observer } from "mobx-react";
import usersStore from "../../stores/UserStore";

const PersonalDataTab = observer(
  class PersonalDataTab extends Component {

    constructor() {
      super();
      this.state = {
        loading: false,
        error: false,
        githubID: "",
      };
    }

    searchOnGithub = () => {
      this.setState({ loading: true });
      usersStore.getGitHubUser(this.state.githubID).
        then(() => this.setState({ loading: false, error: false }))
        .catch(error => {
          console.log(error);
          this.setState({ loading: false, error: true });
        }

        )

    };

    handleChange = (e) => {
      this.setState({ error: false });
      usersStore.setUserField(e.target.name, e.target.value);
    }

    setGithubUser = (e) => {
      this.setState({ githubID: e.target.value });
    }

    setRelation(e, { value }) {
      usersStore.user.relation = value;
    }

    getRelationTypes() {
      let typesOptions = [
        {
          text: "hired",
          value: "hired"
        },
        {
          text: "freelancer",
          value: "freelancer"
        }
      ];
      return typesOptions;
    }

    render() {
      return (
        <div className="ui container">
          <Container>
            <Dimmer active={this.state.loading} inverted>
              <Loader inverted>Loading</Loader>
            </Dimmer>
            <Header as='h3'>
              Update your profile by searching you in GitHub
            </Header>
            <Input
              name="github"
              label="https://github.com/"
              placeholder="GitHub ID"
              action={{ color: 'teal', icon: "search", onClick: this.searchOnGithub }}
              width={8}
              onChange={this.setGithubUser}
              error={this.state.error} />
            <Divider />

            <Form>
              <Form.Group widths='equal'>
                <Form.Input
                  name="name"
                  label="First name"
                  placeholder="First name"
                  width={8}
                  value={usersStore.user.name}
                  onChange={this.handleChange}
                />
                <Form.Input
                  name="surname"
                  label="Last name"
                  placeholder="Last name"
                  width={8}
                  value={usersStore.user.surname}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Input
                  name="birthday"
                  label="Date of birth"
                  placeholder="Date of birth"
                  width={8}
                  value={usersStore.user.birthday}
                  onChange={this.handleChange}
                  type="date"
                />
                <Form.Input
                  name="cuil"
                  label="CUIL"
                  placeholder="CUIL"
                  width={8}
                  value={usersStore.user.cuil}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Input
                  name="passport"
                  label="Passport"
                  placeholder="Passport"
                  width={8}
                  value={usersStore.user.passport}
                  onChange={this.handleChange}
                />
                <Form.Input
                  name="visa"
                  label="US VISA"
                  placeholder="US VISA"
                  width={8}
                  value={usersStore.user.visa}
                  onChange={this.handleChange}
                  type="date"
                />
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Input
                  name="startWorkDate"
                  label="Start date"
                  placeholder="Start date"
                  width={8}
                  value={usersStore.user.startWorkDate}
                  onChange={this.handleChange}
                  type="date"
                />
                <Form.Dropdown
                  name="relation"
                  label="Status"
                  placeholder="Status"
                  width={8}
                  onChange={this.setRelation}
                  fluid
                  selection
                  options={this.getRelationTypes()}
                  value={usersStore.user.relation}
                />
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Input
                  name="career"
                  label="Career"
                  placeholder="Career"
                  width={8}
                  value={usersStore.user.career}
                  onChange={this.handleChange}
                />
                <Form.Input
                  name="status"
                  label="Career status"
                  placeholder="Career status"
                  width={8}
                  value={usersStore.user.status}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Input
                  name="childrenCount"
                  label="Children"
                  placeholder="Children"
                  width={8}
                  value={usersStore.user.childrenCount}
                  onChange={this.handleChange}
                />
                <Form.Input
                  name="alarmCode"
                  label="Alarm Code"
                  placeholder="Alarm Code"
                  width={8}
                  value={usersStore.user.alarmCode}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Input
                  name="username"
                  label="Username"
                  placeholder="Username"
                  width={8}
                  value={usersStore.user.username}
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form>
          </Container>
        </div>
      );
    }
  }
);

export default PersonalDataTab;

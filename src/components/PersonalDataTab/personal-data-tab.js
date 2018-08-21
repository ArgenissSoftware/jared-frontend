import React, { Component } from "react";
import {Form, Header, Input, Divider, Dimmer, Loader } from "semantic-ui-react";
import "./personal-data-tab.css";
import { observer } from "mobx-react";
import userStore from "../../stores/UserStore";
import axios from "axios";

const PersonalDataTab = observer(
  class PersonalDataTab extends Component {

    constructor() {
        super();
        this.state = {
            loading: false,
            error: false,
            githubID: "",
            name: "",
            surname: ""
        };
        this.searchOnGithub = this.searchOnGithub.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    searchOnGithub() {
      this.setState({ loading: true });
      axios.get("https://api.github.com/users/" + this.state.githubID)
           .then(res => {
              let name = res.data.name.split(" ")[0];
              let surname = res.data.name.split(" ")[1];
              this.setState({ loading: false, error: false, name: name, surname: surname });
              userStore.user.name = name;
              userStore.user.surname = surname;
              userStore.user.githubID = this.state.githubID;
           })
           .catch(error => {
              this.setState({ loading: false, error: true });
              console.log(error);
           });
    };

    handleChange(e) {
        this.setState({ error: false });
        if(e.target.name === "github") {
            this.setState({ githubID: e.target.value });
        } else {
            userStore.user[e.target.name] = e.target.value;
        }
    }

    setRelation(e, { value }) {
      userStore.user.relation = value;
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
              action={ { color: 'teal', icon: "search", onClick: this.searchOnGithub } }
              width={8}
              onChange={this.handleChange}
              error={this.state.error}/>
          <Divider/>

          <Form>
            <Form.Group>
              <Form.Input
                name="name"
                label="First name"
                placeholder="First name"
                width={8}
                value={this.state.name}
                defaultValue={userStore.user.name}
                onChange={this.handleChange}
              />
              <Form.Input
                name="surname"
                label="Last name"
                placeholder="Last name"
                width={8}
                value={this.state.surname}
                defaultValue={userStore.user.surname}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                name="birthday"
                label="Date of birth"
                placeholder="Date of birth"
                width={8}
                defaultValue={userStore.user.birthday}
                onChange={this.handleChange}
                type="date"
              />
              <Form.Input
                name="cuil"
                label="CUIL"
                placeholder="CUIL"
                width={8}
                defaultValue={userStore.user.cuil}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                name="passport"
                label="Passport"
                placeholder="Passport"
                width={8}
                defaultValue={userStore.user.passport}
                onChange={this.handleChange}
              />
              <Form.Input
                name="visa"
                label="US VISA"
                placeholder="US VISA"
                width={8}
                defaultValue={userStore.user.visa}
                onChange={this.handleChange}
                type="date"
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                name="startWorkDate"
                label="Start date"
                placeholder="Start date"
                width={8}
                defaultValue={userStore.user.startWorkDate}
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
                defaultValue={userStore.user.relation}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                name="career"
                label="Career"
                placeholder="Career"
                width={8}
                defaultValue={userStore.user.career}
                onChange={this.handleChange}
              />
              <Form.Input
                name="status"
                label="Career status"
                placeholder="Career status"
                width={8}
                defaultValue={userStore.user.status}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                name="children"
                label="Children"
                placeholder="Children"
                width={8}
                defaultValue={userStore.user.children}
                onChange={this.handleChange}
              />
              <Form.Input
                name="alarmCode"
                label="Alarm Code"
                placeholder="Alarm Code"
                width={8}
                defaultValue={userStore.user.alarmCode}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group>
            <Form.Input
                name="username"
                label="Username"
                placeholder="Username"
                width={8}
                defaultValue={userStore.user.username}
                onChange={this.handleChange}
              />
            </Form.Group>
          </Form>
        </div>
      );
    }
  }
);

export default PersonalDataTab;

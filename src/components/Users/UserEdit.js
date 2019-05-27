import React, { Component } from "react";
import {
  Button,
  Message,
  Header,
  Image,
  Form
} from "semantic-ui-react";
import { observer } from "mobx-react";

import UserTabs from "../Users/UserTabs";
import userStore from "../../stores/UserStore";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { hasRoleShow } from "../Common/Auth";

const RoleButton = hasRoleShow(Button);

export default observer(
  class UserEdit extends Component {
    constructor(props) {
      super(props);
      this.state = {
        errorObj: ""
      };
      userStore.clearUser();
    }

    componentDidMount() {
      this.load(this.props.match.params.id);
    }

    componentDidUpdate(prevProps) {
      const id = this.props.match.params.id;
      if (prevProps.match.params.id !== id) {
        this.load(id);
      }
    }

    load(id) {
      userStore.clearUser();

      if (id !== 'new') {
        userStore.get(id);
      }
    }

    get isNew() {
      return this.props.match.params.id === 'new'
    }

    save = async () => {
      this.setState({ errorObj: "" });
      if(this.isNew){
        userStore.add(userStore.user)
        .then(() =>{
          this.props.history.push("/home/users");
        })
        .catch((error) => {
          this.setState({ errorObj: error.response.data });
        });
      } else {
      userStore.update()
        .then(() => {
          this.props.history.push("/home/users");
        })
        .catch((error) => {
          this.setState({ errorObj: error.response.data });
        });
      }
    }

    delete = async() => {
      userStore.disable()
      .then(() => {
        this.props.history.push("/home/users");
      })
      .catch((error) => {
        console.log("Fail to delete. Error: " + error);
      });
    }

    render() {
      return (
        <div className="ui container center aligned">
          {(userStore.error) ? <Message negative
            header="Error"
            content={userStore.error}
          /> : null}
          { this.state.errorObj ? (
            <ErrorMessage message = { this.state.errorObj }/>
            ) : null
          }
          <Header as="h3" textAlign="left" icon={<Image avatar src={userStore.getAvatar(userStore.user.email,'d=mp')} />} content={(this.isNew ? 'Create User ' : 'User ') + userStore.user.name + ' ' + userStore.user.surname  } />
          <UserTabs history={this.props.history} match={this.props.match}/>
          <Form>
            <RoleButton positive onClick={this.save} auth="Admin">Save</RoleButton>
            { !this.isNew ? (
              <RoleButton negative onClick={this.delete} auth="Admin">Delete</RoleButton>
              ) : null
            }
          </Form>

        </div>
      );
    }
  }
);
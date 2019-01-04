import React, { Component } from "react";
import { observer } from "mobx-react";
import { List, Header, Divider, Button } from "semantic-ui-react";
import UserStore from "../../stores/UserStore";
import userStore from "../../stores/UserStore";

const UserListComponent = observer(
  class UserListComponent extends Component {
    constructor(props) {
      super(props);
      UserStore.getUsersList();
    }

    getRenderedUserList(name, email, id) {
      return (
        <List.Item key={name}>
          <List.Icon name="user" size="large" verticalAlign="middle" />
          <List.Content onClick={() => this.GoToDetail(id)}>
            <List.Header as="a">{name}</List.Header>
            <List.Description as="a">{email}</List.Description>
          </List.Content>
        </List.Item>
      );
    }

    addClient = () => {
      userStore.clearUser();
    this.props.history.push('/home/users/new');
    }

    async GoToDetail(id){
      await userStore.getUserById(id);
      this.props.history.push("users/" + id);
    }

    render() {
        return (
        <div className="ui container aligned">
            <Header as="h3" icon="user" content="USERS LIST" />
            <Button onClick={this.addClient}>New User</Button>
            <Divider />
            <List divided relaxed verticalAlign='middle'>
                {UserStore.userList.map(user =>
                    this.getRenderedUserList(user.username, user.email, user._id)
                )}
            </List>
        </div>
      );
    }

  }
);

export default UserListComponent;

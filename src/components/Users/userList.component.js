import React, { Component } from "react";
import { observer } from "mobx-react";
import {
  List,
  Header, 
  Divider, 
  Button,
  Pagination
} from "semantic-ui-react";
import userStore from "../../stores/UserStore";
import _ from "Lodash";

const UserListComponent = observer(
  class UserListComponent extends Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      userStore.getUsersList(1);
    }

    getRenderedUserList(name, email, id) {
      return (
        <List.Item key={name}>
          <List.Icon name="user" size="large" verticalAlign="middle" />
          <List.Content onClick={() => this.goToDetail(id)}>
            <List.Header as="a">{name}</List.Header>
            <List.Description as="a">{email}</List.Description>
          </List.Content>
        </List.Item>
      );
    }

    addUser = () => {
      this.props.history.push('users/new');
    }

    goToDetail(id) {
      this.props.history.push("users/" + id);
    }

    handlePageChange(e, data) {
      userStore.getUsersList(_.ceil(data.activePage));      
    }

    render() {
        return (
        <div className="ui container aligned">
          <Button onClick={this.addUser}>New User</Button>
          <Header as="h3" icon="user" content="USERS LIST" />
          <Divider />
          <List divided relaxed verticalAlign='middle'>
              {userStore.userList.map(user =>
                  this.getRenderedUserList(user.username, user.email, user._id)
              )}
          </List>
          <Pagination
            defaultActivePage={1}
            firstItem={null}
            lastItem={null}
            pointing
            secondary
            totalPages={userStore.userCount/userStore.pageSize}
            onPageChange={this.handlePageChange}
          >
            
          </Pagination>
        </div>
      );
    }

  }
);

export default UserListComponent;

import React, { Component } from "react";
import { observer } from "mobx-react";
import {
  List,
  Header, 
  Divider, 
  Button,
  Pagination,
  Container,
  Grid,
  Dropdown,
  Form,
  Icon
} from "semantic-ui-react";
import userStore from "../../stores/UserStore";
import _ from 'lodash';

const UserListComponent = observer(
  class UserListComponent extends Component {
    constructor(props) {
      super(props);
      this.state = { 
        search: undefined,
        pageSize: 2,
        pageSizeOptions: [
          { key: 2, text: 2, value: 2 },
          { key: 10, text: 10, value: 10 },
          { key: 15, text: 15, value: 15 },
          { key: 20, text: 20, value: 20 },
          { key: 25, text: 25, value: 25 },
          { key: 50, text: 50, value: 50 },
          { key: 100, text: 100, value: 100 }
          ]
      };
      userStore.getUsersList(1, this.state.pageSize);
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

    handleChange = async (e, data) => {
      switch (data.type) {
        case "search":        
          if(data.value.length >= 3) {
            await this.setState({ search: data.value });
            userStore.getUsersList(1, this.state.pageSize, this.state.search);
          } else if(data.value.length == 0) {
            userStore.getUsersList(1, this.state.pageSize);
            this.setState({ search: undefined });
          }
          break;
        case "dropdown":
          await this.setState({ pageSize: data.value });
          userStore.getUsersList(1, this.state.pageSize, this.state.search);
          break;
        case "pagination":
          userStore.getUsersList(_.ceil(data.activePage), this.state.pageSize);
          break;
        default:
          break;
      }
    }

    render() {
        return (
        <div className="ui container aligned">
          <Header as="h3" icon="user" content="USERS LIST" />
          <Container>
            <Form>
              <Form.Group>
                <div>
                  Show me <Dropdown
                    type="dropdown"
                    inline
                    options={this.state.pageSizeOptions}
                    defaultValue={this.state.pageSizeOptions[0].text}
                    onChange={this.handleChange}
                  /> clients per page
                </div>
                <Form.Input
                  type="search"
                  placeholder="Search"
                  icon={<Icon name='search' inverted circular link />}
                  value={userStore.user.name}
                  defaultValue={userStore.user.name}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group widths='equal'>
                <Button onClick={this.addUser}>New User</Button>
              </Form.Group>
            </Form>
          </Container>
          <Divider />
          <List divided relaxed verticalAlign='middle'>
              {userStore.userList.map(user =>
                  this.getRenderedUserList(user.username, user.email, user._id)
              )}
          </List>
          <Container>
            <Grid>
              <Grid.Row centered>
                <Pagination
                  type="pagination"
                  defaultActivePage={1}
                  firstItem={null}
                  lastItem={null}
                  pointing
                  secondary
                  totalPages={userStore.userCount / this.state.pageSize}
                  onPageChange={this.handleChange}
                />
              </Grid.Row>
            </Grid>
          </Container>
        </div>
      );
    }

  }
);

export default UserListComponent;

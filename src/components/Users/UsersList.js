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
import PageSizeSelector from '../Common/PageSizeSelector';
import _ from 'lodash';

const UsersList = observer(
  class UsersList extends Component {

    pageSizeOptions = [
      { key: 2, text: 2, value: 2 },
      { key: 10, text: 10, value: 10 },
      { key: 15, text: 15, value: 15 },
      { key: 20, text: 20, value: 20 },
      { key: 25, text: 25, value: 25 },
      { key: 50, text: 50, value: 50 },
      { key: 100, text: 100, value: 100 }
    ];

    state = {
      search: '',
      pageSize: 10,
    };

    constructor(props) {
      super(props);
      userStore.getUsersList(1, this.state.pageSize);
    }

    /**
     * Search
     */
    search = async(e, data) => {
      if(data.value.length >= 3) {
        await this.setState({ search: data.value });
        userStore.getUsersList(1, this.state.pageSize, this.state.search);
      } else if(data.value.length == 0) {
        userStore.getUsersList(1, this.state.pageSize);
        this.setState({ search: undefined });
      }
    }

    /**
     * Page change
     */
    loadPage = (e, data) => {
      console.log(data)
      userStore.getUsersList(data.activePage, this.state.pageSize, this.state.search);
    }

    /**
     * Change page size
     */
    changePageSize = (e, data) => {
      this.setState({ pageSize: data.value });
      userStore.getUsersList(1, data.value, this.state.search);
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

    render() {
        return (
        <div className="ui container aligned">
          <Header as="h3" icon="user" content="USERS LIST" />
          <Divider />
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                <Form>
                  <Form.Group>
                    <Form.Input
                      type="search"
                      placeholder="Search"
                      icon={<Icon name='search' inverted circular link />}
                      onChange={this.search}
                    />
                  </Form.Group>
                </Form>
              </Grid.Column>
              <Grid.Column>
                <Button onClick={() => this.addUser()}>NEW USER</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <List divided relaxed verticalAlign='middle'>
              {userStore.userList.map(user =>
                  this.getRenderedUserList(user.username, user.email, user._id)
              )}
          </List>
          <Container>
            <Grid>
              <Grid.Row>
                <PageSizeSelector
                  pageSizeOptions={this.pageSizeOptions}
                  pageSize={this.state.pageSize}
                  onChange={this.changePageSize}
                />
              </Grid.Row>
              <Grid.Row centered>
                <Pagination
                  type="pagination"
                  defaultActivePage={1}
                  firstItem={null}
                  lastItem={null}
                  pointing
                  secondary
                  totalPages={userStore.userCount / this.state.pageSize}
                  onPageChange={this.loadPage}
                />
              </Grid.Row>
            </Grid>
          </Container>
        </div>
      );
    }

  }
);

export default UsersList;

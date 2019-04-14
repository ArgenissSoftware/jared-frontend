import React, { Component } from "react";
import { observer } from "mobx-react";
import {
  Button,
  List,
  Header,
  Divider,
  Pagination,
  Container,
  Grid,
  Form,
  Icon
} from "semantic-ui-react";
import clientsStore from "../../stores/ClientsStore";
import PageSizeSelector from '../Common/PageSizeSelector';
import _ from 'lodash';

const ClientsList = observer(
  class ClientsList extends Component {

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
      search: undefined,
      pageSize: 10,
    };

    constructor(props) {
      super(props);
      clientsStore.getClientsList(1, this.state.pageSize);
    }

    getRenderedClientsList(client) {
      return (
        <List.Item key={client.id}>
          <List.Icon name="user" size="large" verticalAlign="middle" />
          <List.Content onClick={() => this.goToDetail(client._id)}>
            <List.Header as="a">{client.name}</List.Header>
            <List.Description as="a">Project Description</List.Description>
          </List.Content>
        </List.Item>
      );
    }

    addClient = () => {
      this.props.history.push('/home/clients/new');
    }

    goToDetail(id) {
      this.props.history.push("clients/" + id);
    }

    /**
     * Search
     */
    search = async(e, data) => {
      if(data.value.length >= 3) {
        await this.setState({ search: data.value });
        clientsStore.getClientsList(1, this.state.pageSize, this.state.search);
      } else if(data.value.length == 0) {
        clientsStore.getClientsList(1, this.state.pageSize);
        this.setState({ search: undefined });
      }
    }

    /**
     * Page change
     */
    loadPage = (e, data) => {
      clientsStore.getClientsList(data.activePage, this.state.pageSize);
    }

    /**
     * Change page size
     */
    changePageSize = (e, data) => {
      this.setState({ pageSize: data.value });
      clientsStore.getClientsList(1, data.value, this.state.search);
    }

    /**
     * Render
     */
    render() {
      console.log('render', clientsStore.clients)
      return (
        <div className="ui container aligned">
          <Header as="h3" icon="user" content="CLIENTS LIST" />
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
                <Button onClick={() => this.addClient()}>NEW CLIENT</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <List divided relaxed>
            {clientsStore.clients.map(client =>
              this.getRenderedClientsList(client)
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
                  totalPages={clientsStore.clientCount / this.state.pageSize}
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

export default ClientsList;

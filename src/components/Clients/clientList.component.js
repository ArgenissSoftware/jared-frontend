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
  Dropdown,
  Form,
  Icon
} from "semantic-ui-react";
import clientsStore from "../../stores/ClientsStore";
import _ from 'lodash';

const ClientListComponent = observer(
  class ClientListComponent extends Component {
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
      clientsStore.getClientsList(1, this.state.pageSize);
      this.addClient = this.addClient.bind(this);
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

    addClient() {
      this.props.history.push('/home/clients/new');
    }

    goToDetail(id) {
      this.props.history.push("clients/" + id);
    }

    handleChange = async (e, data) => {
      switch (data.type) {
        case "search":
          if(data.value.length >= 3) {
            await this.setState({ search: data.value });
            clientsStore.getClientsList(1, this.state.pageSize, this.state.search);  
          } else if(data.value.length == 0) {
            clientsStore.getClientsList(1, this.state.pageSize);  
            this.setState({ search: undefined });
          }
          break;
        case "dropdown":     
          await this.setState({ pageSize: data.value }); 
          clientsStore.getClientsList(1, this.state.pageSize, this.state.search);  
          break;
        case "pagination":
          clientsStore.getClientsList(_.ceil(data.activePage), this.state.pageSize);  
          break;
        default:        
          break;
      }      
    }

    render() {
      return (
        <div className="ui container aligned">
          <Header as="h3" icon="user" content="CLIENTS LIST" />
          <Divider />
          <Container>
            <Grid>
              <Grid.Row>
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
                      value={clientsStore.client.name}
                      defaultValue={clientsStore.client.name}
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                </Form>
              </Grid.Row>
              <Grid.Row>
                <Button onClick={() => this.addClient()}>NEW CLIENT</Button>
              </Grid.Row>
            </Grid>
          </Container>
          <Divider/>
          <List divided relaxed>
            {clientsStore.clients.map(client =>
              this.getRenderedClientsList(client)
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
                  totalPages={clientsStore.clientCount / this.state.pageSize}
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

export default ClientListComponent;

import React, { Component } from "react";
import { observer, useLocalStore } from "mobx-react-lite";
import {
  List,
  Button,
  Grid,
  Container,
  Divider,
  Form
} from "semantic-ui-react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import _ from 'lodash';
import ClientsDropdown from "../Common/ClientsDropdown";
import { createRelationStore } from "../../stores/CreateRelationStore";


/**
 * Client Assign Component
 */
export default observer((props) => {

  const clientsStore = useLocalStore(createRelationStore(props.store, '/assign/client/', 'clients' ));

    const GoToDetail = function(id) {
      this.props.history.push("clients/" + id);
    }
    return (
      <div className="ui container">
        { props.store.errorObj ? <ErrorMessage message = { props.store.errorObj } /> : null }
        <Container>
          <Form>
            <Form.Group widths='equal'>
              <ClientsDropdown
                onChange={clientsStore.handleSelectionChange}
                placeholder="Add a new client"/>
              <Button onClick={() => clientsStore.add()}>ADD</Button>
            </Form.Group>
            <Grid>
              <Grid.Row centered>
                <Divider />
                <Form.Group widths='equal'>
                  { props.store.entity.clients ? (
                    <List divided relaxed verticalAlign='middle'>
                      { props.store.entity.clients.map(client => (
                          <List.Item key={client.name}>
                          <List.Content floated='right' >
                            <Button  circular icon='delete' onClick={() => clientsStore.delete(client)}></Button>
                          </List.Content>
                          <List.Icon name="user" size="large"/>
                          <List.Content onClick={() => GoToDetail(client._id)}>
                            <List.Header as="a">{client.name}</List.Header>
                            <List.Description as="a">{client.contactName}</List.Description>
                          </List.Content>
                          </List.Item>
                        )
                      ) }
                    </List>
                    ) : null
                  }
                </Form.Group>
              </Grid.Row>
            </Grid>
          </Form>
        </Container>
      </div>
    );
  });



import React, { Component } from 'react';
import { Feed, Icon, Button, Divider } from 'semantic-ui-react'

class ClientCard extends Component {

  getDeleteClient() {
    if (this.props.deleteClient) {
      return (
        <Feed.Content floated='right' >
          <Button circular icon='delete' onClick={() => this.props.deleteClient(this.props._id)}></Button>
        </Feed.Content>
      )
    } else {
      return null
    }
  }

  getNameAndDescription() {
    let name
    return (
      <div>
        <Feed.Summary>
          <a>{this.props.name}</a>
        </Feed.Summary>
        <Feed.Extra text >
          Project Description
        </Feed.Extra>
      </div>
    )
  }

  getContent() {
    if (this.props.history) {
      return (
        <Feed.Content onClick={() => this.goToDetail(this.props._id)}>
          {this.getNameAndDescription()}
        </Feed.Content>
      )
    } else {
      return (
        <Feed.Content>
          {this.getNameAndDescription()}
        </Feed.Content>
      )
    }
  }

  goToDetail(id) {
    this.props.history.push("clients/" + id);
  }

  render() {
    return (
      <Feed>
        <Feed.Event>
          <Icon name='user' size='big' />
          {this.getContent()}
          {this.getDeleteClient()}
        </Feed.Event>
        <Divider/>
      </Feed>
    );
  }
}

export default ClientCard;
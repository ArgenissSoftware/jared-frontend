import React, { Component } from "react";
import { Message } from 'semantic-ui-react'

class ErrorMessage extends Component {

  handleDismiss = (e) => {
    this.setState({ visible: false });
  }

  render() {
    let msgjson = this.props.message || {errors:[]};
    return (
      <Message negative>
        <Message.Header>Please check this errors</Message.Header>
        <ul>
        {msgjson['errors'].map( json => {
          return <li>{json['message']}</li>
        })}
        </ul>
      </Message>
      );
    }
  }

  export default ErrorMessage;

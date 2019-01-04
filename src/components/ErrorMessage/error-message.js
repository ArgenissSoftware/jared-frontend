import React, { Component } from "react";
import { Message } from 'semantic-ui-react'
import { observer } from "mobx-react";

const ErrorMessage = observer(
  class ErrorMessage extends Component {
        
    handleDismiss = (e) => {
      this.setState({ visible: false });
    }
    
    constructor(props) {
      super(props);
    }
    
    render() {
      let msgjson = JSON.parse(this.props.message);
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
    );
    
    export default ErrorMessage;
    
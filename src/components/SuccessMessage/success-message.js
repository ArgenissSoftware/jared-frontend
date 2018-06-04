import React, { Component } from "react";
import { Message } from 'semantic-ui-react'
import { observer } from "mobx-react";

let title;
let message;
const SuccessMessage = observer(
  class SuccessMessage extends Component {

    state = { visible: true }

    handleDismiss = () => {
      this.setState({ visible: false })
    }

    constructor(props) {
      super(props);
      title = props.title;
      message = props.message;
    }

    render() {
      if (this.state.visible) {
        return (
          <Message positive
            onDismiss={this.handleDismiss}
            header={title}
            content={message}
          />
        );
     }
     return (<span></span>);
    }
  }
);

export default SuccessMessage;

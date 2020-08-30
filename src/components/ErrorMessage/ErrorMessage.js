import React, { PureComponent } from "react";
import { Message } from "semantic-ui-react";

class ErrorMessage extends PureComponent {
  state = {
    visible: true,
  };

  render() {
    if (!this.state.visible) return null;
    let msg = this.props.message || "Ooops!!!";

    if (typeof msg === "string" || msg instanceof String) {
      return (
        <Message onDismiss={this.handleDismiss} negative>
          <Message.Header>Please check this error</Message.Header>
          <Message.Content>{msg}</Message.Content>
        </Message>
      );
    }

    if (msg.message) {
      return (
        <Message negative>
          <Message.Header>{msg.message}</Message.Header>
        </Message>
      );
    }

    if (Array.isArray(msg["errors"])) {
      return (
        <Message negative>
          <Message.Header>Please check this errors</Message.Header>
          <Message.List>
            {msg["errors"].map((json) => {
              return <Message.Item>{json["message"]}</Message.Item>;
            })}
          </Message.List>
        </Message>
      );
    }

    return (
      <Message negative>
        <Message.Header>Unknown error</Message.Header>
      </Message>
    );
  }
}

export default ErrorMessage;

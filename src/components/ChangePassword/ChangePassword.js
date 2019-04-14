import React, {Component} from "react";
import PasswordForm from "../../components/PasswordForm/password-form";
import usersService from "../../services/users.service";
import authStore from "../../stores/AuthStore";
import { Message } from "semantic-ui-react";

class ChangePassword extends Component {

    state = {
      error : '',
      success: false
    }

    save = async(form) => {
      this.setState({success: false, error: ''});
      try {
        await usersService.updatePassword(authStore.user._id, form);
        this.setState({success: true});
      } catch (err) {
        const error = err.response && err.response.data && err.response.data.errors ? err.response.data.errors : 'Server Error updating the password';
        this.setState({error: error});
      }
    }

    render() {
      return (
        <div className="ui container center aligned">
          {this.state.error && <Message compact
              negative
            >
              <Message.Header>Oops there was an error</Message.Header>
              <Message.Content>{this.state.error}</Message.Content>
            </Message>
          }
          {this.state.success && <Message compact
            >
              <Message.Content>Password updated</Message.Content>
            </Message>
          }
          <PasswordForm onSave={this.save}/>
        </div>
      );
    }
}

export default ChangePassword;
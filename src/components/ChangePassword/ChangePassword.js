import React from "react";
import { observer, useLocalStore } from "mobx-react-lite";
import PasswordForm from "../../components/PasswordForm/password-form";
import usersService from "../../services/users.service";
import { Message } from "semantic-ui-react";
import { useAuthStore } from "../../stores/AuthStore";


/**
 * Change Password Component
 */
export default observer((props) => {

  const authStore = useAuthStore();

  const localStote = useLocalStore(() => ({
    error : '',
    success: false,
    setSuccess(value) {
      this.success = value;
    },
    setError(value) {
      this.error = value;
    }
  }));

  const save = async(form) => {
    localStote.setSuccess(false);
    localStote.setError('');
    try {
      await usersService.updatePassword(authStore.user._id, form);
      localStote.setSuccess(true);
    } catch (err) {
      const error = err.response && err.response.data && err.response.data.errors ? err.response.data.errors : 'Server Error updating the password';
      localStote.setError(error);
    }
  }

  return (
    <div className="ui container center aligned">
      {localStote.error && <Message compact
          negative
        >
          <Message.Header>Oops there was an error</Message.Header>
          <Message.Content>{localStote.error}</Message.Content>
        </Message>
      }
      {localStote.success && <Message compact
        >
          <Message.Content>Password updated</Message.Content>
        </Message>
      }
      <PasswordForm onSave={save}/>
    </div>
  );
});
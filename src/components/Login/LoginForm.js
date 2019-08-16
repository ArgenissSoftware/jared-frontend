import React from 'react'
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment
} from 'semantic-ui-react'
import {
  Redirect
} from "react-router-dom";
import { observer, useLocalStore } from "mobx-react-lite";

import logo from "../../images/logo1.png";
import './LoginForm.css';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { useAuthStore } from "../../stores/AuthStore";

/**
 * Login Form Component
 */
export default observer((props) => {

  const authStore = useAuthStore();

  const store = useLocalStore(() => ({
    errorText: false,
    username: '',
    password: '',
    setError(error) {
      this.errorText = error;
    },
    setUsername(e, {value}) {
      this.username = value;
    },
    setPassword(e, {value}) {
      this.password = value;
    }
  }));

  const login = () => {
    store.setError(false);
    let data = {
      email: store.username,
      password: store.password
    };
    authStore
      .login(data)
      .then(() => {
        props.history.push("/home");
      })
      .catch(err => {
        store.setError(err.response.data.errors);
      });
  }

  if (authStore.isLoggedIn) {
    return <Redirect to={{ pathname: "/home" }} />;
  }
  return (
    <div className='login-form'>
      <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            <Image src={logo} /> Log-in to your account
          </Header>
          { store.errorText ? (
            <ErrorMessage message = { store.errorText } />
          ) : null }
          <Form size='large'>
            <Segment >
              <Form.Input
                fluid
                onChange={store.setUsername}
                icon='user'
                name="username"
                iconPosition='left'
                placeholder='E-mail or Username' />
              <Form.Input
                fluid
                onChange={store.setPassword}
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                name="password"
                type='password'
              />
              <Button
                color='teal'
                fluid
                size='large'
                disabled={!(store.username && store.password)}
                onClick={login}
              >
                Login
              </Button>
            </Segment>
          </Form>
          {/* <Message>
            New to us? <Link to={'/register'}>Sign Up</Link>
          </Message> */}
          <Message>
              Forgot your password?&nbsp;
              <a href="/forgot_password">
                Click Here
              </a>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  );
});
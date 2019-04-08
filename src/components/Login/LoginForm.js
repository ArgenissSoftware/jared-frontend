import React, { Component } from 'react'
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
  Link,
  Redirect
} from "react-router-dom";
import authStore from "../../stores/AuthStore";
import signInStore from "../../stores/SignInStore";
import logo from "../../images/logo1.png";
import { observer } from 'mobx-react';
import './LoginForm.css';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const LoginForm = observer(
  class LoginForm extends Component {
    state = {
      errorText: false
    }

    /**
     * Handle from changes
     */
    handleChange = (e) => {
      signInStore.set(e.target.name, e.target.value);
      if (this.state.errorText) this.setState({ errorText: false });
    }

    /**
     * Login
     */
    login = () => {
      this.setState({ errorText: false });
      let data = {
        email: signInStore.username,
        password: signInStore.password
      };
      authStore
        .login(data)
        .then(() => {
          this.props.history.push("/home");
        })
        .catch(err => {
          this.setState({ errorText: err.response.data.errors });
        });
    }

    /**
     * Render
     */
    render() {
      if (authStore.isLoggedIn()) {
        return <Redirect to={{ pathname: "/home" }} />;
      }
      return (
        <div className='login-form'>
          <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as='h2' color='teal' textAlign='center'>
                <Image src={logo} /> Log-in to your account
              </Header>
              { this.state.errorText ? (
                <ErrorMessage message = { this.state.errorText } />
              ) : null }
              <Form size='large'>
                <Segment >
                  <Form.Input
                    fluid
                    onChange={this.handleChange}
                    icon='user'
                    name="username"
                    iconPosition='left'
                    placeholder='E-mail or Username' />
                  <Form.Input
                    fluid
                    onChange={this.handleChange}
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
                    disabled={!(signInStore.username && signInStore.password)}
                    onClick={this.login}
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
    }
  }
);

export default LoginForm
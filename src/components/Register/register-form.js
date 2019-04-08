import React, { Component } from "react";
import { observer } from "mobx-react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment
} from 'semantic-ui-react'
import "./register-form.css";
import authStore from "../../stores/AuthStore";
import userStore from "../../stores/UserStore";
import signUpStore from "../../stores/SignUpStore";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import logo from "../../images/logo1.png";

let registerSuccessMessage = false;

const RegisterForm = observer(
  class RegisterForm extends Component {

    state = { errorText: "" };

    /**
     * Constructor
     * @param {object} props
     */
    constructor(props) {
      super(props);
      signUpStore.clear();
    }

    /**
     * Handle form changes
     * @param {object} e
     */
    handleChange = (e) => {
      signUpStore[e.target.name] = e.target.value;
    }

    /**
     * register
     */
    register = async () => {
      this.setState({ errorText: ""});
      if (signUpStore.password === signUpStore.repeatPassword) {
        await authStore.register({
          username: signUpStore.username,
          email: signUpStore.email,
          password: signUpStore.password
        })
          .then((response) => {
            registerSuccessMessage = true;
            // once registered, set authStore credentials
            authStore.setUserAuth(response.data.data);
            userStore.setUserLogged(response.data.data)
          })
          .catch((error) => {
            this.setState({errorText: error.response.data});
          });
      } else {
        this.setState({errorText: {"errors":[{"message":"Password do not match"}]}});
      }
    }

    /**
     * Render
     */
    render() {
      if (authStore.isLoggedIn()) {
        return <Redirect to={{ pathname: "/home", state: { registerSuccessMessage: registerSuccessMessage } }}/>;
      }
      return (
        <div className='login-form'>
          <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as='h2' color='teal' textAlign='center'>
                <Image src={logo} /> Register
              </Header>
              { this.state.errorText ? (
                <ErrorMessage message = { this.state.errorText } />
              ) : null }
              <Form size='large'>
                <Segment >
                  <Form.Input
                    fluid
                    type="email"
                    name="email"
                    icon="mail"
                    value={signUpStore.email}
                    placeholder="Email address"
                    onChange={this.handleChange}
                    iconPosition='left'/>
                  <Form.Input
                    fluid
                    type="text"
                    name="username"
                    icon="user"
                    value={signUpStore.username}
                    placeholder="Username"
                    onChange={this.handleChange}
                    iconPosition='left'/>
                  <Form.Input
                    fluid
                    onChange={this.handleChange}
                    value={signUpStore.password}
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    name="password"
                    type='password'
                  />
                  <Form.Input
                    fluid
                    onChange={this.handleChange}
                    value={signUpStore.repeatPassword}
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    name="repeatPassword"
                    type='password'
                  />
                  <Button
                    color='teal'
                    fluid
                    size='large'
                    disabled={!(signUpStore.username && signUpStore.password && signUpStore.email && signUpStore.repeatPassword)}
                    onClick={this.register}
                  >
                    Register
                  </Button>
                </Segment>
              </Form>
              <Message>
                Already registered? <Link to={'/'}>Login</Link>
              </Message>
            </Grid.Column>
          </Grid>
        </div>
      );
    }
  }
);

export default RegisterForm;
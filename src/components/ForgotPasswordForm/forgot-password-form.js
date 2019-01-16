import React, { Component } from "react";
import { 
  Form, 
  Segment, 
  Container, 
  Grid 
} from "semantic-ui-react";
import "./forgot-password-form.css";
import { observer } from "mobx-react";
import ProfileService from "../../services/profile.service"

let fpErrorMessage = false;
let errorText1 = "";
let errorText2 = "";
let fpSuccessMessage = false;
let successText1 = "";
let email = "";

const ForgotPasswordForm = observer(
  class ForgotPasswordForm extends Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.recoverMail = this.recoverMail.bind(this);
    }

    handleChange(e) {
      email = e.target.value;
      fpErrorMessage = false;
    }

    async recoverMail() {
      fpErrorMessage = false;
      fpSuccessMessage = false;
      //check email validity using regex
      var regex = /^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      //true means email field has the form string - (optionally a dot and a string) - 'at' symbol - dot - string.
      if (regex.test(email) === true) {
        await ProfileService.forgotPassword(email)
          .then(function (response) {
            successText1 = "An email has been sent to " + email;
            fpSuccessMessage = true;
          })
          .catch(function (error) {
            console.log(error);
            fpErrorMessage = true;
            errorText1 = "Error!";
            errorText2 = "Email couln't be sent, please try again later.";
          });
      } else {
        errorText1 = "Error!";
        errorText2 = "Please verify your email format. E.g.: example@service.com"
        fpErrorMessage = true;
      }
      this.forceUpdate();
    }


    render() {
      return (
        <Container>
          <Grid>
            <Grid.Row centered>
              <Segment compact>
                <div className="fp-container">
                  <div className="fp-title">
                    Lost password
                </div>
                  <div className="fp-steps">
                    Follow these simple steps to reset your password. <br />
                    1. Enter your Jared email adress below. <br />
                    2. Wait for your recovery details to be sent. <br />
                    3. Follow the given instructions to recover your account. <br />
                  </div>
                </div>
                <Form>
                  <Form.Group>
                    <Form.Input
                      name="email"
                      label="Enter your recovery email"
                      placeholder="email"
                      value={this.email}
                      onChange={this.handleChange}
                      type="email"
                    />
                  </Form.Group>
                </Form>
                {fpErrorMessage ? (
                  <div className="ui error message" >
                    <div className="content">
                      <div className="header">{errorText1}</div>
                      <p>{errorText2}</p>
                    </div>
                  </div>
                ) : null}
                {fpSuccessMessage ? (
                  <div className="ui success message">
                    <i className="thumbs up icon"></i>
                    <div className="content">
                      <div className="header">{successText1}</div>
                      <p>The reason for not receiving any verification mail is due to wrong email address used during registration,
                        or mail getting blocked due to spam filters. Please ensure all related issues are solved before proceeding.</p>
                    </div>
                  </div>
                ) : null}
                <div
                  className="ui fluid large teal submit button"
                  onClick={this.recoverMail}
                >
                  Submit
                </div>
              </Segment>
            </Grid.Row>
          </Grid>
        </Container>
      );
    }
  }
);

export default ForgotPasswordForm;

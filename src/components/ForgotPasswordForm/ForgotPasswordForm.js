import React from "react";
import {
  Form,
  Segment,
  Container,
  Grid
} from "semantic-ui-react";
import "./ForgotPasswordForm.css";
import { observer, useLocalStore } from "mobx-react-lite";
import ProfileService from "../../services/profile.service"

export default observer((props) => {

  const store = useLocalStore(() => ({
    email: '',
    fpErrorMessage: false,
    errorText1: "",
    errorText2: "",
    fpSuccessMessage: false,
    successText1: "",

    handleChange(e) {
      store.email = e.target.value;
      store.fpErrorMessage = false;
    },
    async recoverMail() {
      store.fpErrorMessage = false;
      store.fpSuccessMessage = false;
      //check email validity using regex
      var regex = /^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      //true means email field has the form string - (optionally a dot and a string) - 'at' symbol - dot - string.
      if (regex.test(store.email) === true) {
        await ProfileService.forgotPassword(store.email)
          .then(function (response) {
            store.successText1 = "An email has been sent to " + store.email;
            store.fpSuccessMessage = true;
          })
          .catch(function (error) {
            console.log(error);
            store.fpErrorMessage = true;
            store.errorText1 = "Error!";
            store.errorText2 = "Email couln't be sent, please try again later.";
          });
      } else {
        store.errorText1 = "Error!";
        store.errorText2 = "Please verify your email format. E.g.: example@service.com"
        store.fpErrorMessage = true;
      }
    }
  }));


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
                  value={store.email}
                  onChange={store.handleChange}
                  type="email"
                />
              </Form.Group>
            </Form>
            {store.fpErrorMessage ? (
              <div className="ui error message" >
                <div className="content">
                  <div className="header">{store.errorText1}</div>
                  <p>{store.errorText2}</p>
                </div>
              </div>
            ) : null}
            {store.fpSuccessMessage ? (
              <div className="ui success message">
                <i className="thumbs up icon"></i>
                <div className="content">
                  <div className="header">{store.successText1}</div>
                  <p>The reason for not receiving any verification mail is due to wrong email address used during registration,
                    or mail getting blocked due to spam filters. Please ensure all related issues are solved before proceeding.</p>
                </div>
              </div>
            ) : null}
            <div
              className="ui fluid large teal submit button"
              onClick={store.recoverMail}
            >
              Submit
            </div>
          </Segment>
        </Grid.Row>
      </Grid>
    </Container>
  );
});
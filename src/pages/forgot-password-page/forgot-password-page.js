import React, { Component } from "react";
import "./forgot-password-page.css";
import ForgotPasswordForm from "../../components/ForgotPasswordForm/ForgotPasswordForm";

export default function(props) {
  return (
    <div>
      <div className="ui container center aligned">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
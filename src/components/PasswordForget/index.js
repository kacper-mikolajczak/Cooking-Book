import React, { Component } from "react";
import { Link } from "react-router-dom";

import { withFirebase } from "../../Firebase";
import * as ROUTES from "../../constants/routes";

import PasswordForgetFormBase from "./PasswordForgetFormBase";

import { Container } from "@material-ui/core";

const PasswordForgetPage = (props) => {
  return (
    <Container component="main" maxWidth="xs">
      <PasswordForgetForm />
    </Container>
  );
};

const INIT_STATE = {
  email: "",
  error: null,
  msg: null,
};

class PasswordForgetFormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INIT_STATE };
  }

  onSubmit = (event) => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({
          ...INIT_STATE,
          msg: "Verification email has been sent",
        });
      })
      .catch((error) => {
        this.setState({ error });
      });
    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, error, msg } = this.state;

    const isInvalid = email === "";

    return (
      <PasswordForgetFormBase
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        isInvalid={isInvalid}
        error={error}
        msg={msg}
      />
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormContainer);

export { PasswordForgetForm, PasswordForgetLink };

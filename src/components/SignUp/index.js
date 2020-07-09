import React from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";

import * as ROUTES from "../../constants/routes";
import { withFirebase } from "../Firebase";
import SignUpFormBase from "./SignUpFormBase";
import { Container } from "@material-ui/core";

const SignUpPage = (props) => {
  return (
    <Container component="main" maxWidth="xs">
      <SignUpForm />
    </Container>
  );
};

const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase);

const SignUpLink = () => (
  <Link to={ROUTES.SIGN_UP}>
    <p>Don't have an account? Sign Up</p>
  </Link>
);

export default SignUpPage;

export { SignUpForm, SignUpLink };

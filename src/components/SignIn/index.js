import React from "react";
import { withRouter, Link } from "react-router-dom";
import { compose } from "recompose";

import * as ROUTES from "../../constants/routes";
import { withFirebase } from "../../Firebase";

import Container from "@material-ui/core/Container";

import SignInFormBase from "./SignInFormBase";

const SignInPage = (props) => {
  return (
    <Container component="main" maxWidth="xs">
      <SignInForm />
    </Container>
  );
};

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);

const SignInLink = () => (
  <Link to={ROUTES.SIGN_IN}>
    <p>Already have an account? Sign In!</p>
  </Link>
);

export default SignInPage;

export { SignInForm, SignInLink };

import React from "react";
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";

import LandingPage from "../Landing";
import SignUpPage from "../SignUp";
import SignInPage, { SignInLink } from "../SignIn";
import PasswordForgetPage from "../PasswordForget";
import HomePage from "../Home";
import AccountPage from "../Account";
import AdminPage from "../Admin";
import CreateRecipePage from "../CreateRecipe";

import * as ROUTES from "../../constants/routes";

import { withAuthentication } from "../Session";
import { CssBaseline, Container } from "@material-ui/core";

import Header from "../Header";
import { useSelector, useDispatch } from "react-redux";

import firebase from "../../Firebase";
import { sessionActions } from "../../store/reducers/session";

const App = () => {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.session.authUser);

  //W --> firebase user uid
  if (firebase?.auth?.W && !authUser) {
    const uid = firebase.auth.W;
    firebase
      .user(uid)
      .get()
      .then((dbRes) => {
        const userData = dbRes.data();
        dispatch(
          sessionActions.setAuthUser({
            uid: uid,
            ...userData,
          })
        );
      });
  }

  return (
    <Router>
      <div>
        <CssBaseline />
        <Header />
        <hr />

        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        {authUser && (
          <>
            <Route path={ROUTES.HOME} component={HomePage} />
            <Route path={ROUTES.ACCOUNT} component={AccountPage} />
            <Route path={ROUTES.ADMIN} component={AdminPage} />
            <Route path={ROUTES.RECIPE_NEW} component={CreateRecipePage} />
          </>
        )}
        {!authUser && <Route path="*" component={NoMatch} />}
      </div>
    </Router>
  );
};

const NoMatch = () => {
  //useHistory().push("/");
  return (
    <>
      {true ? (
        <></>
      ) : (
        <Container content="main" maxWidth="xs">
          <h1>Route is missing :(</h1>
          <SignInLink />
        </Container>
      )}
    </>
  );
};

export default withAuthentication(App);

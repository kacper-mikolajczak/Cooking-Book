import React from "react";

import { withFirebase } from "../../Firebase";
import { withRouter } from "react-router-dom";
import { sessionActions } from "../../store/reducers/session";
import { useDispatch } from "react-redux";

import * as ROUTES from "../../constants/routes";

const SignOutButton = ({ firebase, history }) => {
  const dispatch = useDispatch();
  const handleClick = (e) => {
    firebase.auth.W = null;
    firebase.doSignOut();
    dispatch(sessionActions.unsetAuthUser());
    history.push(ROUTES.LANDING);
  };

  return <a onClick={handleClick}>Sign Out</a>;
};

export default withRouter(withFirebase(SignOutButton));

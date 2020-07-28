import React from "react";

import { withFirebase } from "../../Firebase";
import { withRouter } from "react-router-dom";
import { sessionActions } from "../../store/reducers/session";
import { searchActions } from "../../store/reducers/search";
import { useDispatch } from "react-redux";

import { ErrorActions } from "../../store/reducers/error";

import * as ROUTES from "../../constants/routes";

const SignOutButton = ({ firebase, history }) => {
  const dispatch = useDispatch();
  const handleClick = (e) => {
    firebase.auth.W = null;
    firebase.doSignOut();
    dispatch(ErrorActions.set("You've just logged out!"));
    dispatch(sessionActions.unsetAuthUser());
    dispatch(searchActions.clear());
    history.push(ROUTES.LANDING);
  };

  return <a onClick={handleClick}>Sign Out</a>;
};

export default withRouter(withFirebase(SignOutButton));

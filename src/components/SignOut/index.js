import React from "react";

import { withFirebase } from "../../Firebase";
import { sessionActions } from "../../store/reducers/session";
import { useDispatch } from "react-redux";

const SignOutButton = ({ firebase }) => {
  const dispatch = useDispatch();
  const handleClick = (e) => {
    firebase.doSignOut();
    dispatch(sessionActions.unsetAuthUser());
  };

  return <a onClick={handleClick}>Sign Out</a>;
};

export default withFirebase(SignOutButton);

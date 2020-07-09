import React from "react";

import { withFirebase } from "../Firebase";

const SignOutButton = ({ firebase }) => {
  return <a onClick={firebase.doSignOut}>Sign Out</a>;
};

export default withFirebase(SignOutButton);

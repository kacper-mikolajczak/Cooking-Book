import React from "react";
import { PasswordChangeForm } from "../PasswordChange";
import { withAuthorization, AuthUserContext } from "../Session";
import { Grid } from "@material-ui/core";

const Account = (props) => {
  return (
    <AuthUserContext.Consumer>
      {(authUser) => (
        <div>
          <h1>Your Account details {authUser.email}</h1>
          <Grid>
            <Grid></Grid>
            <Grid>
              <PasswordChangeForm />
            </Grid>
          </Grid>
        </div>
      )}
    </AuthUserContext.Consumer>
  );
};

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(Account);

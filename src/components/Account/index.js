import React from "react";
import { PasswordChangeForm } from "../PasswordChange";
import { withAuthorization, AuthUserContext } from "../Session";
import { Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import CenterMsg from "../CenterMsg";

const Account = (props) => {
  const user = useSelector((state) => state.session.authUser);
  return (
    <AuthUserContext.Consumer>
      {(authUser) => (
        <div>
          <CenterMsg
            msg={`Your account ${user.firstName} ${user.lastName}`}
            variant="h4"
            gutter={20}
          />
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

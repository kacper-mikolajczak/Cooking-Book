import React from "react";
import { PasswordChangeForm } from "../PasswordChange";
import { withAuthorization, AuthUserContext } from "../Session";
import { Grid, Container } from "@material-ui/core";
import { useSelector } from "react-redux";
import CenterMsg from "../CenterMsg";
import ChangeInput from "./Account.ChangeInput";

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
          <Grid container alignItems="center" justify="center">
            <Grid item sm={12} md={6}>
              <Container maxWidth="xs">
                <ChangeInput name="lastName" display="Last Name" />
                <ChangeInput name="firstName" display="First Name" />
                <ChangeInput name="photoUrl" display="Photo URL" />
              </Container>
            </Grid>
            <Grid item sm={12} md={6}>
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

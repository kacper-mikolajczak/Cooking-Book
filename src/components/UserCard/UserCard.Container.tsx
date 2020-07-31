import React from "react";
import { Grid } from "@material-ui/core";
import UserCard from "./index";
import { IUser } from "../../interfaces";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    margin: "10px auto",
  },
});

const UserCardContainer = ({ users }: { users: IUser[] }) => {
  const classes = useStyles();
  const mappedUsers = users.map((user) => <UserCard user={user} />);

  return (
    <Grid item xs={12} className={classes.root}>
      {mappedUsers}
    </Grid>
  );
};

export default UserCardContainer;

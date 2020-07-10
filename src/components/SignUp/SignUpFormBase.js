import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import * as ROUTES from "../../constants/routes";

import { SignInLink } from "../SignIn";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const INIT_STATE = {
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  photoUrl: "",
  error: null,
};

const SignUpFormBase = (props) => {
  const classes = useStyles();
  const [
    { firstName, lastName, email, password, photoUrl, error },
    setState,
  ] = useState({
    INIT_STATE,
  });

  const clearState = () => setState(INIT_STATE);

  const onSubmit = (event) => {
    props.firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return props.firebase.user(authUser.user.uid).set({
          createdAt: new Date(),
          firstName: firstName ? firstName : null,
          lastName: lastName ? lastName : null,
          email,
          admin: true,
          recipes: null,
          photoUrl: photoUrl ? photoUrl : null,
        });
      })
      .then(() => {
        clearState();
        props.history.push(ROUTES.HOME);
      })
      .catch((error) => {
        setState({ error });
      });
    event.preventDefault();
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const isInvalid = password === "" || email === "";

  return (
    <Container maxWidth="xs" component="main">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography compnt="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={onChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                fullWidth
                id="firstName"
                label="First Name"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="photoUrl"
                variant="outlined"
                fullWidth
                id="photoUrl"
                label="Photo Url"
                onChange={onChange}
              />
            </Grid>
          </Grid>
          {error && <p>{error.message}</p>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={isInvalid}
            onClick={onSubmit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <SignInLink />
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignUpFormBase;

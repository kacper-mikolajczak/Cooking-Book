import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

import * as ROUTES from "../../constants/routes";

import { SignUpLink } from "../SignUp";
import { PasswordForgetLink } from "../PasswordForget";

import { sessionActions } from "../../store/reducers/session";
import { useDispatch } from "react-redux";

import firebase from "../../Firebase";

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const INIT_STATE = {
  email: "",
  password: "",
  error: null,
};

const SignInFormBase = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [{ email, password, error }, setState] = useState(INIT_STATE);

  const clearState = () => {
    setState({ ...INIT_STATE });
  };

  const onSubmit = (event) => {
    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        props.firebase
          .user(user.uid)
          .get()
          .then((dbRes) => {
            console.log(dbRes);
            const userData = dbRes.data();
            console.log("HELLO", userData);
            dispatch(
              sessionActions.setAuthUser({
                ...userData,
              })
            );
            clearState();
            props.history.push(ROUTES.HOME);
          });
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

  const isInvalid = email === "" || password === "";

  return (
    <Container content="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={onChange}
          />
          {error && <p>{error.message}</p>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onSubmit}
            disabled={isInvalid}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <PasswordForgetLink />
            </Grid>
            <Grid item>
              <SignUpLink />
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignInFormBase;

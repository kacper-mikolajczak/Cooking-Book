import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { ErrorActions } from "../../store/reducers/error";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  text: {
    fontSize: "1rem",
    padding: "5px",
    paddingLeft: "10px",
    paddingRight: "10px",
    background: "rgba(255,0,0,.8)",
    borderRadius: "15px",
    color: "white",
  },
}));

const ErrorSnackBar = ({ multiple }: { multiple: boolean }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const errors = useSelector((state) => state.errors);

  useEffect(() => {
    const displayInterval = setInterval(
      () => dispatch(ErrorActions.clear()),
      3000
    );
    return () => clearInterval(displayInterval);
  });

  const handleClick = () => {
    dispatch(ErrorActions.clear());
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
  };

  return (
    <div className={classes.root}>
      <Snackbar open={errors.length} onClose={handleClose}>
        <p className={classes.text}> {errors.length > 0 && errors?.[0].msg}</p>
      </Snackbar>
    </div>
  );
};

export default ErrorSnackBar;

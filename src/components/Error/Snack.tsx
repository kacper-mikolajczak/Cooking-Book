import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import ClearSharpIcon from "@material-ui/icons/ClearSharp";

import { IError } from "../../interfaces";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  text: {
    margin: 0,
    marginBottom: "5px",
    fontSize: "1rem",
    padding: "5px",
    paddingLeft: "15px",
    paddingRight: "10px",
    background: "rgba(255,0,0,0.9)",
    borderRadius: "15px",
    color: "white",
  },
  icon: {
    display: "inline",
    color: "white",
  },
}));

const Snack = ({ error, handleClose }: { error: IError; handleClose: any }) => {
  const classes = useStyles();
  return (
    <Snackbar className={classes.root} open={true}>
      <p className={classes.text}>
        {" "}
        {error.msg}{" "}
        <IconButton size="small" className={classes.icon} onClick={handleClose}>
          <ClearSharpIcon />
        </IconButton>
      </p>
    </Snackbar>
  );
};

export default Snack;

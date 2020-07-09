import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh",
  },
  rootInline: {
    display: "inline",
    textAlign: "center",
  },
}));

const Loader = ({ isLoading, inline }) => {
  const classes = useStyles();

  return (
    isLoading &&
    (inline ? (
      <div className={classes.rootInline}>
        <CircularProgress />
      </div>
    ) : (
      <div className={classes.root}>
        <CircularProgress />
      </div>
    ))
  );
};

export default Loader;

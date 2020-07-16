import React, { useState } from "react";

import {
  IconButton,
  Dialog,
  Button,
  DialogActions,
  DialogTitle,
} from "@material-ui/core";
import ClearSharpIcon from "@material-ui/icons/ClearSharp";
import { makeStyles } from "@material-ui/core/styles";

import firebase from "../../Firebase";

const useStyles = makeStyles((theme) => ({
  icons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  likes: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: "0.9em",
    color: "rgba(0,0,0,.6)",
  },
  gutter: {
    padding: "30px",
  },
}));

function DeleteButton({ condition, onYesClick }) {
  const classes = useStyles();

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClick = (e) => {
    setDialogOpen(true);
  };

  const handleDialogClose = (e) => {
    setDialogOpen(false);
  };

  return (
    <>
      <IconButton
        disabled={!condition}
        aria-label="add to favorites"
        className={classes.icons}
        onClick={handleClick}
      >
        <ClearSharpIcon />
      </IconButton>
      {dialogOpen && (
        <Dialog
          open={dialogOpen}
          onClose={handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Are you sure you want to delete this recipe?
          </DialogTitle>
          <DialogActions>
            <Button
              onClick={() => {
                onYesClick();
                handleDialogClose();
              }}
              color="secondary"
              autoFocus
            >
              Agree
            </Button>
            <Button onClick={handleDialogClose}>Disagree</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default DeleteButton;

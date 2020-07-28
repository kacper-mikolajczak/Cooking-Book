import React, { useState } from "react";

import {
  IconButton,
  Dialog,
  Button,
  DialogActions,
  DialogTitle,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import { ErrorActions } from "../../store/reducers/error";
import { useDispatch } from "react-redux";

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
  const dispatch = useDispatch();
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
        <DeleteIcon />
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
                dispatch(ErrorActions.set("Recipe deleted!"));
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

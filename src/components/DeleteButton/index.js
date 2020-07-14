import React, { useState } from "react";

import { IconButton, Dialog } from "@material-ui/core";
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
}));

function DeleteButton({ recipeId }) {
  const classes = useStyles();

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClick = (e) => {
    setDialogOpen(true);
  };

  console.log(dialogOpen);

  return (
    <>
      <IconButton
        aria-label="add to favorites"
        className={classes.icons}
        onClick={handleClick}
      >
        <ClearSharpIcon />
      </IconButton>
      {dialogOpen && (
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
          <div>
            <p>Are you sure? </p>
          </div>
        </Dialog>
      )}
    </>
  );
}

export default DeleteButton;

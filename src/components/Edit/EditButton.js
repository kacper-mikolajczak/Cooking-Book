import React from "react";

import IconButton from "@material-ui/core/IconButton";
import EditSharpIcon from "@material-ui/icons/EditSharp";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  icons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
}));

const EditButton = ({ condition, onYesClick }) => {
  const classes = useStyles();

  const handleClick = (e) => {
    onYesClick();
  };

  return (
    <IconButton
      disabled={!condition}
      aria-label="edit recipe"
      className={classes.icons}
      onClick={handleClick}
    >
      <EditSharpIcon />
    </IconButton>
  );
};

export default EditButton;

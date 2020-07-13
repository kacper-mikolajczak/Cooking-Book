import React from "react";

import IconButton from "@material-ui/core/IconButton";
import ClearSharpIcon from "@material-ui/icons/ClearSharp";
import EditSharpIcon from "@material-ui/icons/EditSharp";
import PageviewSharpIcon from "@material-ui/icons/PageviewSharp";
import FavoriteIcon from "@material-ui/icons/Favorite";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  dateField: {
    fontSize: "0.8em",
    color: "rgba(0,0,0,.5)",
  },
  favourite: {},
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

const RecipeMenu = (props) => {
  const classes = useStyles();

  return (
    <>
      <IconButton aria-label="view recipe" className={classes.icons}>
        <PageviewSharpIcon />
      </IconButton>
      <IconButton aria-label="edit recipe" className={classes.icons}>
        <EditSharpIcon />
      </IconButton>
      <IconButton aria-label="delete recipe" className={classes.icons}>
        <ClearSharpIcon />
      </IconButton>
      <span className={classes.likes}>
        <IconButton aria-label="add to favorites" className={classes.icons}>
          <FavoriteIcon />
        </IconButton>
        <p>{250}</p>
      </span>
    </>
  );
};

export default RecipeMenu;

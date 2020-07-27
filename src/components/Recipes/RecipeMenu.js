import React, { useState } from "react";

import IconButton from "@material-ui/core/IconButton";
import EditSharpIcon from "@material-ui/icons/EditSharp";
import PageviewSharpIcon from "@material-ui/icons/PageviewSharp";

import { makeStyles } from "@material-ui/core/styles";
import LikeButton from "../Likes";
import DeleteButton from "../DeleteButton";
import { useSelector } from "react-redux";

import firebase from "../../Firebase";
import { Dialog } from "@material-ui/core";
import SignInForm from "../SignIn";
import EditButton from "../Edit/EditButton";
import RegainButton from "../RegainButton";

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

const RecipeMenu = ({
  recipe: { id, user, deleted },
  likes,
  handleShowClick,
}) => {
  const classes = useStyles();

  const authUser = useSelector((state) => state.session?.authUser);

  const handleLikeClick = (val) => {
    firebase.recipeLikes(id).set({ [authUser?.id]: val }, { merge: true });
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const editionRights = authUser?.id === user || authUser?.admin;

  return (
    <>
      <IconButton
        aria-label="view recipe"
        className={classes.icons}
        onClick={handleShowClick}
      >
        <PageviewSharpIcon />
      </IconButton>
      {editionRights && (
        <>
          <EditButton
            handleCallback={() => {}}
            condition={editionRights && !deleted}
            recipeId={id}
          />
          {deleted ? (
            <RegainButton
              condition={editionRights && deleted}
              onYesClick={(e) => {
                firebase.recipe(id).set({ deleted: false }, { merge: true });
                window.location.reload();
              }}
            />
          ) : (
            <DeleteButton
              condition={editionRights && !deleted}
              onYesClick={(e) => {
                firebase.recipe(id).set({ deleted: true }, { merge: true });
                window.location.reload();
              }}
            />
          )}
        </>
      )}
      {authUser ? (
        <LikeButton
          condition={!deleted}
          quantity={likes.length}
          isLiked={likes.some((like) => like === authUser?.id)}
          handleIconClick={handleLikeClick}
          authorized={authUser?.id}
        />
      ) : (
        <LikeButton
          condition={!deleted}
          quantity={likes.length}
          handleIconClick={handleClickOpen}
          authorized={authUser?.id}
        />
      )}
      <Dialog open={open} onClose={handleClose}>
        <SignInForm />
      </Dialog>
    </>
  );
};

export default RecipeMenu;

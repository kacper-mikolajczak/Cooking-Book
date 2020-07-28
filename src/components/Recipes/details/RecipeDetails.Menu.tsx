import React, { useState } from "react";

import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import { makeStyles } from "@material-ui/core/styles";
import DeleteButton from "../../DeleteButton";
import { useSelector } from "react-redux";

import firebase from "../../../Firebase";
import { Dialog } from "@material-ui/core";
import SignInForm from "../../SignIn";
import EditButton from "../../Edit/EditButton";
import RegainButton from "../../RegainButton";
import { IRecipe } from "../../../interfaces";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    height: "100%",
  },
}));

const DetailsMenu = ({
  recipe: { id, user, deleted },
  likes,
  handleDialogClose,
}: {
  recipe: IRecipe;
  likes: any;
  handleDialogClose: any;
}) => {
  const classes = useStyles();

  const authUser = useSelector((state) => state.session?.authUser);

  const editionRights = authUser?.id === user || authUser?.admin;

  return (
    <div className={classes.root}>
      {editionRights && (
        <>
          <EditButton
            handleCallback={handleDialogClose}
            condition={editionRights && !deleted}
            recipeId={id}
          />
          {deleted ? (
            <RegainButton
              condition={editionRights && deleted}
              onYesClick={(e) => {
                firebase
                  .recipe(id)
                  .set({ deleted: false }, { merge: true })
                  .then(() => {
                    window.location.reload();
                  });
              }}
            />
          ) : (
            <DeleteButton
              condition={editionRights && !deleted}
              onYesClick={(e) => {
                firebase
                  .recipe(id)
                  .set({ deleted: true }, { merge: true })
                  .then(() => {
                    window.location.reload();
                  });
              }}
            />
          )}
        </>
      )}
      <IconButton
        aria-label="view recipe"
        className={classes.icons}
        onClick={handleDialogClose}
      >
        <CloseIcon />
      </IconButton>
    </div>
  );
};

export default DetailsMenu;

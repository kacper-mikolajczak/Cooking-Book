import React from "react";

import {
  Avatar,
  IconButton,
  Theme,
  makeStyles,
  createStyles,
} from "@material-ui/core";
import { useWindowDimensions } from "../../../hooks";
import { searchOperations } from "../../../store/reducers/search";
import { recipeDetailsActions } from "../../../store/reducers/recipes/recipeDetails";
import { useDispatch } from "react-redux";

import { smallScreen } from "../../../constants/screen";

interface IRecipeDetailsAuthor {
  firstName: string;
  lastName: string;
  photoUrl: string;
  id: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    small: {
      width: theme.spacing(6),
      height: theme.spacing(6),
    },
  })
);

const Author = ({
  firstName,
  lastName,
  photoUrl,
  id,
}: IRecipeDetailsAuthor) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { width } = useWindowDimensions();
  const displayName =
    firstName && lastName ? `${firstName} ${lastName}` : "Anonymous";

  const photoSrc = photoUrl ? photoUrl : "";

  const small = width < smallScreen;

  return (
    <p
      style={{
        padding: "0",
        margin: "0",
        textAlign: "center",
        fontSize: small ? "0.8rem" : "1rem",
      }}
    >
      {!small && <span>Author: </span>}
      <strong>{displayName}</strong>
      <IconButton
        className={small ? classes.small : ""}
        onClick={(e) => {
          dispatch(searchOperations.searchByUsers([id]));
          dispatch(recipeDetailsActions.closeDialog());
        }}
      >
        <Avatar src={photoSrc} />
      </IconButton>
    </p>
  );
};

export default Author;

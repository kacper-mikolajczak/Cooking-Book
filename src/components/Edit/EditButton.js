import React from "react";
import { useDispatch } from "react-redux";

import IconButton from "@material-ui/core/IconButton";
import EditSharpIcon from "@material-ui/icons/EditSharp";
import { makeStyles } from "@material-ui/core/styles";

import { useHistory } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { editedRecipeOperations } from "../../store/reducers/edit";
import { searchActions } from "../../store/reducers/search";

const useStyles = makeStyles((theme) => ({
  icons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
}));

const EditButton = ({ condition, recipeId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const handleClick = (e) => {
    dispatch(editedRecipeOperations.getEditedRecipe(recipeId));
    dispatch(searchActions.close());
    history.push(`${ROUTES.RECIPE_EDIT}`);
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

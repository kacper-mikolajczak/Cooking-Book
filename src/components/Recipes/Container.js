import React, { useState, useEffect } from "react";

// import { withAuthorization, AuthUserContext } from "../Session";
import { useDispatch, useSelector } from "react-redux";
import { userRecipesOperations } from "../../store/reducers/userRecipes";
import Loader from "../Loader";
import RecipeCard from "../Recipes/Recipe";
import RecipeCardv2 from "../Recipes/Recipev2";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 1em",
  },
  recipesContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gridGap: "2em",
  },
}));

const RecipesContainer = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.authUser);
  const userRecipes = useSelector((state) => state.userRecipes);

  const mappedRecipes =
    userRecipes?.data?.length > 0 ? (
      userRecipes.data.map((recipe) => (
        <RecipeCardv2 key={recipe.id} {...recipe} />
      ))
    ) : (
      <p>User has no recipes! :(</p>
    );

  useEffect(() => {
    (async () => {
      dispatch(userRecipesOperations.get());
    })();
  }, []);

  return (
    <div className={classes.root}>
      {userRecipes.pending ? (
        <Loader isLoading={userRecipes.pending} />
      ) : (
        <div>
          <p>{userRecipes.error}</p>
          <div className={classes.recipesContainer}>{mappedRecipes}</div>
        </div>
      )}
    </div>
  );
};

export default RecipesContainer;

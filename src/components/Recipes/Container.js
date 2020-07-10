import React, { useState, useEffect } from "react";

import { withAuthorization, AuthUserContext } from "../Session";
import { useDispatch, useSelector } from "react-redux";
import { userRecipesOperations } from "../../store/reducers/userRecipes";
import Loader from "../Loader";
import RecipeCard from "../Recipes/Recipe";

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

  const mappedRecipes = userRecipes.data.map((recipe) => (
    <RecipeCard key={recipe.uid} {...recipe} />
  ));

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
          {userRecipes.setter.pending ? (
            <Loader isLoading={userRecipes.setter.pending} inline={true} />
          ) : (
            <button
              onClick={(e) => {
                const dummy = {
                  user: user.uid,
                  title: "First Recipe",
                  desc: "Lorem lorem lorem",
                  photoUrl:
                    "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
                };
                dispatch(userRecipesOperations.set(dummy));
              }}
            >
              Click to Add Data to base
            </button>
          )}
          <p>{userRecipes.error}</p>
          <div className={classes.recipesContainer}>
            {mappedRecipes.length > 0 ? (
              mappedRecipes
            ) : (
              <p>User has no recipes! :(</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipesContainer;

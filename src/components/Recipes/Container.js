import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import RecipeCardv2 from "./Recipev2";

import RecipeDetails from "./Details";

import { makeStyles } from "@material-ui/core/styles";

import { recipeDetailsOperations } from "../../store/reducers/recipes/recipeDetails";
import CenterMsg from "../CenterMsg";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 1em",
  },
  recipesContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gridGap: "2em",
  },
}));

const RecipesContainer = ({ selectOp, msg, getOp, storeSrc }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const recipes = useSelector(selectOp);

  useEffect(() => {
    (async () => {
      if (getOp) dispatch(getOp());
    })();
  }, [dispatch, getOp]);

  const handleCardClick = (e, recipe) => {
    dispatch(recipeDetailsOperations.get(recipe));
  };

  const mappedRecipes =
    recipes.data?.length > 0
      ? recipes.data.map((recipe) => (
          <RecipeCardv2
            key={recipe.id}
            {...recipe}
            storeSrc={storeSrc}
            handleClick={(e) => handleCardClick(e, recipe)}
          />
        ))
      : [];

  return (
    <div className={classes.root}>
      {recipes.pending ? (
        <Loader isLoading={recipes.pending} />
      ) : (
        <div>
          <p></p>
          {mappedRecipes.length > 0 ? (
            <div className={classes.recipesContainer}>{mappedRecipes}</div>
          ) : (
            <CenterMsg msg={msg} gutter={20} variant="h5" />
          )}
          <RecipeDetails />
        </div>
      )}
    </div>
  );
};

export default RecipesContainer;

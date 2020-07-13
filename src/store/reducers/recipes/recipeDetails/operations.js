import * as actions from "./actions";

import firebase from "../../../../Firebase";

export const getRecipeDetails = (userUid, recipeUid) => async (
  dispatch,
  getState
) => {
  dispatch(actions.fetchRecipeDetailsPending);

  console.log("get recipe details WTF", userUid, recipeUid);

  //try {
  const userDetails = await firebase
    .user(userUid)
    .get()
    .then((dbRes) => dbRes.data());

  const comments = await firebase
    .comments()
    .doc(recipeUid)
    .get()
    .then((dbRes) => dbRes.data());

  const { userRecipes } = getState();

  const recipeDetails = userRecipes.data.filter(
    (item) => item.id === recipeUid
  )[0];

  dispatch(
    actions.fetchRecipeDetailsSuccess(userDetails, recipeDetails, comments)
  );
  //   } catch (error) {
  //     dispatch(actions.fetchRecipeDetailsFailure(error));
  //   }
};

import * as actions from "./actions";

import firebase from "../../../../Firebase";

export const get = (recipe) => async (dispatch, getState) => {
  dispatch(actions.openDialog());
  console.log(`get Recipe Details Op: `, { recipe });
  //if (getState().recipe.details.recipe === recipe) return new Promise.resolve();
  dispatch(actions.fetchRecipeDetailsPending());

  //try {
  const userDetails = await firebase
    .user(recipe.user)
    .get()
    .then((dbRes) => dbRes.data());

  const comments = await firebase
    .comments()
    .doc(recipe.id)
    .get()
    .then((dbRes) => dbRes.data());

  const sortedComments = comments
    ? Object.values(comments).sort(
        (a, b) => a.createdAt.seconds - b.createdAt.seconds
      )
    : [];

  dispatch(
    actions.fetchRecipeDetailsSuccess(userDetails, recipe, sortedComments)
  );
  //   } catch (error) {
  //     dispatch(actions.fetchRecipeDetailsFailure(error));
  //   }
};

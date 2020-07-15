import * as types from "./types";

export const setRecipeDetails = (recipe) => ({
  type: types.setRecipeDetails,
  payload: { recipe },
});

export const fetchRecipeDetailsPending = () => ({
  type: types.fetchRecipeDetailsPending,
});
export const fetchRecipeDetailsSuccess = (user, recipe, comments) => ({
  type: types.fetchRecipeDetailsSuccess,
  payload: { user, recipe, comments },
});
export const fetchRecipeDetailsFailure = (error) => ({
  type: types.fetchRecipeDetailsFailure,
  payload: { error },
});

export const addNewComment = (comment) => ({
  type: types.addNewComment,
  payload: { comment },
});

export const closeDialog = () => ({ type: types.closeDialog });

export const openDialog = () => ({ type: types.openDialog });

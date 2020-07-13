import * as types from "./types";

const initialState = {
  user: {},
  recipe: {},
  open: false,
  pending: false,
  error: null,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.fetchRecipeDetailsPending:
      return {
        ...state,
        open: true,
        pending: true,
      };
    case types.fetchRecipeDetailsSuccess:
      return {
        ...state,
        user: payload.user,
        recipe: payload.recipe,
        comments: payload.comments,
      };
    case types.fetchRecipeDetailsFailure:
      return {
        ...state,
        error: payload.error,
      };
    case types.setRecipeDetails:
      return { ...state, recipe: payload.recipe };
    case types.closeDialog:
      return {
        ...state,
        open: false,
      };
    case types.openDialog:
      return {
        ...state,
        open: true,
      };
    default:
      return state;
  }
};

export default reducer;

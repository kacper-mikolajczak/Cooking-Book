import * as types from "./types";

import * as interfaces from "../../../interfaces";

interface SetEditedRecipeAction {
  type: typeof types.setEditedRecipe;
  payload: interfaces.IRecipe;
}

export const setEditedRecipe = (recipe: interfaces.IRecipe) => ({
  type: types.setEditedRecipe,
  payload: recipe,
});

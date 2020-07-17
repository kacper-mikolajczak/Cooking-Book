import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";

import sessionReducer from "./session";
import usersReducer from "./users";
import userRecipesReducer from "./userRecipes";
import recipeFormReducer from "./createRecipeForm";
import recipeReducer from "./recipes";
import searchReducer from "./search";
import topRecipesReducer from "./topRecipes";
import editedRecipeReducer from "./edit";

const rootReducer = combineReducers({
  session: sessionReducer,
  users: usersReducer,
  userRecipes: userRecipesReducer,
  recipeForm: recipeFormReducer,
  recipe: recipeReducer,
  search: searchReducer,
  topRecipes: topRecipesReducer,
  editedRecipe: editedRecipeReducer,
});

export default rootReducer;

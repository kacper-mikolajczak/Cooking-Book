import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";

import sessionReducer from "./session";
import usersReducer from "./users";
import userRecipesReducer from "./userRecipes";
import recipeFormReducer from "./createRecipeForm";
import recipeReducer from "./recipes";

const rootReducer = combineReducers({
  session: sessionReducer,
  users: usersReducer,
  reduxFirebase: firebaseReducer,
  userRecipes: userRecipesReducer,
  recipeForm: recipeFormReducer,
  recipe: recipeReducer,
});

export default rootReducer;

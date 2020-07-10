import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";

import sessionReducer from "./session";
import usersReducer from "./users";
import userRecipesReducer from "./userRecipes";
import recipeFormReducer from "./createRecipeForm";

const rootReducer = combineReducers({
  session: sessionReducer,
  users: usersReducer,
  reduxFirebase: firebaseReducer,
  userRecipes: userRecipesReducer,
  recipeForm: recipeFormReducer,
});

export default rootReducer;

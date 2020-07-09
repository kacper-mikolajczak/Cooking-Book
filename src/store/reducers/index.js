import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";

import sessionReducer from "./session";
import usersReducer from "./users";
import userRecipesReducer from "./userRecipes";

const rootReducer = combineReducers({
  session: sessionReducer,
  users: usersReducer,
  reduxFirebase: firebaseReducer,
  userRecipes: userRecipesReducer,
});

export default rootReducer;

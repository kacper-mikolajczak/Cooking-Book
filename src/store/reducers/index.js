import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";

import sessionReducer from "./session";
import userReducer from "./user";

const rootReducer = combineReducers({
  session: sessionReducer,
  user: userReducer,
  firebase: firebaseReducer,
});

export default rootReducer;

import { combineReducers } from "redux";

import details from "./recipeDetails";

const recipesReducer = combineReducers({ details });

export default recipesReducer;

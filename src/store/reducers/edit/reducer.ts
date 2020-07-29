import * as types from "./types";

import * as interfaces from "../../../interfaces";

export interface IEditedRecipe {
  recipe: interfaces.IRecipe;
}

const initialState: IEditedRecipe = {
  recipe: {
    createdAt: null,
    user: null,
    id: null,
    title: "",
    desc: "",
    photoUrl: "",
    deleted: false,
    steps: [],
    ingredients: [],
    groups: "",
  },
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.setEditedRecipe:
      return { ...state, recipe: action.payload };
    default:
      return state;
  }
};

export default reducer;

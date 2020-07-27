import * as types from "./types";
import { IRecipe, IError } from "../../../interfaces";

interface IState {
  data: IRecipe[];
  pending: boolean;
  error: IError | null;
}

const initialState = {
  data: [],
  pending: false,
  error: null,
};

const reducer = (
  state = initialState,
  action: types.LikedRecipesActions
): IState => {
  switch (action.type) {
    case types.fetchPending:
      return { ...state, pending: true };
    case types.fetchSuccess:
      return { ...state, pending: false, data: action.payload, error: null };
    case types.fetchFailure:
      return { ...state, pending: false, error: action.payload };
    default:
      return state;
  }
};

export default reducer;

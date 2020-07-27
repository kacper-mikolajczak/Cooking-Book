import { IRecipe, IError } from "../../../interfaces";

export const fetchPending = "LIKED_RECIPES_FETCH_PENDING";
export const fetchSuccess = "LIKED_RECIPES_FETCH_SUCCESS";
export const fetchFailure = "LIKED_RECIPES_FETCH_FAILURE";

export interface FetchPending {
  type: typeof fetchPending;
}

export interface FetchSuccess {
  type: typeof fetchSuccess;
  payload: IRecipe[];
}

export interface FetchFailure {
  type: typeof fetchFailure;
  payload: IError;
}

export type LikedRecipesActions = FetchFailure | FetchPending | FetchSuccess;

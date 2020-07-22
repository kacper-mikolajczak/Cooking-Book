import * as types from "./types";
import { IRecipe, IError } from "../../../interfaces";

export const fetchPending = (): types.FetchPending => ({
  type: types.fetchPending,
});
export const fetchSuccess = (data: IRecipe): types.FetchSuccess => ({
  type: types.fetchSuccess,
  payload: data,
});
export const fetchFailure = (error: IError): types.FetchFailure => ({
  type: types.fetchFailure,
  payload: error,
});

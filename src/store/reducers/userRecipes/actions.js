import * as types from "./types";

export const fetchPending = () => ({ type: types.fetchPending });
export const fetchSuccess = (data) => ({
  type: types.fetchSuccess,
  payload: data,
});
export const fetchFailure = (error) => ({
  type: types.fetchFailure,
  payload: error,
});

export const setPending = () => ({ type: types.setPending });
export const setSuccess = (msg) => ({
  type: types.setSuccess,
  payload: msg,
});
export const setFailure = (error) => ({
  type: types.setFailure,
  payload: error,
});

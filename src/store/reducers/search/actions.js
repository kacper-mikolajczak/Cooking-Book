import * as types from "./types";

export const fetchPending = () => ({ type: types.fetchPending });
export const fetchSuccess = (data, query) => ({
  type: types.fetchSuccess,
  payload: { data, query },
});
export const fetchFailure = (error) => ({
  type: types.fetchFailure,
  payload: { error },
});

export const fetchMoreSuccess = (data) => ({
  type: types.fetchMoreSuccess,
  payload: { data },
});

export const open = () => ({ type: types.open });
export const close = () => ({ type: types.close });

export const clear = () => ({ type: types.clear });

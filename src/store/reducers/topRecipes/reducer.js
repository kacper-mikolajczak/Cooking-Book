import * as types from "./types";

const initialState = {
  data: {},
  pending: false,
  error: null,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.fetchPending:
      return { ...state, pending: true };
    case types.fetchSuccess:
      return { ...state, pending: false, data: payload.data };
    case types.fetchFailure:
      return { ...state, pending: false, error: payload.error };

    default:
      return state;
  }
};

export default reducer;

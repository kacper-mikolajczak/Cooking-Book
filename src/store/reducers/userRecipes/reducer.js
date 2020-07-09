import * as types from "./types";

const initialState = {
  data: [],
  pending: false,
  error: null,
  setter: {
    pending: false,
    error: null,
    msg: null,
  },
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.fetchPending:
      return { ...state, pending: true };
    case types.fetchSuccess:
      return { ...state, pending: false, data: payload, error: null };
    case types.fetchFailure:
      return { ...state, pending: false, error: payload };
    case types.setPending:
      return {
        ...state,
        setter: {
          ...state.setter,
          pending: true,
        },
      };
    case types.setSuccess:
      return {
        ...state,
        setter: {
          ...state.setter,
          pending: false,
          msg: payload,
        },
      };
    case types.setFailure:
      return {
        ...state,
        setter: {
          ...state.setter,
          pending: false,
          error: payload,
        },
      };
    default:
      return state;
  }
};

export default reducer;
